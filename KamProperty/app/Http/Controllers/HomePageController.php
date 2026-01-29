<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        return Inertia::render('HomePage', [
            // You can add any data you want to pass to the homepage here
        ]);
    }
}