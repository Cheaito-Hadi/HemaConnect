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

    public function getBookings()
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }
        $bookings = $user->employees[0]->hospital->bookings;
        foreach ($bookings as $booking) {
            $booking->user_email = $booking->user->email;
            $userFirstName = ucwords($booking->user->first_name);
            $userLastName = ucwords($booking->user->last_name);
            $booking->user_name = $userFirstName . ' ' . $userLastName;
            $booking->user_blood_type = $booking->user->bloodtype->name;
            unset($booking->user);
        }
        return response()->json([
            "message" => "Success",
            "bookings" => $bookings
        ]);
    }

    public function deleteBooking(Request $request, $id)
    {
        $user = Auth::user();

        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }
        $booking = $user->employees[0]->hospital->bookings->where('id', $id)->first();
        if (is_null($booking)) {
            return response()->json(["message" => 'Booking not found']);
        }
        $booking->delete();

        return response()->json(["message" => 'Booking deleted successfully']);
    }

    public function searchBookings(Request $request)
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }
        $bloodType = $request->blood_type;
        $name = $request->name;

        $bookings = Booking::whereHas('user', function ($query) use ($bloodType, $name) {
            if ($bloodType) {
                $query->whereHas('bloodtype', function ($subquery) use ($bloodType) {
                    $subquery->where('name', $bloodType);
                });
            }
            if ($name) {
                $query->where(function ($subquery) use ($name) {
                    $subquery->where('first_name', 'like', "%$name%")
                        ->orWhere('last_name', 'like', "%$name%");
                });
            }
        })->get();

        foreach ($bookings as $booking) {
            $booking->user_email = $booking->user->email;
            $userFirstName = ucwords($booking->user->first_name);
            $userLastName = ucwords($booking->user->last_name);
            $booking->user_name = $userFirstName . ' ' . $userLastName;
            $booking->user_blood_type = $booking->user->bloodtype->name;
            unset($booking->user);
        }

        return response()->json([
            "message" => "Search results",
            "bookings" => $bookings
        ]);
    }
}
