<?php

// app/Models/CompanyInfo.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    protected $fillable = [
        'logo',
        'mission',
        'vision',
        'certificates',
        'proof_of_transactions',
        'location',
        'phone',
        'email',
    ];

    public function documents()
    {
        return $this->hasMany(CompanyDocument::class);
    }
}
