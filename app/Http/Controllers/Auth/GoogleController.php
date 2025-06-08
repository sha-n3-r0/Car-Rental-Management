<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                'password' => bcrypt(str()->random(24)),
            ]
        );

        $isNewUser = $user->wasRecentlyCreated;

        Auth::login($user);

        if (!$user->hasVerifiedEmail()) {
            // 👇 Go to the correct verification view based on context
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
