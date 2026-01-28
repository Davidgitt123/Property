<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        $stats = [
            'total_properties' => Property::count(),
            'for_sale' => Property::forSale()->count(),
            'for_rent' => Property::forRent()->count(),
            'total_users' => User::count(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
        ]);
    }
}