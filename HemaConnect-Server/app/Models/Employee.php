<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    public $timestamps = false;
    public function hospital()
    {
        return $this->belongsTo(Hospital::class, 'hospital_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
