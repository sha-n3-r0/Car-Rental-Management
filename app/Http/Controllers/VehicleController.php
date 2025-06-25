<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    // Display the list of vehicles
    public function index()
    {
        // Fetch all vehicles with only relevant customer data
        $vehicles = Vehicle::all()->map(function ($vehicle) {
            // Only include necessary fields
            $vehicle->show_url = route('vehicle.show', $vehicle->id); // Vehicle detail page URL
            return $vehicle->only(['id', 'make', 'model', 'license_plate', 'image_url', 'odometer', 'rental_rate_per_day', 'status', 'show_url']);
        });

        // Return the Fleet page with the vehicles data
        return Inertia::render('Fleet', [
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
