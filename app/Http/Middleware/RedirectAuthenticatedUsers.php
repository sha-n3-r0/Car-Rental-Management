<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectAuthenticatedUsers
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Only redirect if user is verified
            if ($user->hasVerifiedEmail()) {
                switch ($user->role) {
                    case 'customer':
                        return redirect()->route('customer.dashboard');
                    case 'owner':
                        return redirect()->route('owner.dashboard');
                    case 'staff':
                        return redirect()->route('staff.dashboard');
                    default:
                        return redirect()->route('home');
                }
            }

            // If user is logged in but not verified, let them proceed
        }

        return $next($request);
    }
}
