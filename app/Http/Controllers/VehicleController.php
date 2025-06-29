<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function welcome()
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
                'seats',      // Make sure your Vehicle model/table has this
                'doors',      // and this
                'transmission' // and this
            ]);
        });

        return Inertia::render('Welcome', [
            'vehicles' => $vehicles,
        ]);
    }

    // Display details of a single vehicle
    public function show($id)
    {
        // Fetch the vehicle by ID or fail if not found
        $vehicle = Vehicle::findOrFail($id);

        // Only send necessary fields for customer view
        $vehicleData = $vehicle->only([
            'make', 'model', 'license_plate', 'image_url', 'odometer', 'rental_rate_per_day', 'status'
        ]);

        // Render the VehicleDetail page and pass the vehicle data
        return Inertia::render('VehicleDetail', [
            'vehicle' => $vehicleData,
        ]);
    }
}
