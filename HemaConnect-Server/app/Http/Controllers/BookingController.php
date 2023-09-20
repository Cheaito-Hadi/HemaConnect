<?php

namespace App\Http\Controllers;

use App\Models\BloodRequest;
use App\Models\Booking;
use App\Models\Donation;
use App\Models\Hospital;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function createBooking(Request $request)
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }
        $bloodRequest = BloodRequest::where('id', $request->request_id)->first();
        $hospital = $bloodRequest->hospital;
        $bookingTime = Carbon::createFromFormat('Y-m-d H:i:s', $request->time);
        $timeDifferenceHours = now()->diffInHours($bookingTime);
        if ($timeDifferenceHours < 6) {
            return response()->json([
                "error" => "less than 3 hours"
            ]);
        }

        $booking = new Booking;
        $booking->time = $bookingTime;
        $booking->hepatitis = boolval($request->hepatitis);
        $booking->anemia = boolval($request->anemia);
        $booking->user_id = $user->id;
        $booking->hospital_id = $hospital->id;
        $booking->request_id = $bloodRequest->id;
        $booking->save();

        return response()->json([
            "message" => "Booking created successfully",
            "booking" => $booking
        ]);
    }

    public function getBookings(Request $request)
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(["message" => 'Failed']);
        }
        $search_value = $request->search_value;

        if (!is_null($search_value) && !empty($search_value)) {
            $bookings = Booking::join('users', 'users.id', '=', 'bookings.user_id')
                ->join('bloodtypes', 'bloodtypes.id', '=', 'users.bloodtype_id')
                ->where('bloodtypes.name', 'like', '%' . $search_value . '%')
                ->orWhere('users.first_name', 'like', '%' . $search_value . '%')
                ->orWhere('users.last_name', 'like', '%' . $search_value . '%')
                ->get(['*', 'bookings.id as booking_id']);
        } else {
            $bookings = $user->employees[0]->hospital->bookings;
        }

        foreach ($bookings as $booking) {
            $booking->user_email = $booking->user->email;
            $userFirstName = ucwords($booking->user->first_name);
            $userLastName = ucwords($booking->user->last_name);
            $booking->user_name = $userFirstName . ' ' . $userLastName;
            $booking->user_blood_type = $booking->user->bloodtype->name;

            $donated = false;
            $donation = Donation::where('request_id', $booking->request_id)->where('user_id', $booking->user_id)->first();
            if ($donation) {
                $donated = true;
            }
            $booking->donated = $donated;
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

    public function getUserBooking()
    {
        $user = Auth::user();
        $currentTime = now();
        $user_bookings = $user->bookings->filter(function ($booking) use ($currentTime) {
            $bookingTime = Carbon::createFromFormat('Y-m-d H:i:s', $booking->time);
            return $bookingTime->isFuture();
        })->sortBy(function ($booking) use ($currentTime) {

            $bookingTime = Carbon::createFromFormat('Y-m-d H:i:s', $booking->time);
            return $bookingTime->diffInSeconds($currentTime);
        });
        $upcoming_booking = $user_bookings->first();
        if (!$upcoming_booking) {
            return response()->json([
                "message" => "No upcoming bookings found."
            ]);
        }
        $hospital_details = $upcoming_booking->hospital;
        $upcoming_booking->hospital_detailes = [
            "id" => $hospital_details->id,
            "name" => $hospital_details->name,
            "logo_url" => $hospital_details->logo_url
        ];
        unset($upcoming_booking->hospital);
        return response()->json([
            "upcoming_booking" => $upcoming_booking
        ]);
    }

}
