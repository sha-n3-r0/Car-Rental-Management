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
        $vehicle = Vehicle::findOrFail($id);

        $vehicleData = $vehicle->only([
            'id', 'make', 'model', 'license_plate', 'image_url', 'odometer',
            'rental_rate_per_day', 'status', 'seats', 'doors', 'transmission'
        ]);

        return Inertia::render('VehicleDetail', [
            'vehicle' => $vehicleData,
        ]);
    }

    public function apiShow($id)
    {
        $vehicle = Vehicle::find($id);

        if (!$vehicle) {
            return response()->json(['message' => 'Vehicle not found.'], 404);
        }

        return response()->json([
            'vehicle' => $vehicle
        ]);
    }
    
    public function apiIndex()
    {
        $vehicles = Vehicle::all(); // Or apply any filters for availability or type
        return response()->json($vehicles);
    }
}
