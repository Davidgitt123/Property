<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'type',
        'price',
        'location',
        'size',
        'description',
        'status',
        'image',
        'image_ratio',
        'user_id',
        'owner_id',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'size' => 'decimal:2',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    // Scopes for filtering
    public function scopeForSale($query)
    {
        return $query->where('status', 'For Sale');
    }

    public function scopeForRent($query)
    {
        return $query->where('status', 'For Rent');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByLocation($query, $location)
    {
        return $query->where('location', 'like', '%' . $location . '%');
    }

    public function scopePriceRange($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('deleted_at');
    }

    // Accessors and Mutators
    public function getFormattedPriceAttribute()
    {
        return 'KSh ' . number_format($this->price, 2);
    }

    public function getFormattedSizeAttribute()
    {
        return number_format($this->size) . ' sqm';
    }

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            // Check if it's a URL or local path
            if (filter_var($this->image, FILTER_VALIDATE_URL)) {
                return $this->image;
            }
            
            // Check if it's a storage path
            if (strpos($this->image, 'storage/') === 0) {
                return asset($this->image);
            }
            
            // Assume it's a storage path
            return asset('storage/' . $this->image);
        }
        
        // Return default 2:1 placeholder
        return $this->getDefaultImage();
    }

    public function getThumbnailUrlAttribute()
    {
        if ($this->image) {
            return $this->image_url;
        }
        return $this->getDefaultImage();
    }

    public function getDefaultImage()
    {
        // Return a 2:1 placeholder based on property type
        $placeholders = [
            'House' => 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=400&fit=crop',
            'Apartment' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=400&fit=crop',
            'Land' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop',
            'Office' => 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=400&fit=crop',
        ];
        
        return $placeholders[$this->type] ?? $placeholders['House'];
    }

    public function getIsWideImageAttribute()
    {
        return $this->image_ratio === '2:1';
    }

    // Validation rules
    public static function rules($id = null)
    {
        return [
            'title' => 'required|string|max:255',
            'type' => 'required|in:House,Apartment,Land,Office',
            'price' => 'required|numeric|min:0',
            'location' => 'required|string|max:255',
            'size' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:2000',
            'status' => 'required|in:For Rent,For Sale',
            'image' => 'required|url|max:500',
            'image_ratio' => 'nullable|in:2:1',
            'owner_id' => 'nullable|exists:owners,id',
        ];
    }

    public static function messages()
    {
        return [
            'image.url' => 'Please enter a valid image URL',
            'image.required' => 'Please provide an image URL',
            'image_ratio.in' => 'Image should be wide format (2:1 ratio - width = height × 2)',
        ];
    }

    // Business logic
    public function markAsFeatured()
    {
        return $this;
    }

    public function isAvailable()
    {
        return $this->status === 'For Sale' || $this->status === 'For Rent';
    }

    public function getShortDescriptionAttribute()
    {
        return strlen($this->description) > 150 
            ? substr($this->description, 0, 150) . '...' 
            : $this->description;
    }
    
}