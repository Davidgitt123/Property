<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OwnerController extends Controller
{
    /**
     * Display a listing of owners.
     */
    public function index(Request $request)
    {
        // Only admin and agents can access
        $this->authorize('viewAny', Owner::class);

        // Get search parameters
        $search = $request->input('search', '');
        $hasProperties = $request->input('has_properties', '');

        // Build query
        $query = Owner::withCount('properties');

        // Apply search filter
        if ($search) {
            $query->search($search);
        }

        // Filter by properties
        if ($hasProperties === 'with') {
            $query->has('properties');
        } elseif ($hasProperties === 'without') {
            $query->doesntHave('properties');
        }

        // Order by latest
        $query->latest();

        // Paginate results
        $owners = $query->paginate(15)->withQueryString();

        return Inertia::render('Owners/Index', [
            'owners' => $owners,
            'filters' => [
                'search' => $search,
                'has_properties' => $hasProperties,
            ],
            'stats' => [
                'total' => Owner::count(),
                'with_properties' => Owner::has('properties')->count(),
                'without_properties' => Owner::doesntHave('properties')->count(),
                'linked_accounts' => Owner::whereNotNull('user_id')->count(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new owner.
     */
    public function create()
    {
        $this->authorize('create', Owner::class);

        // Get available users without owner accounts
        $availableUsers = User::whereDoesntHave('owner')
            ->whereIn('role', ['user', 'agent'])
            ->get(['id', 'name', 'email']);

        return Inertia::render('Owners/Create', [
            'availableUsers' => $availableUsers,
            'identificationTypes' => Owner::IDENTIFICATION_TYPES,
        ]);
    }

    /**
     * Store a newly created owner in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Owner::class);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:owners'],
            'phone' => ['nullable', 'string', 'max:20'],
            'alternate_phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:1000'],
            'identification_type' => ['nullable', Rule::in(array_keys(Owner::IDENTIFICATION_TYPES))],
            'identification_number' => ['nullable', 'string', 'max:50'],
            'tax_id' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'user_id' => ['nullable', 'exists:users,id'],
        ]);

        // If user_id is provided, ensure the user exists and doesn't already have an owner account
        if ($request->filled('user_id')) {
            $userHasOwner = Owner::where('user_id', $request->user_id)->exists();
            if ($userHasOwner) {
                return back()->withErrors(['user_id' => 'This user already has an owner account.']);
            }
        }

        $owner = Owner::create($validated);

        return redirect()->route('owners.index')
            ->with('success', 'Owner created successfully.');
    }

    /**
     * Display the specified owner.
     */
    public function show(Owner $owner)
    {
        $this->authorize('view', $owner);

        return Inertia::render('Owners/Show', [
            'owner' => $owner->load([
                'properties' => function ($query) {
                    $query->latest()->take(10);
                },
                'user'
            ]),
            'ownerPropertiesCount' => $owner->properties()->count(),
            'ownerPropertiesValue' => $owner->properties()->sum('price'),
        ]);
    }

    /**
     * Show the form for editing the specified owner.
     */
    public function edit(Owner $owner)
    {
        $this->authorize('update', $owner);

        // Get available users without owner accounts, plus the current user if linked
        $availableUsers = User::where(function ($query) use ($owner) {
            $query->whereDoesntHave('owner')
                ->orWhere('id', $owner->user_id);
        })
        ->whereIn('role', ['user', 'agent'])
        ->get(['id', 'name', 'email']);

        return Inertia::render('Owners/Edit', [
            'owner' => $owner,
            'availableUsers' => $availableUsers,
            'identificationTypes' => Owner::IDENTIFICATION_TYPES,
        ]);
    }

    /**
     * Update the specified owner in storage.
     */
    public function update(Request $request, Owner $owner)
    {
        $this->authorize('update', $owner);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('owners')->ignore($owner->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'alternate_phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:1000'],
            'identification_type' => ['nullable', Rule::in(array_keys(Owner::IDENTIFICATION_TYPES))],
            'identification_number' => ['nullable', 'string', 'max:50'],
            'tax_id' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'user_id' => ['nullable', 'exists:users,id'],
        ]);

        // If user_id is being changed, ensure the new user doesn't already have an owner account
        if ($request->filled('user_id') && $request->user_id != $owner->user_id) {
            $userHasOwner = Owner::where('user_id', $request->user_id)
                ->where('id', '!=', $owner->id)
                ->exists();
            
            if ($userHasOwner) {
                return back()->withErrors(['user_id' => 'This user already has an owner account.']);
            }
        }

        $owner->update($validated);

        return redirect()->route('owners.index')
            ->with('success', 'Owner updated successfully.');
    }

    /**
     * Remove the specified owner from storage.
     */
    public function destroy(Owner $owner)
    {
        $this->authorize('delete', $owner);

        // Check if owner has properties
        if ($owner->properties()->exists()) {
            return redirect()->route('owners.index')
                ->with('error', 'Cannot delete owner with existing properties.');
        }

        $owner->delete();

        return redirect()->route('owners.index')
            ->with('success', 'Owner deleted successfully.');
    }

    /**
     * Get owner statistics
     */
    public function statistics()
    {
        $this->authorize('viewAny', Owner::class);

        $stats = [
            'total_owners' => Owner::count(),
            'owners_with_properties' => Owner::has('properties')->count(),
            'owners_without_properties' => Owner::doesntHave('properties')->count(),
            'linked_accounts' => Owner::whereNotNull('user_id')->count(),
            'recent_owners' => Owner::whereDate('created_at', '>=', now()->subDays(30))->count(),
            'top_owners_by_properties' => Owner::withCount('properties')
                ->orderByDesc('properties_count')
                ->take(5)
                ->get(['name', 'properties_count']),
        ];

        return response()->json($stats);
    }

    /**
     * Get owners for dropdown/autocomplete
     */
    public function autocomplete(Request $request)
    {
        $search = $request->input('search', '');

        $owners = Owner::when($search, function ($query) use ($search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->select('id', 'name', 'email', 'phone')
            ->limit(10)
            ->get();

        return response()->json($owners);
    }
}