<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function bloodType()
    {
        return $this->belongsTo(BloodType::class, 'bloodtypes_id');
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class, 'hospital_id');
    }

    public function donations()
    {
        return $this->hasMany(Donation::class, 'request_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'request_id');
    }
}
