<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            // Optionally show a custom Inertia page here
            return Inertia::render('Auth/AlreadyVerified'); // or any fallback
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect($this->redirectBasedOnRole($user));
    }

    protected function redirectBasedOnRole($user)
    {
        return match ($user->role) {
            'customer' => route('customer.dashboard'),
            'owner'    => route('owner.dashboard'),
            'staff'    => route('staff.dashboard'),
            default    => '/', // fallback
        };
    }
}
