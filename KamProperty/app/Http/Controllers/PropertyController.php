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
     * Display a listing of properties for user browsing.
     */
    public function browse(Request $request)
    {
        $query = Property::query()->with(['owner:id,name']);

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

        // Apply sorting
        switch ($request->get('sort_by', 'newest')) {
            case 'price_low_high':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high_low':
                $query->orderBy('price', 'desc');
                break;
            default:
                $query->latest();
                break;
        }

        // Get paginated properties (12 per page for better browsing)
        $properties = $query->paginate(12)->withQueryString();

        // Transform properties for user display
        $properties->getCollection()->transform(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'type' => $property->type,
                'price' => $property->price,
                'formatted_price' => '$' . number_format($property->price, 0),
                'location' => $property->location,
                'size' => $property->size,
                'formatted_size' => number_format($property->size) . ' sqm',
                'description' => $property->description,
                'short_description' => $property->short_description,
                'status' => $property->status,
                'image' => $property->image,
                'image_url' => $property->image_url,
                'is_wide_image' => $property->is_wide_image,
                'bedrooms' => $property->bedrooms ?? 3, // Default value if not in your DB
                'bathrooms' => $property->bathrooms ?? 2, // Default value if not in your DB
                'owner' => $property->owner,
                'created_at' => $property->created_at->format('M d, Y'),
                'updated_at' => $property->updated_at->format('M d, Y'),
            ];
        });

        // Get property counts for filters
        $propertyCounts = [
            'all' => Property::count(),
            'House' => Property::where('type', 'House')->count(),
            'Apartment' => Property::where('type', 'Apartment')->count(),
            'Land' => Property::where('type', 'Land')->count(),
            'Office' => Property::where('type', 'Office')->count(),
            'For Sale' => Property::where('status', 'For Sale')->count(),
            'For Rent' => Property::where('status', 'For Rent')->count(),
        ];

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filters' => $request->only(['type', 'status', 'location', 'min_price', 'max_price', 'sort_by']),
            'propertyCounts' => $propertyCounts,
            'stats' => [
                'total' => $propertyCounts['all'],
                'for_sale' => $propertyCounts['For Sale'],
                'for_rent' => $propertyCounts['For Rent'],
            ]
        ]);
    }

    /**
     * Display a single property for user viewing.
     */
    public function userShow(Property $property)
    {
        // Load relationships
        $property->load(['user:id,name,email,phone', 'owner:id,name,phone,email']);
        
        // Add computed attributes
        $propertyData = [
            'id' => $property->id,
            'title' => $property->title,
            'type' => $property->type,
            'price' => $property->price,
            'formatted_price' => '$' . number_format($property->price, 0),
            'location' => $property->location,
            'size' => $property->size,
            'formatted_size' => number_format($property->size) . ' sqm',
            'description' => $property->description,
            'status' => $property->status,
            'image' => $property->image,
            'image_url' => $property->image_url,
            'is_wide_image' => $property->is_wide_image,
            'bedrooms' => $property->bedrooms ?? 3,
            'bathrooms' => $property->bathrooms ?? 2,
            'user' => $property->user, // This ensures user is available
            'owner' => $property->owner,
            'created_at' => $property->created_at->format('F d, Y'),
            'images' => [$property->image_url] // You can modify this to get multiple images
        ];

        // Get related properties
        $relatedProperties = Property::where('type', $property->type)
            ->where('id', '!=', $property->id)
            ->limit(3)
            ->get()
            ->map(function ($prop) {
                return [
                    'id' => $prop->id,
                    'title' => $prop->title,
                    'price' => $prop->price,
                    'formatted_price' => '$' . number_format($prop->price, 0),
                    'location' => $prop->location,
                    'image_url' => $prop->image_url,
                    'type' => $prop->type,
                    'status' => $prop->status,
                ];
            });

        return Inertia::render('PropertiesView', [
            'property' => $propertyData,
            'relatedProperties' => $relatedProperties,
        ]);
    }

    /**
     * Display the specified property for ADMIN VIEWING.
     */
    public function adminShow(Property $property)
    {
        $user = Auth::user();
        
        // Check authorization: admin can view all, agents can only view their own properties
        if (!$user->is_admin && (!$user->is_agent || $property->user_id !== $user->id)) {
            abort(403, 'Unauthorized action.');
        }

        $property->load(['user:id,name,email', 'owner:id,name,phone,email']);

        // Add computed attributes
        $property->image_url = $property->image_url;
        $property->is_wide_image = $property->is_wide_image;
        $property->formatted_price = $property->formatted_price;
        $property->formatted_size = $property->formatted_size;

        $owners = \App\Models\Owner::all();

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'owners' => $owners,
        ]);
    }

    /**
     * Display a listing of properties for user browsing.
     */
    


    /**
     * Get property features based on type (you can customize this)
     */
    private function getPropertyFeatures(Property $property)
    {
        $baseFeatures = [
            'Parking' => $property->type === 'House' ? 'Garage' : ($property->type === 'Apartment' ? 'Underground' : 'Available'),
            'Security' => '24/7 Security',
            'Year Built' => '2020',
        ];

        if ($property->type === 'House') {
            $baseFeatures['Bedrooms'] = '3-4';
            $baseFeatures['Bathrooms'] = '2-3';
            $baseFeatures['Garden'] = 'Yes';
        } elseif ($property->type === 'Apartment') {
            $baseFeatures['Bedrooms'] = '1-3';
            $baseFeatures['Bathrooms'] = '1-2';
            $baseFeatures['Balcony'] = 'Yes';
        } elseif ($property->type === 'Office') {
            $baseFeatures['Floor'] = '5th';
            $baseFeatures['Capacity'] = '10-20 people';
            $baseFeatures['Meeting Rooms'] = '2';
        }

        return $baseFeatures;
    }
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