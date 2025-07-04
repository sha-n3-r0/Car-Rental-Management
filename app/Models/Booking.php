<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'reservation_id',
        'user_id',
        'vehicle_id',
        'start_date',
        'end_date',
        'pickup_time',
        'dropoff_time',
        'pickup_location',
        'dropoff_location',
        'total_cost',
        'status',
    ];
}
