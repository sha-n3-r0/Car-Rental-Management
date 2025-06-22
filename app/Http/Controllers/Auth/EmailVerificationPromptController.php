<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */

    public function __invoke(Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return match ($request->user()->role) {
                'customer' => redirect()->route('customer.dashboard'),
                'owner'    => redirect()->route('owner.dashboard'),
                'staff'    => redirect()->route('staff.dashboard'),
                default    => redirect('/dashboard'),
            };
        }

        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'isVerified' => $request->user()->hasVerifiedEmail(), 
            'role' => $request->user()->role,                     
        ]);
    }
}
