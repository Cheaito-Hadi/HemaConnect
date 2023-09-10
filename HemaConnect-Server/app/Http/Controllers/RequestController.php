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
        $new_request = new BloodRequest;
        $new_request->bloodtypes_id = $request->bloodtype;
        $new_request->needed_amount = $request->needed_amount;
        $new_request->counter = 0;
        $new_request->hospital_id = $user->employees[0]->hospital->id;
        $new_request->save();

        return response()->json(["Blood Request" => $new_request]);
    }
}
