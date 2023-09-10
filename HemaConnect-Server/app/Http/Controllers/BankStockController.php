<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BankStockController extends Controller
{
    public function getBankStocks()
    {
        $user = Auth::user();
        $bankStocks = $user->employees[0]->hospital->banks[0]->bankStock;
        foreach ($bankStocks as $bankStock) {
            $bankStock->bloodtype_name = $bankStock->bloodtype->name;
            unset($bankStock->bloodtype);
        }

        return response()->json([
            'message' => 'success',
            'bank_stocks_data' => $bankStocks
        ]);
    }

    public function updateBankStocks(Request $request, $id)
    {
        $user = Auth::user();
        $bankStock = $user->employees[0]->hospital->banks[0]->bankStock->first(function ($item) use ($id) {
            return $item->id == $id;
        });

        if ($bankStock && is_numeric($request->amount)) {
            $bankStock->amount = $request->amount;
            $bankStock->save();

            return response()->json([
                'message' => 'Bank stock updated successfully',
                'bank_stock_data' => $bankStock,
            ]);
        } else {
            return response()->json([
                'message' => "Bank stock with ID $id not found or invalid amount.",
            ]);
        }
    }
}
