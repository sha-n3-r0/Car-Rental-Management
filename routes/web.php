<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;
use Inertia\Inertia;

// Home (Public)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

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
| Registration Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['redirect.authenticated'])->group(function () {
    Route::get('/customer/register', [RegisteredUserController::class, 'createCustomer'])->name('customer.register');
    Route::post('/register/customer', [RegisteredUserController::class, 'storeCustomer'])->name('register.customer');

    Route::get('/owner/register', [RegisteredUserController::class, 'createOwner'])->name('owner.register');
    Route::post('/register/owner', [RegisteredUserController::class, 'storeOwner'])->name('register.owner');

    Route::get('/staff/register', [RegisteredUserController::class, 'createStaff'])->name('staff.register');
    Route::post('/register/staff', [RegisteredUserController::class, 'storeStaff'])->name('register.staff');
});

/*
|--------------------------------------------------------------------------
| Login Routes with Redirect Middleware
|--------------------------------------------------------------------------
*/
Route::middleware(['redirect.authenticated'])->group(function () {
    Route::get('/customer/login', fn () => Inertia::render('Auth/CustomerLogin'))->name('customer.login');
    Route::post('/login/customer', [AuthenticatedSessionController::class, 'store'])->name('login.customer');

    Route::get('/owner/login', fn () => Inertia::render('Auth/OwnerLogin'))->name('owner.login');
    Route::post('/login/owneraaaaa', [AuthenticatedSessionController::class, 'store'])->name('login.owner');

    Route::get('/staff/login', fn () => Inertia::render('Auth/StaffLogin'))->name('staff.login');
    Route::post('/login/staff', [AuthenticatedSessionController::class, 'store'])->name('login.staff');
});

/*
|--------------------------------------------------------------------------
| Email Verification Routes
|--------------------------------------------------------------------------
*/

// Show "Verify Email" Page
// Route::get('/email/verify', function () {
//     return Inertia::render('Auth/VerifyEmail');
// })->middleware('auth')->name('verification.notice');

// For post-registration
Route::get('/email/verify', function () {
    // DON'T redirect if user is verified
    // Just always return the VerifyEmail view
    return Inertia::render('Auth/VerifyEmail', [
        'status' => session('status'),
        'isVerified' => auth()->user()->hasVerifiedEmail(),
    ]);
})->middleware('auth')->name('verification.notice');

// For after-login, still unverified
Route::get('/email/verify/notice', function () {
    return Inertia::render('Auth/VerifyEmailNotice', [
        'email' => auth()->user()->email,
        'status' => session('status'),
    ]);
})->middleware('auth')->name('verification.notice.afterlogin');

// Handle Email Verification Link
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    $user = $request->user();

    switch ($user->role) {
        case 'customer':
            return redirect()->route('customer.dashboard');
        case 'owner':
            return redirect()->route('owner.dashboard');
        case 'staff':
            return redirect()->route('staff.dashboard');
        default:
            return redirect('/dashboard'); // fallback
    }
})->middleware(['auth', 'signed'])->name('verification.verify');

// Resend verification email
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

/*
|--------------------------------------------------------------------------
| Protected Routes (Auth + Verified)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    // Email verification code submission route
    Route::post('/verify-email', [VerificationController::class, 'verify'])->name('verify.email');

    // General dashboard
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');

    // Role-based dashboards
    Route::middleware('role:owner')->get('/owner/dashboard', fn () => Inertia::render('Owner/Dashboard'))->name('owner.dashboard');
    Route::middleware('role:staff')->get('/staff/dashboard', fn () => Inertia::render('Staff/Dashboard'))->name('staff.dashboard');
    Route::middleware('role:customer')->get('/customer/dashboard', fn () => Inertia::render('Customer/Dashboard'))->name('customer.dashboard');
});

/*
|--------------------------------------------------------------------------
| Cancel Verification
|--------------------------------------------------------------------------
*/
Route::post('/cancel-verification', function (Request $request) {
    $user = $request->user();

    // Optionally delete user if not verified
    // if (! $user->hasVerifiedEmail()) {
    //     $user->delete();
    // }

    Auth::logout();

    Session::invalidate();
    Session::regenerateToken();

    return match ($user->role) {
        'customer' => redirect('/customer/register'),
        'owner'    => redirect('/owner/register'),
        'staff'    => redirect('/staff/register'),
        default    => redirect('/'),
    };
})->middleware('auth')->name('verification.cancel');

Route::post('/cancel-verification-login', function (Request $request) {
    $user = $request->user();

    Auth::logout();

    Session::invalidate();
    Session::regenerateToken();

    return match ($user->role) {
        'customer' => redirect('/customer/login'),
        'owner'    => redirect('/owner/login'),
        'staff'    => redirect('/staff/login'),
        default    => redirect('/login'),
    };
})->middleware('auth')->name('verification.cancel.login');

/*
|--------------------------------------------------------------------------
| Additional Role-Based Access with Custom Middleware
|--------------------------------------------------------------------------

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';
