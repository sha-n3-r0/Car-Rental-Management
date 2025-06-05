<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function logout()
    {
        // Logout the user
        Auth::logout();

        // Redirect to the login page after logout
        return redirect('/login');
    }
}

