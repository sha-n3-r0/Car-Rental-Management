<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use App\Notifications\EmailChangeRequest;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function edit()
    {
        $user = Auth::user();

        $profilePictureUrl = $user->profile_picture
            ? Storage::url('profile_pictures/' . $user->profile_picture)
            : null;

        return Inertia::render('Staff/StaffProfile', [
            'staff' => $user->only(['id', 'name', 'email', 'phone_number', 'date_of_birth', 'address']),
            'profile_picture_url' => $profilePictureUrl,
            'has_password' => $user->password_set ?? false,
        ]);
    }

    public function update(Request $request)
    {
        $staff = auth()->user();

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $staff->id,
            'phone_number' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'current_password' => $staff->password_set ? 'required_with:new_password|string' : 'nullable',
            'new_password' => 'nullable|string|min:8|confirmed',
        ]);

        // Handle password update
        if ($request->filled('new_password')) {
            if ($staff->password_set) {
                if (!Hash::check($request->current_password, $staff->password)) {
                    return back()->withErrors(['current_password' => 'Current password is incorrect']);
                }
            }
            $staff->password = Hash::make($request->new_password);
            $staff->password_set = true;
        }

        $oldEmail = $staff->email;
        $emailChanged = $request->email !== $oldEmail;

        // Update personal information
        $staff->name = $request->name;
        $staff->phone_number = $request->phone_number;
        $staff->date_of_birth = $request->date_of_birth;
        $staff->address = $request->address;

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $staff->profile_picture = basename($path);
        }

        // Handle email change logic
        if ($emailChanged) {
            $staff->new_email = $request->email;
            $staff->save();

            Notification::route('mail', $oldEmail)->notify(new EmailChangeRequest($staff, $request->email));

            // Assuming you implement this method
            $staff->sendEmailVerificationNotificationToNewEmail();
        } else {
            $staff->save();
        }

        return redirect()->back()->with('success', 'Profile updated successfully. Please verify your new email to complete the change.');
    }
}
