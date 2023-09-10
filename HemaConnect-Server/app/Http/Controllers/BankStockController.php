<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BankStockController extends Controller
{
    public function getBankStocks(){
        $user = Auth::user();
        $bankStocks= $user->employees[0]->hospital->banks[0]->bankStock;
        foreach ($bankStocks as $bankStock){
            $bankStock->bloodtype_name= $bankStock->bloodtype->name;
            unset($bankStock->bloodtype);
        }

        return response()->json([
            'message' => 'success',
            'bank_stocks_data' => $bankStocks
        ]);
    }
}
