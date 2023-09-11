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

        $existingRequest = BloodRequest::where('bloodtypes_id', $request->bloodtype)
            ->where('hospital_id', $user->employees[0]->hospital->id)
            ->first();

        if ($existingRequest) {
            $existingRequest->needed_amount += $request->needed_amount;
            $existingRequest->save();

            return response()->json(["Blood Request" => $existingRequest]);
        }

        $new_request = new BloodRequest;
        $new_request->bloodtypes_id = $request->bloodtype;
        $new_request->needed_amount = $request->needed_amount;
        $new_request->counter = 0;
        $new_request->hospital_id = $user->employees[0]->hospital->id;
        $new_request->save();

        return response()->json(["Blood Request" => $new_request]);
    }

    public function getRequests()
    {
        $user = Auth::user();
        $blood_requests = $user->employees[0]->hospital->requests;

        return response()->json([
            "message" => "success",
            "Blood Requests" => $blood_requests
            ]);
    }
}
