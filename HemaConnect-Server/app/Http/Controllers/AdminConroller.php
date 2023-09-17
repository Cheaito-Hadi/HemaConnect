<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Http\Request;

class AdminConroller extends Controller
{
    public function createHospital(Request $request){
        $new_hospital = new Hospital;
        $new_hospital->name = $request->name;
        $new_hospital->latitude = $request->latitude;
        $new_hospital->longitude = $request->longitude;
        $new_hospital->phone_number = $request->phone_number;
        $file_name = time() . "_" . uniqid() . "_hospital_logo." . $request->logo_url->getClientOriginalExtension();
        $request->logo_url->storeAs('public/hospitalLogos', $file_name);
        $new_hospital->logo_url ="hospitalLogos/". $file_name;
        $new_hospital->save();

        return response()->json([
            "status" => "success",
            "new_hospital" => $new_hospital
        ]);
    }
}
