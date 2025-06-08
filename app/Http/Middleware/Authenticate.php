<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;

class Authenticate extends Middleware
{
    public function handle($request, Closure $next, ...$guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::shouldUse($guard);
                return $next($request);
            }
        }

        if (! $request->expectsJson()) {
            switch ($guards[0]) {
                case 'customer':
                    return redirect()->guest(route('customer.login'));
                case 'owner':
                    return redirect()->guest(route('owner.login'));
                case 'staff':
                    return redirect()->guest(route('staff.login'));
                default:
                    return redirect()->guest(route('login'));
            }
        }
        return $next($request);
    }
    // You can leave redirectTo() empty or remove it entirely if you handle redirects in handle()
}
