<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Property;
use App\Models\User;

class HomePageController extends Controller
{
    public function index()
    {
        // Get featured properties (for sale, with wide images, limited to 6)
        $featuredProperties = Property::where('status', 'For Sale')
            ->where('image_ratio', '2:1')
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->get()
            ->map(function ($property) {
                return [
                    'id' => $property->id,
                    'title' => $property->title,
                    'price' => $property->price,
                    'formatted_price' => '$' . number_format($property->price, 0),
                    'location' => $property->location,
                    'size' => $property->size,
                    'formatted_size' => number_format($property->size) . ' sqm',
                    'type' => $property->type,
                    'status' => $property->status,
                    'image' => $property->image,
                    'image_url' => $property->image_url,
                ];
            });

        // Get property stats by type
        $stats = [
            'houses' => Property::where('type', 'House')->count(),
            'apartments' => Property::where('type', 'Apartment')->count(),
            'lands' => Property::where('type', 'Land')->count(),
            'offices' => Property::where('type', 'Office')->count(),
            'total' => Property::count(),
            'clients' => User::count(),
        ];

        return Inertia::render('HomePage', [
            'featuredProperties' => $featuredProperties,
            'stats' => $stats,
        ]);
    }
}