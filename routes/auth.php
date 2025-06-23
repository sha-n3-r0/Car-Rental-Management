<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Auth\{
    AuthenticatedSessionController,
    ConfirmablePasswordController,
    EmailVerificationNotificationController,
    EmailVerificationPromptController,
    NewPasswordController,
    PasswordController,
    PasswordResetLinkController,
    RegisteredUserController,
    VerifyEmailController,
    EmailChangeVerificationController
};

/*
|--------------------------------------------------------------------------
| Guest Routes (Unauthenticated Users)
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {

    // Register route with role-based redirect if logged in
    Route::get('register', function () {
        if (Auth::check()) {
            return match (Auth::user()->role ?? null) {
                'customer' => redirect()->route('customer.dashboard'),
                'owner'    => redirect()->route('owner.dashboard'),
                'staff'    => redirect()->route('staff.dashboard'),
                default    => redirect()->route('dashboard'),
            };
        }
        return view('customer.register');
    })->name('register');

    // Login route with role-based redirect if logged in
    Route::get('login', function () {
        if (Auth::check()) {
            return match (Auth::user()->role ?? null) {
                'customer' => redirect()->route('customer.dashboard'),
                'owner'    => redirect()->route('owner.dashboard'),
                'staff'    => redirect()->route('staff.dashboard'),
                default    => redirect()->route('dashboard'),
            };
        }
        return redirect()->route('customer.login');
    })->name('login');

    // Password reset links
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    // Password reset form and submission
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Logged-in Users)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {

    // Email verification prompt & handling
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Password confirmation routes
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Password update
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    // Logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Broadcasting auth routes
    Broadcast::routes();

    Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
        return (int) $user->id === (int) $id;
    });
});

/*
|--------------------------------------------------------------------------
| Registration Routes (By Role)
|--------------------------------------------------------------------------
*/
Route::middleware('redirect.authenticated')->group(function () {
    Route::get('/customer/register', [RegisteredUserController::class, 'createCustomer'])->name('customer.register');
    Route::post('/register/customer', [RegisteredUserController::class, 'storeCustomer'])->name('register.customer');

    Route::get('/owner/register', [RegisteredUserController::class, 'createOwner'])->name('owner.register');
    Route::post('/register/owner', [RegisteredUserController::class, 'storeOwner'])->name('register.owner');

    Route::get('/staff/register', [RegisteredUserController::class, 'createStaff'])->name('staff.register');
    Route::post('/register/staff', [RegisteredUserController::class, 'storeStaff'])->name('register.staff');
});

/*
|--------------------------------------------------------------------------
| Login Routes (By Role)
|--------------------------------------------------------------------------
*/
Route::middleware('redirect.authenticated')->group(function () {
    Route::get('/customer/login', fn () => Inertia::render('Auth/CustomerLogin'))->name('customer.login');
    Route::post('/login/customer', [AuthenticatedSessionController::class, 'store'])->name('login.customer');

    Route::get('/owner/login', fn () => Inertia::render('Auth/OwnerLogin'))->name('owner.login');
    Route::post('/login/owner', [AuthenticatedSessionController::class, 'store'])->name('login.owner');

    Route::get('/staff/login', fn () => Inertia::render('Auth/StaffLogin'))->name('staff.login');
    Route::post('/login/staff', [AuthenticatedSessionController::class, 'store'])->name('login.staff');
});

/*
|--------------------------------------------------------------------------
| Email Verification After Registration/Login
|--------------------------------------------------------------------------
*/

// Show email verification status
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail', [
        'status'     => session('status'),
        'isVerified' => auth()->user()->hasVerifiedEmail(),
    ]);
})->middleware('auth')->name('verification.notice');

// Redirect notice after login if email is verified or not
Route::get('/email/verify/notice', function () {
    $user = auth()->user();

    if ($user->hasVerifiedEmail()) {
        return match ($user->role) {
            'customer' => redirect()->route('customer.dashboard'),
            'owner'    => redirect()->route('owner.dashboard'),
            'staff'    => redirect()->route('staff.dashboard'),
            default    => redirect('/dashboard'),
        };
    }

    return Inertia::render('Auth/VerifyEmailNotice', [
        'email'  => $user->email,
        'status' => session('status'),
    ]);
})->middleware('auth')->name('verification.notice.login');

// Email verification link handling
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return match ($request->user()->role) {
        'customer' => redirect()->route('customer.dashboard'),
        'owner'    => redirect()->route('owner.dashboard'),
        'staff'    => redirect()->route('staff.dashboard'),
        default    => redirect('/dashboard'),
    };
})->middleware(['auth', 'signed'])->name('verification.verify');

// Resend verification email
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Email change verification link
Route::get('/email/change/verify', [EmailChangeVerificationController::class, 'verify'])
    ->middleware('signed')
    ->name('email.change.verify');

/*
|--------------------------------------------------------------------------
| Cancel Email Verification
|--------------------------------------------------------------------------
*/

// Cancel during registration
Route::post('/cancel-verification', function (Request $request) {
    Auth::logout();
    Session::invalidate();
    Session::regenerateToken();

    return match ($request->user()->role ?? null) {
        'customer' => redirect()->route('customer.register'),
        'owner'    => redirect()->route('owner.register'),
        'staff'    => redirect()->route('staff.register'),
        default    => redirect()->route('home'),
    };
})->middleware('auth')->name('verification.notice.register');

// Cancel during login
Route::post('/cancel-verification-login', function (Request $request) {
    Auth::logout();
    Session::invalidate();
    Session::regenerateToken();

    return match ($request->user()->role ?? null) {
        'customer' => redirect()->route('customer.login'),
        'owner'    => redirect()->route('owner.login'),
        'staff'    => redirect()->route('staff.login'),
        default    => redirect()->route('home'),
    };
})->middleware('auth')->name('verification.cancel.login');
