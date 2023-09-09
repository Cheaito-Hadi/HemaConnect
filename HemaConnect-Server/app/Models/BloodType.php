<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodType extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function users()
    {
        return $this->hasMany(User::class, 'bloodtype_id');
    }

    public function requests()
    {
        return $this->hasMany(Request::class, 'bloodtype_id');
    }

    public function bankStock()
    {
        return $this->hasMany(BankStock::class, 'bloodtype_id');
    }
}
