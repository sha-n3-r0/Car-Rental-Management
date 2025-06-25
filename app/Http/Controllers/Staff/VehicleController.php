<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index()
    {
        // Fetch all vehicles
        $vehicles = Vehicle::latest()->get();

        return inertia('Staff/Vehicles', [
            'vehicles' => $vehicles
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        return inertia('Staff/ViewVehicle', [
            'vehicle' => $vehicle,
        ]);
    }

    public function create()
    {
        return inertia('Staff/AddVehicle'); 
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'license_plate'         => 'required|string|max:255',
            'vin'                   => 'nullable|string|max:255',
            'make'                  => 'required|string|max:255',
            'model'                 => 'required|string|max:255',
            'year'                  => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'color'                 => 'nullable|string|max:255',
            'seats'                 => 'nullable|integer|min:1',
            'vehicle_type'          => 'nullable|string|max:255',
            'transmission'          => 'nullable|string|max:255',
            'fuel_type'             => 'nullable|string|max:255',
            'odometer'              => 'nullable|integer|min:0',
            'status'                => 'nullable|string|max:50',
            'rental_rate_per_day'   => 'nullable|numeric|min:0',
            'late_fee_per_day'      => 'nullable|numeric|min:0',
            'last_service_date'     => 'nullable|date',
            'insurance_expiry_date' => 'nullable|date',
            'image'                 => 'nullable|image|max:2048',
            'is_active'             => 'nullable|boolean',
        ]);

        // Set default value if not passed
        if (!isset($validated['status'])) {
            $validated['status'] = 'available';
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('vehicles', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        // Create the vehicle record
        Vehicle::create($validated);

        return redirect()->route('staff.vehicles')->with('success', 'Vehicle added successfully.');
    }
}
