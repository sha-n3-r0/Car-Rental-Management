<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLicense extends Model
{
    protected $fillable = [
        'user_id',
        'license_number',
        'license_type',
        'license_class',
        'issued_date',
        'expiry_date',
        'name_on_license',
        'birth_date',
        'address',
        'license_image',
        'license_image_back',
        'status',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
