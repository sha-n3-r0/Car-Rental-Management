<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfUnauthorized
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
        // If user is not authenticated, check which page they're trying to access
        if (!Auth::check()) {
            // Redirect based on the URL path
            if ($request->is('staff/*')) {
                return redirect()->route('staff.login'); // Redirect to staff login
            }

            if ($request->is('owner/*')) {
                return redirect()->route('owner.login'); // Redirect to owner login
            }

            if ($request->is('customer/*')) {
                return redirect()->route('customer.login'); // Redirect to customer login
            }

            // Default fallback to general login
            return redirect()->route('login');
        }

        return $next($request);
    }
}
