<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();

        if (!$user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice.login')->with('status', 'unverified');
        }

        // Role check
        $routeName = \Route::currentRouteName();
        $expectedRole = match ($routeName) {
            'login.customer' => 'customer',
            'login.owner' => 'owner',
            'login.staff' => 'staff',
            default => null,
        };

        if ($expectedRole && $user->role !== $expectedRole) {
            Auth::logout();
            return back()->withErrors(['email' => 'Unauthorized login for this page!']);
        }

        return redirect($this->redirectToBasedOnRole($user));
    }

    /**
     * Redirect users to their appropriate dashboard based on role.
     */
    protected function redirectToBasedOnRole($user)
    {
        return match ($user->role) {
            'owner' => '/owner/dashboard',
            'staff' => '/staff/dashboard',
            'customer' => '/customer/dashboard',
            default => '/',
        };
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
        
        // Log the user out
        Auth::logout();

        // Invalidate the session
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect based on role
        return match ($user->role) {
                'customer' => redirect()->route('customer.login'),  // Redirect customer to login
                'owner' => redirect()->route('owner.login'),        // Redirect owner to login
                'staff' => redirect()->route('staff.login'),        // Redirect staff to login
            default => redirect()->route('customer.login'),         // Default to general login
        };
    }
}
