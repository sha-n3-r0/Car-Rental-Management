<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Str;
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

        // Try to find user by Google ID first
        $user = User::where('google_id', $googleUser->id)->first();

        if ($user) {
            // Update email if changed
            if ($user->email !== $googleUser->email) {
                $user->email = $googleUser->email;
                $user->save();
            }
        } else {
            // Try to find user by email
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                // Link Google ID to existing user
                $user->google_id = $googleUser->id;
                $user->save();
            } else {
                // Create a new user
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt(Str::random(24)),
                    'password_set' => false,
                    'role' => $role,
                    'provider' => 'google',
                ]);
            }
        }

        // Mark email as verified if not yet verified
        if (is_null($user->email_verified_at)) {
            $user->markEmailAsVerified();
        }

        Auth::login($user);

        session()->forget('oauth_role');

        $isNewUser = $user->wasRecentlyCreated;

        // Optional email check logic if needed
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
