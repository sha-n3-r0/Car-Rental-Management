<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectAuthenticatedUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            $user = Auth::user();

            // Redirect based on the role of the authenticated user
            if ($user->role === 'customer') {
                return redirect()->route('customer.dashboard');  // Redirect to customer dashboard
            }

            if ($user->role === 'owner') {
                return redirect()->route('owner.dashboard');  // Redirect to owner dashboard
            }

            if ($user->role === 'staff') {
                return redirect()->route('staff.dashboard');  // Redirect to staff dashboard
            }

            // Default redirection in case no role matches (fallback to a general dashboard or home)
            return redirect()->route('home');
        }

        return $next($request);
    }
}

