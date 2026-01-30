<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display a listing of properties.
     */
    public function index(Request $request)
    {
        $query = Property::query()->with(['user:id,name,email', 'owner:id,name']);

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

        // Apply wide image filter if requested
        if ($request->has('wide_images') && $request->wide_images) {
            $query->where('image_ratio', '2:1');
        }

        // Order by latest
        $query->latest();

        // Get properties
        $properties = $query->paginate(12)->withQueryString();

        // Transform properties to include image URLs
        $properties->getCollection()->transform(function ($property) {
            $property->image_url = $property->image_url;
            $property->thumbnail_url = $property->thumbnail_url;
            $property->is_wide_image = $property->is_wide_image;
            $property->short_description = $property->short_description;
            $property->formatted_price = $property->formatted_price;
            $property->formatted_size = $property->formatted_size;
            return $property;
        });

        // Get owners for the modal form
        $owners = \App\Models\Owner::all();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['type', 'status', 'location', 'min_price', 'max_price', 'wide_images']),
            'stats' => [
                'total' => Property::count(),
                'for_sale' => Property::forSale()->count(),
                'for_rent' => Property::forRent()->count(),
                'wide_images' => Property::where('image_ratio', '2:1')->count(),
            ],
            'owners' => $owners,
        ]);
    }

    /**
     * Show the form for creating a new property.
     * NOTE: This method is no longer needed since we're using modals,
     * but keeping it for compatibility.
     */
    public function create()
    {
        $user = Auth::user();
        
        // Check if user is admin or agent using boolean attributes
        if (!$user->is_admin && !$user->is_agent) {
            abort(403, 'Unauthorized action.');
        }

        $owners = \App\Models\Owner::all();

        return Inertia::render('Properties/Create', [
            'property_types' => ['House', 'Apartment', 'Land', 'Office'],
            'status_types' => ['For Rent', 'For Sale'],
            'owners' => $owners,
            'image_placeholder' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
        ]);
    }

    /**
     * Store a newly created property.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        // Check if user is admin or agent using boolean attributes
        if (!$user->is_admin && !$user->is_agent) {
            abort(403, 'Unauthorized action.');
        }

        $validator = Validator::make($request->all(), Property::rules(), Property::messages());

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $validated = $validator->validated();

        // Validate image URL and check if it's wide format
        $imageInfo = $this->validateImageUrl($validated['image']);
        if (!$imageInfo['valid']) {
            return redirect()->back()
                ->withErrors(['image' => 'Invalid image URL. Recommended: wide format (2:1 ratio - width = height × 2).'])
                ->withInput();
        }

        // Add image ratio
        $validated['image_ratio'] = $imageInfo['ratio'];

        // Add user_id
        $validated['user_id'] = $user->id;

        Property::create($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property created successfully!');
    }

    /**
     * Display the specified property.
     */
    public function show(Property $property)
    {
        $property->load(['user:id,name,email,phone', 'owner:id,name,phone,email']);

        // Add computed attributes
        $property->image_url = $property->image_url;
        $property->is_wide_image = $property->is_wide_image;
        $property->formatted_price = $property->formatted_price;
        $property->formatted_size = $property->formatted_size;

        $relatedProperties = Property::where('type', $property->type)
            ->where('id', '!=', $property->id)
            ->where('image_ratio', '2:1') // Only show wide images in related
            ->limit(4)
            ->get()
            ->map(function ($prop) {
                $prop->image_url = $prop->image_url;
                $prop->formatted_price = $prop->formatted_price;
                $prop->formatted_size = $prop->formatted_size;
                return $prop;
            });

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'relatedProperties' => $relatedProperties,
        ]);
    }

    /**
     * Show the form for editing the specified property.
     * NOTE: This method is no longer needed since we're using modals,
     * but keeping it for compatibility.
     */
    public function edit(Property $property)
    {
        $user = Auth::user();
        
        // Check authorization: admin can edit all, agents can only edit their own properties
        if (!$user->is_admin && (!$user->is_agent || $property->user_id !== $user->id)) {
            abort(403, 'Unauthorized action.');
        }

        $owners = \App\Models\Owner::all();

        // Add computed attributes for the form
        $property->image_url = $property->image_url;
        $property->is_wide_image = $property->is_wide_image;

        return Inertia::render('Properties/Edit', [
            'property' => $property,
            'property_types' => ['House', 'Apartment', 'Land', 'Office'],
            'status_types' => ['For Rent', 'For Sale'],
            'owners' => $owners,
            'image_placeholder' => 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop',
        ]);
    }

    /**
     * Update the specified property.
     */
    public function update(Request $request, Property $property)
    {
        $user = Auth::user();
        
        // Check authorization: admin can update all, agents can only update their own properties
        if (!$user->is_admin && (!$user->is_agent || $property->user_id !== $user->id)) {
            abort(403, 'Unauthorized action.');
        }

        $validator = Validator::make($request->all(), Property::rules($property->id), Property::messages());

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $validated = $validator->validated();

        // Validate image URL if changed
        if ($validated['image'] !== $property->image) {
            $imageInfo = $this->validateImageUrl($validated['image']);
            if (!$imageInfo['valid']) {
                return redirect()->back()
                    ->withErrors(['image' => 'Invalid image URL. Recommended: wide format (2:1 ratio - width = height × 2).'])
                    ->withInput();
            }
            $validated['image_ratio'] = $imageInfo['ratio'];
        }

        $property->update($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property updated successfully!');
    }

    /**
     * Remove the specified property.
     */
    public function destroy(Property $property)
    {
        $user = Auth::user();
        
        // Check authorization: admin can delete all, agents can only delete their own properties
        if (!$user->is_admin && (!$user->is_agent || $property->user_id !== $user->id)) {
            abort(403, 'Unauthorized action.');
        }

        $property->delete();

        return redirect()->route('properties.index')
            ->with('success', 'Property deleted successfully!');
    }

    /**
     * Validate image URL (simplified - in production, you might want to check dimensions)
     */
    private function validateImageUrl($url)
    {
        try {
            // Basic URL validation
            if (!filter_var($url, FILTER_VALIDATE_URL)) {
                return ['valid' => false, 'ratio' => null];
            }

            // For now, we'll accept the URL and recommend 2:1
            // In production, you might want to use a service to check image dimensions
            
            // Accept the image and recommend wide format
            return ['valid' => true, 'ratio' => '2:1'];
            
        } catch (\Exception $e) {
            return ['valid' => false, 'ratio' => null];
        }
    }

    /**
     * Get image suggestions for property type.
     */
    public function getImageSuggestions(Request $request)
    {
        $type = $request->get('type', 'House');
        
        $suggestions = [
            'House' => [
                'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=400&fit=crop',
            ],
            'Apartment' => [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=400&fit=crop',
            ],
            'Land' => [
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1421790500381-fc9b5996f343?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop',
            ],
            'Office' => [
                'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop',
            ],
        ];

        return response()->json([
            'suggestions' => $suggestions[$type] ?? $suggestions['House'],
            'message' => 'Wide format images (2:1 ratio - width = height × 2) recommended for best display'
        ]);
    }
}