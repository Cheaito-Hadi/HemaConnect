<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodType extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'bloodtypes';

    public function users()
    {
        return $this->hasMany(User::class, 'bloodtype_id');
    }

    public function requests()
    {
        return $this->hasMany(BloodRequest::class, 'bloodtype_id');
    }

    public function bankStocks()
    {
        return $this->hasMany(BankStock::class, 'bloodtype_id');
    }
}
