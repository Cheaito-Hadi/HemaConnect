<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Support\Facades\Auth;

class MapController extends Controller
{
    public function getHospitals()
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
                    "longitude" => $hospital->longitude,
                    "latitude" => $hospital->latitude,
                    "phone_number" => $hospital->phone_number
                ],
                "requests" => $filteredRequests->values(),
            ];
        });
        return response()->json([
            "message" => "success",
            "Blood_Requests" => $filteredHospitals->values(),
        ]);

    }
}
