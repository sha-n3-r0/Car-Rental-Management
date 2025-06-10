<?php

// app/Http/Controllers/OwnerController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'profile_picture' => 'nullable|image|mimes:jpeg,jpg|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('profile_pictures', $imageName, 'public');
            $owner->profile_picture = $imageName;
        }

        $owner->update($request->only(['name', 'email', 'phone_number', 'date_of_birth', 'address']));

        return redirect()->back()->with('success', 'Profile updated!');
    }
}

