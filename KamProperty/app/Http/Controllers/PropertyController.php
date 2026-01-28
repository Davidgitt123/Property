<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display a listing of properties.
     */
    public function index(Request $request)
    {
        $query = Property::query()->with('user:id,name,email');

        // Apply filters
        if ($request->has('type') && $request->type !== 'all') {
            $query->byType($request->type);
        }

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->has('location') && $request->location) {
            $query->byLocation($request->location);
        }

        if ($request->has('min_price') && $request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price') && $request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // Order by latest
        $query->latest();

        // Get properties
        $properties = $query->paginate(12)->withQueryString();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['type', 'status', 'location', 'min_price', 'max_price']),
            'stats' => [
                'total' => Property::count(),
                'for_sale' => Property::forSale()->count(),
                'for_rent' => Property::forRent()->count(),
            ],
        ]);
    }

    /**
     * Show the form for creating a new property.
     */
    public function create()
    {
        $this->authorize('create', Property::class);

        return Inertia::render('Properties/Create', [
            'property_types' => ['House', 'Apartment', 'Land', 'Office'],
            'status_types' => ['For Rent', 'For Sale'],
        ]);
    }

    /**
     * Store a newly created property.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Property::class);

        $validated = $request->validate(Property::rules());

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('properties', 'public');
        }

        // Add user_id
        $validated['user_id'] = Auth::id();

        Property::create($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property created successfully.');
    }

    /**
     * Display the specified property.
     */
    public function show(Property $property)
    {
        $property->load('user:id,name,email,phone');

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'relatedProperties' => Property::where('type', $property->type)
                ->where('id', '!=', $property->id)
                ->limit(4)
                ->get(),
        ]);
    }

    /**
     * Show the form for editing the specified property.
     */
    public function edit(Property $property)
    {
        $this->authorize('update', $property);

        return Inertia::render('Properties/Edit', [
            'property' => $property,
            'property_types' => ['House', 'Apartment', 'Land', 'Office'],
            'status_types' => ['For Rent', 'For Sale'],
        ]);
    }

    /**
     * Update the specified property.
     */
    public function update(Request $request, Property $property)
    {
        $this->authorize('update', $property);

        $validated = $request->validate(Property::rules($property->id));

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($property->image) {
                Storage::disk('public')->delete($property->image);
            }
            $validated['image'] = $request->file('image')->store('properties', 'public');
        }

        $property->update($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property updated successfully.');
    }

    /**
     * Remove the specified property.
     */
    public function destroy(Property $property)
    {
        $this->authorize('delete', $property);

        // Delete image if exists
        if ($property->image) {
            Storage::disk('public')->delete($property->image);
        }

        $property->delete();

        return redirect()->route('properties.index')
            ->with('success', 'Property deleted successfully.');
    }
}