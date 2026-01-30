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
        'status',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
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
    public function properties()
{
    return $this->hasMany(Property::class);
}

public function assignedInquiries()
{
    return $this->hasMany(Inquiry::class, 'assigned_to');
}

// Add scope for active users:
public function scopeActive($query)
{
    return $query->where('status', 'active');
}

public function scopeAgents($query)
{
    return $query->where('role', 'agent');
}

public function scopeAdmins($query)
{
    return $query->where('role', 'admin');
}

public function scopeUsers($query)
{
    return $query->where('role', 'user');
}
}