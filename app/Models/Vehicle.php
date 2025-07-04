<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'owner_id', // Add this line
        'license_plate', 'vin', 'make', 'model', 'year', 'color', 'seats',
        'vehicle_type', 'transmission', 'fuel_type', 'odometer', 'status',
        'rental_rate_per_day', 'late_fee_per_day', 'last_service_date',
        'insurance_expiry_date', 'image_url', 'documents', 'is_active',
    ];

    protected $casts = [
        'documents' => 'array',
        'last_service_date' => 'date',
        'insurance_expiry_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function reservations()
    {
        return $this->hasMany(\App\Models\Reservation::class);
    }

    // Add owner relationship for convenience
    public function owner()
    {
        return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }
}
