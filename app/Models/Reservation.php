<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id', 'vehicle_id', 'start_date', 'end_date', 'status',
        'pickup_time', 'dropoff_time', 'pickup_location', 'dropoff_location',
        'payment_method', 'transaction_reference_no', 'payment_proof',
        'promo_code', 'discount', 'total_cost', 'loyalty_points',
    ];

    public function booking()
    {
        return $this->hasOne(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }
}