<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Vehicle;
use App\Models\Reservation;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    // Welcome page - fetch and display all vehicles
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
                'seats',
                'doors',
                'transmission',
            ]);
        });

        return Inertia::render('Welcome', [
            'vehicles' => $vehicles,
        ]);
    }

    // Show vehicle details
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

    // API endpoint for showing a vehicle's details
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

    // API endpoint for fetching all vehicles
    public function apiIndex()
    {
        $vehicles = Vehicle::all();
        return response()->json($vehicles);
    }

    // Search for available vehicles based on date range
    public function search(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        // Ensure both start and end date are provided
        if (!$startDate || !$endDate) {
            return redirect()->route('home')->withErrors('Start and end date are required.');
        }

        // Get the list of vehicles that are already booked during the date range
        $bookedVehicleIds = Reservation::where(function ($query) use ($startDate, $endDate) {
            $query->whereBetween('start_date', [$startDate, $endDate])
                ->orWhereBetween('end_date', [$startDate, $endDate])
                ->orWhere(function ($q) use ($startDate, $endDate) {
                    $q->where('start_date', '<=', $startDate)
                        ->where('end_date', '>=', $endDate);
                });
        })->pluck('vehicle_id'); // Only the vehicle IDs that are booked

        // Fetch vehicles that are not booked during the selected date range
        $availableVehicles = Vehicle::whereNotIn('id', $bookedVehicleIds)
            ->get()
            ->map(function ($vehicle) {
                $vehicle->show_url = route('vehicle.show', $vehicle->id);
                return $vehicle;
            });

        // Return the available vehicles and the search parameters to the frontend
        return Inertia::render('SearchVehicle', [
            'vehicles' => $availableVehicles,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);
    }
}
