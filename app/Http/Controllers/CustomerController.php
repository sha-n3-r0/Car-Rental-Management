<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function edit()
    {
        $user = Auth::user();

        $profilePictureUrl = $user->profile_picture
            ? Storage::url('profile_pictures/' . $user->profile_picture)
            : null;

        return Inertia::render('Customer/CustomerProfile', [
            'customer' => $user->only(['id', 'name', 'email', 'phone_number', 'date_of_birth', 'address']),
            'profile_picture_url' => $profilePictureUrl,
            'has_password' => $user->password_set ?? false,
        ]);
    }

    public function update(Request $request)
    {
        $customer = auth()->user();

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $customer->id,
            'phone_number' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'current_password' => $customer->password_set ? 'required_with:new_password|string' : 'nullable',
            'new_password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($request->filled('new_password')) {
            if ($customer->password_set) {
                if (!Hash::check($request->current_password, $customer->password)) {
                    return back()->withErrors(['current_password' => 'Current password is incorrect']);
                }
            }
            $customer->password = Hash::make($request->new_password);
            $customer->password_set = true;
        }

        // Other fields update
        $customer->name = $request->name;
        if ($request->email !== $customer->email) {
            $customer->email = $request->email;
            $customer->email_verified_at = null; // Invalidate previous verification
            $customer->save();

            // Send a new verification email
            $customer->sendEmailVerificationNotification();
        }
        $customer->phone_number = $request->phone_number;
        $customer->date_of_birth = $request->date_of_birth;
        $customer->address = $request->address;

        $customer->save();

        return redirect()->back()->with('success', 'Profile updated successfully');
    }
}
