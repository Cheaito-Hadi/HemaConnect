<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DonationController extends Controller
{
    public function getLastDonation()
    {
        $user = Auth::user();
        $donation = $user->donations->sortByDesc('time')->first();

        if ($donation) {
            $lastDonationDate = Carbon::parse($donation->time);
            $currentDate = Carbon::now();
            $daysSinceLastDonation = $currentDate->diffInDays($lastDonationDate);
            $donateAfter = 70 - $daysSinceLastDonation;
            $donateAfterDate = $currentDate->addDays($donateAfter)->toDateString();
            $donation->last_donated_at = $daysSinceLastDonation;
            $donation->donate_after = $donateAfter;
            $donation->donate_after_date = $donateAfterDate;

            return response()->json([
                "message" => "success",
                "Donation" => $donation,
            ]);
        } else {
            return response()->json([
                "message" => "No donation found.",
            ]);
        }
    }
}
