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
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return $request->user()->hasVerifiedEmail()
            ? match ($request->user()->role) {
                'customer' => redirect()->route('customer.dashboard'),
                'owner'    => redirect()->route('owner.dashboard'),
                'staff'    => redirect()->route('staff.dashboard'),
                default    => redirect('/dashboard'),
            }
            : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
