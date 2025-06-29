<?php

// app/Http/Controllers/GuestController.php

namespace App\Http\Controllers;

use App\Models\CompanyInfo;
use App\Models\CompanyDocument;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Vehicle;

class GuestController extends Controller
{
    public function about()
    {
        $company = CompanyInfo::first();

        // Fetch all certificates & proofs for this company from DB
        $certificates = CompanyDocument::where('company_info_id', $company->id)
                        ->where('type', 'certificate')
                        ->pluck('path')
                        ->toArray();

        $proofs = CompanyDocument::where('company_info_id', $company->id)
                    ->where('type', 'proof')
                    ->pluck('path')
                    ->toArray();

        return Inertia::render('About', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'mission' => $company->mission,
            // Pass full URLs to images (you need to prefix storage path)
            'certificates' => array_map(fn($p) => asset("storage/{$p}"), $certificates),
            'proofOfTransactions' => array_map(fn($p) => asset("storage/{$p}"), $proofs),
        ]);
    }

    public function fleet()
    {
        $vehicles = Vehicle::all()->map(function ($vehicle) {
            $vehicle->show_url = route('vehicle.show', $vehicle->id);
            return $vehicle->only([
                'id',
                'make',
                'model',
                'license_plate',
                'image_url',
                'odometer',
                'rental_rate_per_day',
                'status',
                'show_url',
            ]);
        });

        return Inertia::render('Fleet', [
            'vehicles' => $vehicles,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
