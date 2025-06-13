<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('license')->get();

        return inertia('Owner/Users', [
            'users' => $users,
        ]);
    }
    public function view(User $user)
    {
        // Load user and any related license info needed
        $user->load('license');
        return inertia('Owner/ViewUserProfile', ['user' => $user]);
    }

    public function show(User $user)
    {
        $user->load('license');

        return inertia('Owner/ViewUser', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $userId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'role' => 'required|string|in:customer,staff,admin',
            'license_status' => 'nullable|string|in:pending,approved,rejected',
        ]);

        $user = User::findOrFail($userId);

        $user->update($request->only(['name', 'email', 'phone_number', 'address', 'date_of_birth', 'role']));

        if ($user->license) {
            $user->license->status = $request->license_status;
            $user->license->save();
        }

        return redirect()->back()->with('success', 'User and license updated successfully.');
    }
}

