<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Reservation;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * Display a listing of reservations for vehicles owned by the authenticated owner.
     */
    public function index()
    {
        $owner = Auth::user();

        // Retrieve reservations where the related vehicle belongs to the current owner
        $reservations = Reservation::with(['user', 'vehicle'])
            ->whereHas('vehicle', function ($query) use ($owner) {
                $query->where('owner_id', $owner->id);
            })
            ->orderBy('start_date', 'desc')
            ->get();

        // Render Inertia component with the reservations data
        return inertia('Owner/Bookings', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * Confirm a reservation by updating its status and creating a booking record.
     *
     * @param int $id Reservation ID
     */
    public function confirmReservation($id)
    {
        // Find reservation or fail with 404 if not found
        $reservation = Reservation::findOrFail($id);

        // Update the reservation status to 'confirmed'
        $reservation->update(['status' => 'confirmed']);

        // Generate a unique booking code
        $bookingCode = 'BOOK-' . now()->format('Ymd') . '-' . rand(1000, 9999);

        // Create a new booking linked to this reservation
        Booking::create([
            'reservation_id' => $reservation->id,
            'booking_code' => $bookingCode,
        ]);

        // Redirect back with a success message
        return back()->with('success', 'Reservation confirmed & booking created.');
    }
}
