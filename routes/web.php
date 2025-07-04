<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\{
    ProfileController,
    CustomerController,
    StaffController,
    OwnerController,
    GuestController,
    ReservationController,
    Auth\AuthenticatedSessionController,
    Auth\RegisteredUserController,
    Auth\GoogleController,
    Owner\CompanyInfoController,
    Owner\BookingController as OwnerBookingController,
    Owner\UserController as OwnerUserController,
    Owner\VehicleController as OwnerVehicleController,
    Owner\FleetController as OwnerFleetController,
    Owner\ReportController as OwnerReportController,
    Staff\BookingController as StaffBookingController,
    Staff\VehicleController as StaffVehicleController,
    Staff\FleetController as StaffFleetController,
    VehicleController as CustomerVehicleController
};

// Public routes accessible to all users
Route::get('/', [CustomerVehicleController::class, 'welcome'])->name('home');
Route::get('/fleet', [GuestController::class, 'fleet'])->name('fleet');
Route::get('/contact', [CompanyInfoController::class, 'contact'])->name('contact');
Route::get('/about', [GuestController::class, 'about'])->name('about');

Route::get('/vehicles/{id}', [CustomerVehicleController::class, 'show'])->name('vehicle.show');
Route::get('/api/vehicles/{id}', [CustomerVehicleController::class, 'apiShow']);
Route::get('/vehicles/{vehicle}/availability', [ReservationController::class, 'checkAvailability']);

// Broadcasting routes with authentication middleware
Broadcast::routes(['middleware' => ['auth']]);

// Google Authentication routes
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

// Routes protected by authentication and email verification
Route::middleware(['auth', 'verified'])->group(function () {

    // General dashboard route
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Role-based dashboard routes
    Route::middleware('role:owner')->get('/owner/dashboard', fn () => Inertia::render('Owner/Dashboard'))->name('owner.dashboard');
    Route::middleware('role:staff')->get('/staff/dashboard', fn () => Inertia::render('Staff/Dashboard'))->name('staff.dashboard');
    Route::middleware('role:customer')->get('/customer/dashboard', [CustomerController::class, 'dashboard'])->name('customer.dashboard');


    // Mark notification as read
    Route::post('/notifications/{id}/read', function ($id) {
        auth()->user()->unreadNotifications()->where('id', $id)->update(['read_at' => now()]);
        return response()->json(['status' => 'success']);
    })->name('notifications.read');

    // Customer-specific routes
    Route::middleware('role:customer')->group(function () {
        Route::get('/customer/profile', [CustomerController::class, 'edit'])->name('customer.profile');
        Route::post('/customer/profile/update', [CustomerController::class, 'update'])->name('customer.profile.update');
        Route::post('/customer/reservations', [ReservationController::class, 'store'])->name('customer.reservations.store');
        Route::get('/api/vehicles', [CustomerVehicleController::class, 'apiIndex']);
        
        // Reservation page with optional query parameters
        Route::get('/reserve', function (Request $request) {
            return Inertia::render('Reserve', [
                'vehicle_id' => $request->vehicle_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);
        })->middleware(['auth', 'verified'])->name('reserve.page');

        // Reservation summary page
        Route::get('/reservation/summary', function () {
            return Inertia::render('Customer/ReservationSummary');
        })->middleware(['auth', 'verified'])->name('reservation.summary');
    });

    // Owner-specific routes grouped under /owner prefix
    Route::prefix('owner')->name('owner.')->middleware('role:owner')->group(function () {

        // Owner profile management
        Route::get('/profile', [OwnerController::class, 'edit'])->name('profile');
        Route::post('/profile/update', [OwnerController::class, 'update'])->name('profile.update');

        // Company information management
        Route::get('/company-info', [CompanyInfoController::class, 'index'])->name('company.info');
        Route::post('/company-info/{companyInfo}', [CompanyInfoController::class, 'update'])->name('company.info.update');

        // Owner bookings and reservations
        Route::get('/bookings', [ReservationController::class, 'index'])->name('bookings');
        Route::get('reservations', [ReservationController::class, 'index'])->name('reservations.index');
        Route::get('reservations/{reservation}', [ReservationController::class, 'show'])->name('reservations.show');
        Route::put('reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');
        Route::post('reservations/{reservation}/confirm', [OwnerBookingController::class, 'confirmReservation'])->name('reservations.confirm');

        // Vehicles and fleet management
        Route::get('/vehicles', [OwnerVehicleController::class, 'index'])->name('vehicles');
        Route::get('/fleet', [OwnerFleetController::class, 'index'])->name('fleet');
        Route::get('/reports', [OwnerReportController::class, 'index'])->name('reports');

        // User management routes
        Route::get('/users', [OwnerUserController::class, 'index'])->name('users');
        Route::get('/users/create', [OwnerUserController::class, 'create'])->name('users.create');
        Route::post('/users', [OwnerUserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}', [OwnerUserController::class, 'show'])->name('users.show');
        Route::put('/users/{user}', [OwnerUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [OwnerUserController::class, 'destroy'])->name('users.destroy');
        Route::get('/customer/license/{user}', [OwnerUserController::class, 'showLicenseStatus'])->name('customer.license.status');

        // Vehicle management routes
        Route::get('/vehicles/create', [OwnerVehicleController::class, 'create'])->name('vehicles.create');
        Route::post('/vehicles', [OwnerVehicleController::class, 'store'])->name('vehicles.store');
        Route::get('/vehicles/{vehicle}', [OwnerVehicleController::class, 'show'])->name('vehicles.show');
        Route::put('/vehicles/{vehicle}', [OwnerVehicleController::class, 'update'])->name('vehicles.update');
        Route::delete('/vehicles/{vehicle}', [OwnerVehicleController::class, 'destroy'])->name('vehicles.destroy');
    });

    // Staff-specific routes grouped under /staff prefix
    Route::prefix('staff')->name('staff.')->middleware('role:staff')->group(function () {
        // Staff profile management
        Route::get('/profile', [StaffController::class, 'edit'])->name('profile');
        Route::post('/profile/update', [StaffController::class, 'update'])->name('profile.update');

        // Bookings and fleet management for staff
        Route::get('/bookings', [StaffBookingController::class, 'index'])->name('bookings');
        Route::get('/vehicles', [StaffVehicleController::class, 'index'])->name('vehicles');
        Route::get('/fleet', [StaffFleetController::class, 'index'])->name('fleet');

        // Staff vehicle management routes
        Route::get('/vehicles/create', [StaffVehicleController::class, 'create'])->name('vehicles.create');
        Route::post('/vehicles', [StaffVehicleController::class, 'store'])->name('vehicles.store');
        Route::get('/vehicles/{vehicle}', [StaffVehicleController::class, 'show'])->name('vehicles.show');
        Route::put('/vehicles/{vehicle}', [StaffVehicleController::class, 'update'])->name('vehicles.update');
    });
});

// Include authentication routes
require __DIR__.'/auth.php';
