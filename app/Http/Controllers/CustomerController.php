<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'customer' => $user,
            'profile_picture_url' => $profilePictureUrl,
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
            'profile_picture' => 'nullable|image|mimes:jpeg,jpg|max:2048',
        ]);
        
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageName = time() . '_' . $image->getClientOriginalName();

            // Store the image in storage/app/public/profile_pictures
            $image->storeAs('profile_pictures', $imageName, 'public');

            // Save just the filename
            $customer->profile_picture = $imageName;
        }

        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->phone_number = $request->phone_number;
        $customer->date_of_birth = $request->date_of_birth;
        $customer->address = $request->address;

        $customer->save();

        return redirect()->back()->with('success', 'Profile updated!');
    }
}
