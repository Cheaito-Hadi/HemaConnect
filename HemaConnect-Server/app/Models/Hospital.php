<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function users()
    {
        return $this->hasMany(User::class, 'hospital_id');
    }

    public function employees()
    {
        return $this->hasMany(Employee::class, 'hospital_id');
    }

    public function banks()
    {
        return $this->hasMany(Bank::class, 'hospital_id');
    }

    public function requests()
    {
        return $this->hasMany(BloodRequest::class, 'hospital_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'hospital_id');
    }
}
