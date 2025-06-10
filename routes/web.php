<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\GoogleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\OwnerController;

use App\Http\Controllers\Owner\BookingController as OwnerBookingController;
use App\Http\Controllers\Owner\UserController as OwnerUserController;
use App\Http\Controllers\Owner\VehicleController as OwnerVehicleController;
use App\Http\Controllers\Owner\FleetController as OwnerFleetController;
use App\Http\Controllers\Owner\ReportController as OwnerReportController;
use App\Http\Controllers\Staff\BookingController as StaffBookingController;
use App\Http\Controllers\Staff\UserController as StaffUserController;
use App\Http\Controllers\Staff\VehicleController as StaffVehicleController;
use App\Http\Controllers\Staff\FleetController as StaffFleetController;
use App\Http\Controllers\Staff\ReportController as StaffReportController;

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

/*
|--------------------------------------------------------------------------
| Sign in with google
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
    // Email verification via code (if needed)
    Route::post('/verify-email', [VerificationController::class, 'verify'])->name('verify.email');

    // General dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Role-based dashboards
    Route::middleware('role:owner')->get('/owner/dashboard', fn () => Inertia::render('Owner/Dashboard'))->name('owner.dashboard');
    Route::middleware('role:staff')->get('/staff/dashboard', fn () => Inertia::render('Staff/Dashboard'))->name('staff.dashboard');
    Route::middleware('role:customer')->get('/customer/dashboard', fn () => Inertia::render('Customer/Dashboard'))->name('customer.dashboard');

    Route::middleware(['auth', 'role:customer'])->group(function () {
        Route::get('/customer/profile', [CustomerController::class, 'edit'])->name('customer.profile');
        Route::post('/customer/profile/update', [CustomerController::class, 'update'])->name('customer.profile.update');
    });

    Route::middleware(['auth', 'role:owner'])->group(function () {
        Route::get('/owner/profile', [OwnerController::class, 'edit'])->name('owner.profile');
        Route::post('/owner/profile/update', [OwnerController::class, 'update'])->name('owner.profile.update');
        Route::get('/owner/bookings', [OwnerBookingController::class, 'index'])->name('owner.bookings');
        Route::get('/owner/users', [OwnerUserController::class, 'index'])->name('owner.users');
        Route::get('/owner/vehicles', [OwnerVehicleController::class, 'index'])->name('owner.vehicles');
        Route::get('/owner/fleet', [OwnerFleetController::class, 'index'])->name('owner.fleet');
        Route::get('/owner/reports', [OwnerReportController::class, 'index'])->name('owner.reports');
    });

        Route::get('/whoami', function () {
            return [
                'user' => auth()->user(),
                'roles' => auth()->user()?->getRoleNames(),
            ];
        });

    Route::middleware(['auth', 'role:staff'])->group(function () {
        Route::get('/staff/profile', [StaffController::class, 'edit'])->name('staff.profile');
        Route::post('/staff/profile/update', [StaffController::class, 'update'])->name('staff.profile.update');
        Route::get('/staff/bookings', [StaffBookingController::class, 'index'])->name('staff.bookings');
        Route::get('/staff/users', [StaffUserController::class, 'index'])->name('staff.users');
        Route::get('/staff/vehicles', [StaffVehicleController::class, 'index'])->name('staff.vehicles');
        Route::get('/staff/fleet', [StaffFleetController::class, 'index'])->name('staff.fleet');
        Route::get('/staff/reports', [StaffReportController::class, 'index'])->name('staff.reports');
    });
});

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';
