<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;

class EmailChangeVerificationController extends Controller
{
    public function verify(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(401, 'The verification link is invalid or expired.');
        }

        $request->validate([
            'user' => 'required|exists:users,id',
            'new_email' => 'required|email',
        ]);

        $user = User::findOrFail($request->user);

        if ($user->new_email !== $request->new_email) {
            abort(400, 'The email confirmation does not match the pending change.');
        }

        $user->email = $user->new_email;
        $user->new_email = null;
        $user->email_verified_at = now(); // Optional: mark new email as verified
        $user->save();

        // ✅ Redirect based on user role
        return redirect(match ($user->role) {
            'owner' => '/owner/profile',
            'staff' => '/staff/profile',
            'customer' => '/customer/profile',
            default => '/dashboard',
        })->with('success', 'Your email has been changed successfully.');
    }
}
