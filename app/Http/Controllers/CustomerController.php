<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use App\Models\UserLicense;
use App\Notifications\LicenseVerificationRequested;
use App\Notifications\EmailChangeRequest;
use App\Notifications\PasswordChangedNotification;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Booking;
use App\Models\Reservation;

class CustomerController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();

        // Get all reservations for this user with vehicle eager loaded
        $reservations = Reservation::where('user_id', $user->id)
            ->with('vehicle') // eager load vehicle relation
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'message' => 'Your Reservations',
            'auth' => ['user' => $user],
            'reservations' => $reservations,
        ]);
    }

    public function edit()
    {
        $user = Auth::user();

        return Inertia::render('Customer/CustomerProfile', [
            'customer' => $user,
            'profile_picture_url' => $user->profile_picture
                ? asset('storage/profile_pictures/' . $user->profile_picture)
                : null,
            // Use password_set AND check password is not empty
            'has_password' => $user->password_set && !empty($user->password),
            'license' => $user->license,
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        // Basic profile validation
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'basic_address' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',

            // Require current_password only if password_set is true and password is non-empty
            'current_password' => ($user->password_set && !empty($user->password)) ? 'required_with:new_password|string' : 'nullable',

            'new_password' => 'nullable|string|min:8|confirmed',
        ]);

        // License-specific validation
        $request->validate([
            'license_number' => 'required|string',
            'license_type' => 'required|string',
            'license_class' => 'required|string',
            'issued_date' => 'required|date',
            'expiry_date' => 'required|date|after_or_equal:issued_date',
            'name_on_license' => 'required|string',
            'birth_date' => 'required|date',
            'license_address' => 'nullable|string',
            'license_image' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'license_image_back' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Password change handling
        if ($request->filled('new_password')) {
            if ($user->password_set && !Hash::check($request->current_password, $user->password)) {
                return back()->withErrors(['current_password' => 'Current password is incorrect']);
            }

            $user->password = Hash::make($request->new_password);
            $user->password_set = 1; // Mark password as set now
            $user->notify(new PasswordChangedNotification());
            Auth::logout();
        }

        // Handle basic profile fields
        $oldEmail = $user->email;
        $emailChanged = $request->email !== $oldEmail;

        $user->name = $request->name;
        $user->phone_number = $request->phone_number;
        $user->date_of_birth = $request->date_of_birth;
        $user->address = $request->basic_address;

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $user->profile_picture = basename($path);
        }

        if ($emailChanged) {
            $user->new_email = $request->email;
            $user->save();

            Notification::route('mail', $oldEmail)->notify(new EmailChangeRequest($user, $request->email));
            $user->sendEmailVerificationNotificationToNewEmail();
        } else {
            $user->save();
        }

        // Handle license data
        $licenseData = $request->only([
            'license_number', 'license_type', 'license_class',
            'issued_date', 'expiry_date', 'name_on_license',
            'birth_date'
        ]);

        $licenseData['address'] = $request->license_address;

        $licenseUpdatedToPending = false;

        if ($request->hasFile('license_image')) {
            $licenseData['license_image'] = $request->file('license_image')->store('licenses', 'public');
            $licenseData['status'] = 'pending';
            $licenseUpdatedToPending = true;
        }

        if ($request->hasFile('license_image_back')) {
            $licenseData['license_image_back'] = $request->file('license_image_back')->store('licenses', 'public');
            $licenseData['status'] = 'pending';
            $licenseUpdatedToPending = true;
        }

        $user->license()->updateOrCreate(['user_id' => $user->id], $licenseData);

        // Notify owners if license status is pending
        if ($licenseUpdatedToPending) {
            $owners = User::where('role', 'owner')->get();
            foreach ($owners as $owner) {
                $owner->notify(new LicenseVerificationRequested($user));
            }
        }

        return back()->with('message', 'Profile updated successfully. Please verify your new email to complete the change.');
    }
}
