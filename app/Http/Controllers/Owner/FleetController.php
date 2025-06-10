<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FleetController extends Controller
{
    public function index()
    {
        // return a view or Inertia page
        return inertia('Owner/Fleet');
    }
}
