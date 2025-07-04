<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Vehicle;
use Inertia\Inertia;
use App\Models\Booking;

class ReservationController extends Controller
{
    /**
     * Store a new reservation.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'pickup_time' => 'required',
            'dropoff_time' => 'required',
            'pickup_location' => 'required',
            'dropoff_location' => 'required',
            'payment_method' => 'required',
            'transaction_reference_no' => 'required',
            'payment_proof' => 'required|image',
        ]);

        // Retrieve the vehicle for the reservation
        $vehicle = Vehicle::findOrFail($request->vehicle_id);

        // Calculate total rental days (inclusive)
        $days = now()->parse($request->start_date)->diffInDays($request->end_date) + 1;

        // Calculate base cost based on vehicle rental rate and days
        $cost = $vehicle->rental_rate_per_day * $days;

        // Apply promo code discount if applicable
        $discount = 0;
        if ($request->promo_code === 'DISCOUNT10') {
            $discount = $cost * 0.10; // 10% discount
        }

        // Calculate final cost after discount
        $finalCost = $cost - $discount;

        // Calculate loyalty points (1 point per 500 pesos spent)
        $loyalty = floor($finalCost / 500);

        // Store payment proof image in public storage
        $proofPath = $request->file('payment_proof')->store('payment_proofs', 'public');

        // Create the reservation record
        $reservation = Reservation::create([
            'user_id' => auth()->id(),
            'vehicle_id' => $request->vehicle_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'pickup_time' => $request->pickup_time,
            'dropoff_time' => $request->dropoff_time,
            'pickup_location' => $request->pickup_location,
            'dropoff_location' => $request->dropoff_location,
            'payment_method' => $request->payment_method,
            'transaction_reference_no' => $request->transaction_reference_no,
            'payment_proof' => $proofPath,
            'promo_code' => $request->promo_code,
            'discount' => $discount,
            'total_cost' => $finalCost,
            'loyalty_points' => $loyalty,
            'status' => 'pending',
        ]);

        // Redirect to reservation summary with success message
        return redirect()->route('reservation.summary')->with('success', 'Reservation created!');
    }

    /**
     * Check vehicle availability for given dates.
     */
    public function checkAvailability(Request $request, Vehicle $vehicle)
    {
        \Log::info("Checking availability for vehicle id: {$vehicle->id}", [
            'start_date' => $request->query('start_date'),
            'end_date' => $request->query('end_date'),
        ]);

        $start = $request->query('start_date');
        $end = $request->query('end_date');

        // Check for any existing reservation conflicts within the requested date range
        $conflict = $vehicle->reservations()
            ->where(function ($query) use ($start, $end) {
                $query->whereBetween('start_date', [$start, $end])
                    ->orWhereBetween('end_date', [$start, $end])
                    ->orWhereRaw('? BETWEEN start_date AND end_date', [$start])
                    ->orWhereRaw('? BETWEEN start_date AND end_date', [$end]);
            })
            ->exists();

        // Return JSON indicating availability status
        return response()->json(['available' => !$conflict]);
    }

    /**
     * Display details for a specific reservation.
     */
    public function show(Reservation $reservation)
    {
        // Eager load related user and vehicle models
        $reservation->load('user', 'vehicle');

        // Render reservation details view using Inertia
        return Inertia::render('Owner/ViewBooking', [
            'reservation' => $reservation,
        ]);
    }

    /**
     * List all reservations.
     */
    public function index()
    {
        // Get all reservations with their related user and vehicle
        $reservations = Reservation::with(['user', 'vehicle'])->latest()->get();

        // Render Inertia page Owner/Bookings (your React component)
        return Inertia::render('Owner/Bookings', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * Update reservation status and optionally create a booking.
     */
    public function update(Request $request, Reservation $reservation)
    {
        // Validate that status is one of the allowed values
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,cancelled,completed',
        ]);

        // Update the reservation status
        $reservation->update(['status' => $validated['status']]);

        // If approved, create a corresponding booking record if none exists
        if ($validated['status'] === 'approved') {
            if (!Booking::where('reservation_id', $reservation->id)->exists()) {
                Booking::create([
                    'reservation_id' => $reservation->id,
                    'user_id' => $reservation->user_id,
                    'vehicle_id' => $reservation->vehicle_id,
                    'start_date' => $reservation->start_date,
                    'end_date' => $reservation->end_date,
                    'pickup_time' => $reservation->pickup_time,
                    'dropoff_time' => $reservation->dropoff_time,
                    'pickup_location' => $reservation->pickup_location,
                    'dropoff_location' => $reservation->dropoff_location,
                    'total_cost' => $reservation->total_cost,
                    'status' => 'active',
                ]);
            }
        }

        // Redirect back to reservation details with success message
        return redirect()->route('owner.reservations.show', $reservation->id)
                        ->with('success', 'Reservation updated successfully.');
    }
}
