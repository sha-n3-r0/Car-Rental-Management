<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request; 

class GoogleController extends Controller
{
    public function redirectToGoogle(Request $request)
    {
        // Get role from query, default to customer
        $role = $request->query('role', 'customer');

        // Store role in session to retrieve after callback
        session(['oauth_role' => $role]);

        return Socialite::driver('google')->redirect();
    }
    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Retrieve role from session, default to 'customer'
        $role = session('oauth_role', 'customer');

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password' => bcrypt(str()->random(24)),
                'role' => $role,
            ]
        );

        Auth::login($user);

        // Clear the session role so it doesn't persist unexpectedly
        session()->forget('oauth_role');

        $isNewUser = $user->wasRecentlyCreated;

        if (!$user->hasVerifiedEmail()) {
            return redirect()->route($isNewUser ? 'verification.notice' : 'verification.notice.afterlogin');
        }

        return redirect()->intended(match ($user->role) {
            'customer' => route('customer.dashboard'),
            'owner'    => route('owner.dashboard'),
            'staff'    => route('staff.dashboard'),
            default    => '/dashboard',
        });
    }
}
