<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BankStockController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\RequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::get('/get_bankstocks', [BankStockController::class, "getBankStocks"]);
Route::post('/bankstocks/{id}', [BankStockController::class, 'updateBankStocks']);

Route::post('/create_bloodrequest', [RequestController::class, 'createRequest']);
Route::get('/get_bloodrequests', [RequestController::class, "getRequests"]);
Route::post('/create_donation', [RequestController::class, 'createDonation']);
Route::get('/get_userrequests', [RequestController::class, 'getUserRequests']);

Route::post('/create_booking', [BookingController::class, 'createBooking']);
Route::get('/get_bookings', [BookingController::class, 'getBookings']);
Route::delete('/delete_booking/{id}', [BookingController::class, 'deleteBooking']);
Route::post('/bookings/search', [BookingController::class, 'searchBookings']);
Route::get('/get_userbookings', [BookingController::class, 'getUserBooking']);

Route::get('/get_lastdonation', [DonationController::class, "getLastDonation"]);

Route::post('/create_hospital', [AdminController::class, "createHospital"]);

