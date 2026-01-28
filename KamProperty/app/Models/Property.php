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
            return asset('storage/' . $this->image);
        }
        return asset('images/default-property.jpg');
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
            'description' => 'nullable|string',
            'status' => 'required|in:For Rent,For Sale',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'owner_id' => 'nullable|exists:owners,id',
        ];
    }
}