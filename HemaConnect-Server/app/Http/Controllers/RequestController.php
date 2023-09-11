<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\BloodRequest;

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

        if ($existingRequest) {
            $existingRequest->needed_amount += $request->needed_amount;
            $existingRequest->save();

            return response()->json(["Blood Request" => $existingRequest]);
        }

        $new_request = new BloodRequest;
        $new_request->bloodtype_id = $request->bloodtype;
        $new_request->needed_amount = $request->needed_amount;
        $new_request->hospital_id = $user->employees[0]->hospital->id;
        $new_request->save();

        return response()->json(["Blood Request" => $new_request]);
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
}
