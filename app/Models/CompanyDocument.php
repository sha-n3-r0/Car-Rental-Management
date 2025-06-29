<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyDocument extends Model
{
    // Allow mass assignment for these fields
    protected $fillable = [
        'company_info_id',
        'type',   // e.g., 'certificate' or 'proof_of_transaction'
        'path',   // file path to the uploaded document
    ];

    // Relationship to CompanyInfo
    public function companyInfo()
    {
        return $this->belongsTo(CompanyInfo::class);
    }
}
