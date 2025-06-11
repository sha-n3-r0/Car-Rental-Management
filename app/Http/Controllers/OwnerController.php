<?php

// app/Http/Controllers/OwnerController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;
use App\Notifications\EmailChangeRequest;
use Inertia\Inertia;

class OwnerController extends Controller
{
    public function edit()
    {
        $user = Auth::user();

        $profilePictureUrl = $user->profile_picture
            ? Storage::url('profile_pictures/' . $user->profile_picture)
            : null;

        return Inertia::render('Owner/OwnerProfile', [
            'owner' => $user,
            'profile_picture_url' => $profilePictureUrl,
        ]);
    }

    public function update(Request $request)
    {
        $owner = auth()->user();

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $owner->id,
            'phone_number' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
            'current_password' => $owner->password_set ? 'required_with:new_password|string' : 'nullable',
            'new_password' => 'nullable|string|min:8|confirmed',
        ]);

        if ($request->filled('new_password')) {
            if ($owner->password_set) {
                if (!Hash::check($request->current_password, $owner->password)) {
                    return back()->withErrors(['current_password' => 'Current password is incorrect']);
                }
            }
            $owner->password = Hash::make($request->new_password);
            $owner->password_set = true;
        }

        $oldEmail = $owner->email;
        $emailChanged = $request->email !== $oldEmail;

        $owner->name = $request->name;
        $owner->phone_number = $request->phone_number;
        $owner->date_of_birth = $request->date_of_birth;
        $owner->address = $request->address;

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $owner->profile_picture = basename($path);
        }

        if ($emailChanged) {
            $owner->new_email = $request->email;
            $owner->save();

            Notification::route('mail', $oldEmail)->notify(new EmailChangeRequest($owner, $request->email));

            // You need to implement this method in your User model
            $owner->sendEmailVerificationNotificationToNewEmail();
        } else {
            $owner->save();
        }

        return redirect()->back()->with('success', 'Profile updated successfully. Please verify your new email to complete the change.');
    }
}

