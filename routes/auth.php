<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\EmailChangeVerificationController;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Guest Routes (Unauthenticated Users)
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {

    // General register route with role-based redirection if already logged in
    Route::get('register', function () {
        if (Auth::check()) {
            $role = Auth::user()->role ?? null;

            return match ($role) {
                'customer' => redirect()->route('customer.dashboard'),
                'owner'    => redirect()->route('owner.dashboard'),
                'staff'    => redirect()->route('staff.dashboard'),
                default    => redirect()->route('dashboard'),
            };
        }
        return view('customer.register');
    })->name('register');

    // General login route with role-based redirection if already logged in
    Route::get('login', function () {
        if (Auth::check()) {
            $role = Auth::user()->role ?? null;

            return match ($role) {
                'customer' => redirect()->route('customer.dashboard'),
                'owner'    => redirect()->route('owner.dashboard'),
                'staff'    => redirect()->route('staff.dashboard'),
                default    => redirect()->route('dashboard'),
            };
        }
        return redirect()->route('customer.login');
    })->name('login');

    // Forgot password routes
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])->name('password.email');

    // Password reset routes
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])->name('password.store');
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes (Logged-in Users)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    // Email verification prompt
    Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');

    // Handle verification via email link
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    // Resend verification email
    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Password confirmation
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Update password
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    // Logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // ✅ Register the broadcasting auth route for private channels
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
Route::middleware(['redirect.authenticated'])->group(function () {
    // Customer registration
    Route::get('/customer/register', [RegisteredUserController::class, 'createCustomer'])->name('customer.register');
    Route::post('/register/customer', [RegisteredUserController::class, 'storeCustomer'])->name('register.customer');

    // Owner registration
    Route::get('/owner/register', [RegisteredUserController::class, 'createOwner'])->name('owner.register');
    Route::post('/register/owner', [RegisteredUserController::class, 'storeOwner'])->name('register.owner');

    // Staff registration
    Route::get('/staff/register', [RegisteredUserController::class, 'createStaff'])->name('staff.register');
    Route::post('/register/staff', [RegisteredUserController::class, 'storeStaff'])->name('register.staff');
});

/*
|--------------------------------------------------------------------------
| Login Routes (By Role)
|--------------------------------------------------------------------------
*/
Route::middleware(['redirect.authenticated'])->group(function () {
    // Customer login
    Route::get('/customer/login', fn () => Inertia::render('Auth/CustomerLogin'))->name('customer.login');
    Route::post('/login/customer', [AuthenticatedSessionController::class, 'store'])->name('login.customer');

    // Owner login
    Route::get('/owner/login', fn () => Inertia::render('Auth/OwnerLogin'))->name('owner.login');
    Route::post('/login/owner', [AuthenticatedSessionController::class, 'store'])->name('login.owner');

    // Staff login
    Route::get('/staff/login', fn () => Inertia::render('Auth/StaffLogin'))->name('staff.login');
    Route::post('/login/staff', [AuthenticatedSessionController::class, 'store'])->name('login.staff');
});

/*
|--------------------------------------------------------------------------
| Email Verification (After Registration/Login)
|--------------------------------------------------------------------------
*/

// Email verification view (shows whether email is verified or not)
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail', [
        'status' => session('status'),
        'isVerified' => auth()->user()->hasVerifiedEmail(),
    ]);
})->middleware('auth')->name('verification.notice');

// Verification redirect notice after login
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
        'email' => $user->email,
        'status' => session('status'),
    ]);
})->middleware('auth')->name('verification.notice.login');

// Verify email via link
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    $user = $request->user();

    return match ($user->role) {
        'customer' => redirect()->route('customer.dashboard'),
        'owner'    => redirect()->route('owner.dashboard'),
        'staff'    => redirect()->route('staff.dashboard'),
        default    => redirect('/dashboard'),
    };
})->middleware(['auth', 'signed'])->name('verification.verify');

// Resend verification notification
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::get('/email/change/verify', [EmailChangeVerificationController::class, 'verify'])
    ->name('email.change.verify')
    ->middleware('signed');
/*
|--------------------------------------------------------------------------
| Cancel Email Verification
|--------------------------------------------------------------------------
*/

// Cancel during registration
Route::post('/cancel-verification', function (Request $request) {
    $user = $request->user();

    Auth::logout();
    Session::invalidate();
    Session::regenerateToken();

    return match ($user->role) {
        'customer' => redirect()->route('customer.register'),
        'owner'    => redirect()->route('owner.register'),
        'staff'    => redirect()->route('staff.register'),
        default    => redirect()->route('home'),
    };
})->middleware('auth')->name('verification.notice.register');

// Cancel during login
Route::post('/cancel-verification-login', function (Request $request) {
    $user = $request->user();

    Auth::logout();
    Session::invalidate();
    Session::regenerateToken();

    return match ($user->role) {
        'customer' => redirect()->route('customer.login'),
        'owner'    => redirect()->route('owner.login'),
        'staff'    => redirect()->route('staff.login'),
        default    => redirect()->route('/'),
    };
})->middleware('auth')->name('verification.cancel.login');
