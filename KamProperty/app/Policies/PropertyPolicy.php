<?php

namespace App\Policies;

use App\Models\Property;
use App\Models\User;

class PropertyPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Everyone can view properties
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Property $property): bool
    {
        return true; // Everyone can view individual properties
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isAgent();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Property $property): bool
    {
        return $user->isAdmin() || ($user->isAgent() && $property->user_id === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Property $property): bool
    {
        return $user->isAdmin() || ($user->isAgent() && $property->user_id === $user->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Property $property): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Property $property): bool
    {
        return $user->isAdmin();
    }
}