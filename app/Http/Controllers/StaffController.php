<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
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
            'staff' => $user,
            'profile_picture_url' => $profilePictureUrl,
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
        ]);

        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('profile_pictures', $imageName, 'public');
            $staff->profile_picture = $imageName;
        }

        $staff->name = $request->name;
        $staff->email = $request->email;
        $staff->phone_number = $request->phone_number;
        $staff->date_of_birth = $request->date_of_birth;
        $staff->address = $request->address;

        $staff->save();

        return redirect()->back()->with('success', 'Staff profile updated!');
    }
}
