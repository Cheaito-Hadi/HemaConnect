<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function uploadImage(Request $request)
    {
        $user = Auth::user();
        if ($request->hasFile('profile_image')) {
            $file_name = time() . "_" . uniqid() . "_profile_image." . $request->file('profile_image')->getClientOriginalExtension();
            $request->file('profile_image')->storeAs('public/profileImages', $file_name);
            $user->image_url = "profileImages/" . $file_name;
            $user->save();

            return response()->json([
                "status" => "success",
                "message" => "Profile image uploaded successfully.",
                "image_url" => $user->image_url
            ]);
        } else {
            return response()->json([
                "status" => "error",
                "message" => "No image file uploaded.",
            ]);
        }
    }

    public function registerNotificationToken(Request $request)
    {
        $user = Auth::user();
        if ($request->token) {
            $user->notification_token = $request->token;
            $user->save();

            return response()->json([
                "status" => "success",
                "message" => "token notification registered",
            ]);
        } else {
            return response()->json([
                    "status" => "error",
                    "message" => "token notification failed",
                ]);
        }
    }

}
