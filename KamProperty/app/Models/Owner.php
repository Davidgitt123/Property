<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Owner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'alternate_phone',
        'address',
        'identification_type',
        'identification_number',
        'tax_id',
        'notes',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Identification types
    const IDENTIFICATION_TYPES = [
        'national_id' => 'National ID',
        'passport' => 'Passport',
        'driver_license' => 'Driver License',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class, 'owner_id');
    }

    // Scopes
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('phone', 'like', "%{$search}%")
              ->orWhere('identification_number', 'like', "%{$search}%");
        });
    }

    public function scopeWithProperties($query)
    {
        return $query->has('properties');
    }

    public function scopeWithoutProperties($query)
    {
        return $query->doesntHave('properties');
    }

    // Accessors
    public function getIdentificationTypeTextAttribute(): string
    {
        return self::IDENTIFICATION_TYPES[$this->identification_type] ?? 'Unknown';
    }

    public function getPropertiesCountAttribute(): int
    {
        return $this->properties()->count();
    }

    public function getContactInfoAttribute(): string
    {
        $info = [];
        if ($this->phone) {
            $info[] = $this->phone;
        }
        if ($this->alternate_phone) {
            $info[] = $this->alternate_phone;
        }
        return $info ? implode(' / ', $info) : 'No contact info';
    }

    public function getIsLinkedAttribute(): bool
    {
        return !is_null($this->user_id);
    }

    public function getFormattedCreatedAtAttribute(): string
    {
        return $this->created_at->format('M d, Y');
    }

    // Mutators
    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucwords(strtolower($value));
    }
}