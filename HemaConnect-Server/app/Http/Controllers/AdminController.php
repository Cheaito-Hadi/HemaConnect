<?php

namespace App\Http\Controllers;

use App\Models\Hospital;
use Illuminate\Http\Request;
use App\Models\BankStock;
use App\Models\BloodType;
use App\Models\Bank;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
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

        $bloodTypes = BloodType::all();
        $new_bank = new Bank([
            'hospital_id' => $new_hospital->id,
        ]);
        $new_bank->save();
        foreach ($bloodTypes as $bloodType) {
            $new_bankStock = new BankStock([
                'bank_id' => $new_bank->id,
                'bloodtype_id' => $bloodType->id,
                'amount' => 0.0,
            ]);
            $new_bankStock->save();
        }
        return response()->json([
            "status" => "success",
            "new_hospital" => $new_hospital
        ]);
    }

    public function getAllHospitals(){
        $all_hospitals= Hospital::all();

        return response()->json([
            "status" => "success",
            "all_hospitals" => $all_hospitals
        ]);
    }

    public function createEmployee(){

    }
}
