<?php

namespace App\Http\Controllers;

use App\Models\BloodRequest;
use App\Models\Booking;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function createBooking (Request $request){
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }
        $bloodRequest = BloodRequest::where('id', $request->request_id)->first();
        $hospital = $bloodRequest->hospital;

        $booking = new Booking;
        $booking->time = date("Y-m-d H:i:s",strtotime($request->time));
        $booking->hepatitis = boolval($request->hepatitis) ;
        $booking->anemia = boolval( $request->anemia);
        $booking->user_id = $user->id;
        $booking->hospital_id = $hospital->id;
        $booking->request_id = $bloodRequest->id;
        $booking->save();

        return response()->json([
            "message" => "Booking created successfully",
            "booking" => $booking
        ]);
    }
}
