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

        $role = session('oauth_role', 'customer');

        // Find or create user by email
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(str()->random(24)),
                'password_set' => false,  // <-- Added here
                'role' => $role,
                'provider' => 'google',
            ]
        );

        // Update google_id if missing or changed
        if (!$user->google_id || $user->google_id !== $googleUser->getId()) {
            $user->google_id = $googleUser->getId();
            $user->save();
        }

        // Mark email as verified if coming from Google and not verified yet
        if (is_null($user->email_verified_at)) {
            $user->markEmailAsVerified();
        }

        Auth::login($user);

        session()->forget('oauth_role');

        $isNewUser = $user->wasRecentlyCreated;

        // No need to check verification anymore since marked verified, 
        // but if you want extra logic, keep this:
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
