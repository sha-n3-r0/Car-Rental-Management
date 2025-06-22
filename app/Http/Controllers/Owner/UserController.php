<?php

namespace App\Http\Controllers\Owner;

use App\Notifications\LicenseApproved;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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

        $user->update($request->only([
            'name', 'email', 'phone_number', 'address', 'date_of_birth', 'role'
        ]));

        if ($user->license) {
            $wasPreviouslyPending = $user->license->status === 'pending';
            $user->license->status = $request->license_status;
            $user->license->save();

            if ($request->license_status === 'approved' && $wasPreviouslyPending) {
                $owner = auth()->user();
                $user->notify(new LicenseApproved($user, $owner)); // ✅ FIXED
            }
        }

        return redirect()->back()->with('success', 'User and license updated successfully.');
    }

    /**
     * Show the form for creating a new user.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Owner/AddUser'); // Return the AddUser page (Create User Form)
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate incoming data
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:customer,owner,staff'] // Ensure the role is valid
        ]);

        // Create the new user with the given role
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Optional: you can trigger an event like registration if needed
        // event(new Registered($user)); 

        return response()->json(['message' => 'User created successfully'], 201);
    }

    /**
     * Destroy the specified user.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete(); // Delete the user from the database
        return response()->json(['message' => 'User deleted successfully.']);
    }
}
