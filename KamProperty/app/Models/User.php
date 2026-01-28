<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Role checking methods
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isAgent(): bool
    {
        return $this->role === 'agent';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    // Append these to JSON response
    protected $appends = ['is_admin', 'is_agent', 'is_user'];

    public function getIsAdminAttribute(): bool
    {
        return $this->isAdmin();
    }

    public function getIsAgentAttribute(): bool
    {
        return $this->isAgent();
    }

    public function getIsUserAttribute(): bool
    {
        return $this->isUser();
    }
}