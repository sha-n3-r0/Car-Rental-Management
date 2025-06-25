<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use Inertia\Inertia;
use App\Http\Controllers\{
    ProfileController,
    CustomerController,
    StaffController,
    OwnerController,
    Auth\AuthenticatedSessionController,
    Auth\RegisteredUserController,
    Auth\GoogleController,
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

// Public routes
Route::get('/', fn () => Inertia::render('Welcome'))->name('home');
Route::get('/fleet', [CustomerVehicleController::class, 'index'])->name('fleet');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::get('/reserve', fn () => Inertia::render('Reserve'))->name('reserve');

Route::get('/vehicles/{id}', [CustomerVehicleController::class, 'show'])->name('vehicle.show');

Broadcast::routes(['middleware' => ['auth']]);

// Google Auth routes
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

// Protected routes for authenticated & verified users
Route::middleware(['auth', 'verified'])->group(function () {

    // General dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Role-based dashboards
    Route::middleware('role:owner')->get('/owner/dashboard', fn () => Inertia::render('Owner/Dashboard'))->name('owner.dashboard');
    Route::middleware('role:staff')->get('/staff/dashboard', fn () => Inertia::render('Staff/Dashboard'))->name('staff.dashboard');
    Route::middleware('role:customer')->get('/customer/dashboard', fn () => Inertia::render('Customer/Dashboard'))->name('customer.dashboard');

    // Notifications mark as read
    Route::post('/notifications/{id}/read', function ($id) {
        auth()->user()->unreadNotifications()->where('id', $id)->update(['read_at' => now()]);
        return response()->json(['status' => 'success']);
    })->name('notifications.read');

    // Customer routes
    Route::middleware('role:customer')->group(function () {
        Route::get('/customer/profile', [CustomerController::class, 'edit'])->name('customer.profile');
        Route::post('/customer/profile/update', [CustomerController::class, 'update'])->name('customer.profile.update');
    });

    // Owner routes
    Route::prefix('owner')->name('owner.')->middleware('role:owner')->group(function () {

        // Profile
        Route::get('/profile', [OwnerController::class, 'edit'])->name('profile');
        Route::post('/profile/update', [OwnerController::class, 'update'])->name('profile.update');

        // Main pages
        Route::get('/bookings', [OwnerBookingController::class, 'index'])->name('bookings');
        Route::get('/vehicles', [OwnerVehicleController::class, 'index'])->name('vehicles');
        Route::get('/fleet', [OwnerFleetController::class, 'index'])->name('fleet');
        Route::get('/reports', [OwnerReportController::class, 'index'])->name('reports');
        Route::get('/users', [OwnerUserController::class, 'index'])->name('users');

        // User management
        Route::get('/users/create', [OwnerUserController::class, 'create'])->name('users.create');
        Route::post('/users', [OwnerUserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}', [OwnerUserController::class, 'show'])->name('users.show');
        Route::put('/users/{user}', [OwnerUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [OwnerUserController::class, 'destroy'])->name('users.destroy');
        Route::get('/customer/license/{user}', [OwnerUserController::class, 'showLicenseStatus'])->name('customer.license.status');

        // Vehicle management
        Route::get('/vehicles/create', [OwnerVehicleController::class, 'create'])->name('vehicles.create');
        Route::post('/vehicles', [OwnerVehicleController::class, 'store'])->name('vehicles.store');
        Route::get('/vehicles/{vehicle}', [OwnerVehicleController::class, 'show'])->name('vehicles.show');
        Route::put('/vehicles/{vehicle}', [OwnerVehicleController::class, 'update'])->name('vehicles.update');
        Route::delete('/vehicles/{vehicle}', [OwnerVehicleController::class, 'destroy'])->name('vehicles.destroy');
    });

    // Staff routes
    Route::prefix('staff')->name('staff.')->middleware('role:staff')->group(function () {
        Route::get('/profile', [StaffController::class, 'edit'])->name('profile');
        Route::post('/profile/update', [StaffController::class, 'update'])->name('profile.update');

        Route::get('/bookings', [StaffBookingController::class, 'index'])->name('bookings');
        Route::get('/vehicles', [StaffVehicleController::class, 'index'])->name('vehicles');
        Route::get('/fleet', [StaffFleetController::class, 'index'])->name('fleet');

        // Vehicle management
        Route::get('/vehicles/create', [StaffVehicleController::class, 'create'])->name('vehicles.create');
        Route::post('/vehicles', [StaffVehicleController::class, 'store'])->name('vehicles.store');
        Route::get('/vehicles/{vehicle}', [StaffVehicleController::class, 'show'])->name('vehicles.show');
        Route::put('/vehicles/{vehicle}', [StaffVehicleController::class, 'update'])->name('vehicles.update');
    });
});

// Auth routes
require __DIR__.'/auth.php';
