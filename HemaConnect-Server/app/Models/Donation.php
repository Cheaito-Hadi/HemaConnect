<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function request()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }
}
