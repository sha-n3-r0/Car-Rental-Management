<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the customer registration view.
     */
    public function createCustomer(): Response
    {
        return Inertia::render('Auth/CustomerRegister');
    }

    /**
     * Display the owner registration view.
     */
    public function createOwner(): Response
    {
        return Inertia::render('Auth/OwnerRegister');
    }

    /**
     * Display the staff registration view.
     */
    public function createStaff(): Response
    {
        return Inertia::render('Auth/StaffRegister');
    }

    /**
     * Handle customer registration.
     */
    public function storeCustomer(Request $request): RedirectResponse
    {
        $request->validate($this->validationRules());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'customer',
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('verification.notice');
    }

    /**
     * Handle owner registration.
     */
    public function storeOwner(Request $request): RedirectResponse
    {
        $request->validate($this->validationRules());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'owner',
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('verification.notice');
    }

    /**
     * Handle staff registration.
     */
    public function storeStaff(Request $request): RedirectResponse
    {
        $request->validate($this->validationRules());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'staff',
        ]);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('verification.notice.register');
    }

    /**
     * Common validation rules for all roles.
     */
    protected function validationRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }
}
