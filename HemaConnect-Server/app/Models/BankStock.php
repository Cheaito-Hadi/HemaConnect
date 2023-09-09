<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankStock extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function bloodType()
    {
        return $this->belongsTo(BloodType::class, 'bloodtype_id');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class, 'bank_id');
    }
}
