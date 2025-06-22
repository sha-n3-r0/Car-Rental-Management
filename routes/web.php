<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\OwnerController;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\Owner\BookingController as OwnerBookingController;
use App\Http\Controllers\Owner\UserController as OwnerUserController;   
use App\Http\Controllers\Owner\VehicleController as OwnerVehicleController;
use App\Http\Controllers\Owner\FleetController as OwnerFleetController;
use App\Http\Controllers\Owner\ReportController as OwnerReportController;
use App\Http\Controllers\Staff\BookingController as StaffBookingController;
use App\Http\Controllers\Staff\VehicleController as StaffVehicleController;
use App\Http\Controllers\Staff\FleetController as StaffFleetController;

// Home (Public)
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/fleet', function () {
    return Inertia::render('Fleet');
})->name('fleet');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/reserve', function () {
    return Inertia::render('Reserve');
})->name('reserve');

Broadcast::routes(['middleware' => ['auth']]);

/*
|-------------------------------------------------------------------------- 
| Sign in with Google
|-------------------------------------------------------------------------- 
*/
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

/*
|-------------------------------------------------------------------------- 
| Protected Routes (Authenticated + Verified Users Only)
|-------------------------------------------------------------------------- 
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // General dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Role-based dashboards
    Route::middleware('role:owner')->get('/owner/dashboard', fn () => Inertia::render('Owner/Dashboard'))->name('owner.dashboard');
    Route::middleware('role:staff')->get('/staff/dashboard', fn () => Inertia::render('Staff/Dashboard'))->name('staff.dashboard');
    Route::middleware('role:customer')->get('/customer/dashboard', fn () => Inertia::render('Customer/Dashboard'))->name('customer.dashboard');

    // Notification mark-as-read route
    Route::post('/notifications/{id}/read', function ($id) {
        auth()->user()->unreadNotifications()->where('id', $id)->update(['read_at' => now()]);
        return response()->json(['status' => 'success']);
    })->name('notifications.read');
    
    // Customer routes
    Route::middleware(['role:customer'])->group(function () {
        Route::get('/customer/profile', [CustomerController::class, 'edit'])->name('customer.profile');
        Route::post('/customer/profile/update', [CustomerController::class, 'update'])->name('customer.profile.update');
    });

    // Owner routes
    Route::prefix('owner')->name('owner.')->middleware(['role:owner'])->group(function () {
        Route::get('/profile', [OwnerController::class, 'edit'])->name('profile');
        Route::post('/profile/update', [OwnerController::class, 'update'])->name('profile.update');

        Route::get('/bookings', [OwnerBookingController::class, 'index'])->name('bookings');
        Route::get('/users', [OwnerUserController::class, 'index'])->name('users');
        Route::get('/vehicles', [OwnerVehicleController::class, 'index'])->name('vehicles');
        Route::get('/fleet', [OwnerFleetController::class, 'index'])->name('fleet');
        Route::get('/reports', [OwnerReportController::class, 'index'])->name('reports');

        // Owner User management routes (show, create, update, and delete)
        Route::get('/users/create', [OwnerUserController::class, 'create'])->name('users.create');  // Create new user
        Route::post('/users', [OwnerUserController::class, 'store'])->name('users.store');  // Store the new user
        Route::get('/users/{user}', [OwnerUserController::class, 'show'])->name('users.show');  // Show user profile
        Route::put('/users/{user}', [OwnerUserController::class, 'update'])->name('users.update');  // Update user info
        Route::delete('/users/{user}', [OwnerUserController::class, 'destroy'])->name('users.destroy');  // Delete user

        Route::get('/customer/license/{user}', [OwnerUserController::class, 'showLicenseStatus'])->name('customer.license.status');
    });

    // Staff routes
    Route::prefix('staff')->name('staff.')->middleware(['role:staff'])->group(function () {
        Route::get('/profile', [StaffController::class, 'edit'])->name('profile');
        Route::post('/profile/update', [StaffController::class, 'update'])->name('profile.update');

        Route::get('/bookings', [StaffBookingController::class, 'index'])->name('bookings');
        Route::get('/vehicles', [StaffVehicleController::class, 'index'])->name('vehicles');
        Route::get('/fleet', [StaffFleetController::class, 'index'])->name('fleet');
    });
});

/*
|-------------------------------------------------------------------------- 
| Auth Routes
|-------------------------------------------------------------------------- 
*/
require __DIR__.'/auth.php';
