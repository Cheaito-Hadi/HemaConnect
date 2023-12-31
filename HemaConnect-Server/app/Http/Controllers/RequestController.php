<?php

namespace App\Http\Controllers;

use App\Models\BankStock;
use App\Models\BloodType;
use App\Models\Hospital;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\BloodRequest;
use App\Models\Donation;
use Illuminate\Support\Facades\Http;

class RequestController extends Controller
{
    public function createRequest(Request $request)
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'failed']);
        }

        $existingRequest = BloodRequest::where('bloodtype_id', $request->bloodtype)
            ->where('hospital_id', $user->employees[0]->hospital->id)
            ->first();

        $hospital_name = $user->employees[0]->hospital->name;
        $bloodtype= BloodType::where('id', $request->bloodtype)->first();

        $users_bloodtype = User::where('bloodtype_id',$request->bloodtype)->get();
        $to_users = [

        ];
        foreach ($users_bloodtype as $user_bloodtype){
            if($user_bloodtype-> notification_token){
                array_push($to_users, $user_bloodtype-> notification_token);
            }
        }
        if ($existingRequest) {
            $existingRequest->needed_amount += $request->needed_amount;
            $existingRequest->save();

            $data = [
                'to' => $to_users,
                'title' => "Hospital Donation",
                "body"=>$hospital_name.' are requesting ('.$bloodtype->name.")",
            ];
            $response = Http::withBody(
                json_encode($data), 'application/json'
            )->post('https://exp.host/--/api/v2/push/send');


            return response()->json(["Blood_Request" => $existingRequest]);
        }

        $new_request = new BloodRequest;
        $new_request->bloodtype_id = $request->bloodtype;
        $new_request->needed_amount = $request->needed_amount;
        $new_request->hospital_id = $user->employees[0]->hospital->id;
        $new_request->save();


        $data = [
            'to' => $user->notification_token,
            'title' => 'Network Administrator',
            "body"=>'Hello world',
        ];
        $response = Http::withBody(
            json_encode($data), 'application/json'
        )->post('https://exp.host/--/api/v2/push/send');

        return response()->json(["Blood_Request" => $new_request]);
    }

    public function getRequests()
    {
        $user = Auth::user();
        $hospital = $user->employees[0]->hospital;
        $blood_requests = $hospital->requests;

        $totalDonatedAmount = 0;
        foreach ($blood_requests as $request) {
            $donations = $request->donations;
            $donatedAmount = $donations->sum('donated_amount');
            $request->total_donated_amount = $donatedAmount;
            $request->blood_type_name = $request->bloodType->name;
            $totalDonatedAmount += $donatedAmount;
            unset($request->donations);
            unset($request->bloodType);
        }

        return response()->json([
            "message" => "success",
            "Blood_Requests" => $blood_requests
        ]);
    }

    public function createDonation(Request $request)
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }

        $bloodRequest = BloodRequest::find($request->request_id);
        if (is_null($bloodRequest)) {
            return response()->json(["message" => 'Blood request not found']);
        }
        $donation = new Donation;
        $donation->donated_amount = $request->donated_amount;
        $donation->time = now();
        $donation->request_id = $bloodRequest->id;
        $donation->user_id = $request->user_id;

        $donation->save();
        $bloodRequest->save();
        $bankStock = BankStock::where('bloodtype_id', $donation->request->bloodtype_id)->first();
        if ($bankStock) {
            $bankStock->amount += $request->donated_amount;
            $bankStock->save();
        }
        unset($donation->request);
        return response()->json([
            "message" => "Donation created successfully",
            "donation" => $donation
        ]);
    }

    public function getUserRequests()
    {
        $user = Auth::user();
        $userBloodType = $user->bloodtype;
        $hospitals = Hospital::all();
        $filteredHospitals = $hospitals->filter(function ($hospital) use ($userBloodType) {
            $matchingRequests = $hospital->requests->filter(function ($request) use ($userBloodType) {
                return $request->bloodtype_id == $userBloodType->id;
            });
            return $matchingRequests->isNotEmpty();
        })->map(function ($hospital) use ($userBloodType) {
            $filteredRequests = $hospital->requests->filter(function ($request) use ($userBloodType) {
                return $request->bloodtype_id == $userBloodType->id;
            })->map(function ($request) {
                return [
                    "id" => $request->id,
                    "needed_amount" => $request->needed_amount,
                    "bloodtype_id" => $request->bloodtype_id,
                    "hospital_id" => $request->hospital_id,
                    "blood_type_name" => $request->bloodType->name,
                ];
            });
            return [
                "hospital_info" => [
                    "name" => $hospital->name,
                    "logo_url" => $hospital->logo_url,
                ],
                "requests" => $filteredRequests->values(),
            ];
        });
        return response()->json([
            "message" => "success",
            "Blood_Requests" => $filteredHospitals,
        ]);
    }

}
