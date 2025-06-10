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
use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\OwnerController;

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
    });

    Route::middleware(['auth', 'role:staff'])->group(function () {
        Route::get('/staff/profile', [StaffController::class, 'edit'])->name('staff.profile');
        Route::post('/staff/profile/update', [StaffController::class, 'update'])->name('staff.profile.update');
    });
});


/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';
