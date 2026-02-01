<?php

namespace Database\Seeders;

use App\Models\Owner;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // First create users and store them in variables
        $admin = User::create([
            'name' => 'David Yon',
            'email' => 'david@kamproperty.com',
            'password' => Hash::make('david123'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        $agent = User::create([
            'name' => 'Agent Sothea',
            'email' => 'sothea@kamproperty.com',
            'password' => Hash::make('sothea123'),
            'role' => 'agent',
            'email_verified_at' => now(),
        ]);

        $user = User::create([
            'name' => 'User Chhangleang',
            'email' => 'chhangleang@kamproperty.com',
            'password' => Hash::make('chhangleang123'),
            'role' => 'user',
            'email_verified_at' => now(),
        ]);

        // Create sample properties
        Property::create([
            'title' => 'Modern Apartment in Westlands',
            'type' => 'Apartment',
            'price' => 25000000,
            'location' => 'Westlands, Nairobi',
            'size' => 120,
            'description' => 'Beautiful modern apartment with great views.',
            'status' => 'For Sale',
            'user_id' => $agent->id,
        ]);

        Property::create([
            'title' => 'Luxury Villa in Karen',
            'type' => 'House',
            'price' => 85000000,
            'location' => 'Karen, Nairobi',
            'size' => 450,
            'description' => 'Spacious luxury villa with swimming pool and garden.',
            'status' => 'For Sale',
            'user_id' => $admin->id,
            
        ]);

        Property::create([
            'title' => 'Office Space in CBD',
            'type' => 'Office',
            'price' => 150000,
            'location' => 'CBD, Nairobi',
            'size' => 80,
            'description' => 'Prime office space in the heart of the city.',
            'status' => 'For Rent',
            'user_id' => $agent->id,
           
        ]);

        Property::create([
            'title' => 'Commercial Land in Mombasa Road',
            'type' => 'Land',
            'price' => 45000000,
            'location' => 'Mombasa Road, Nairobi',
            'size' => 1000,
            'description' => 'Prime commercial land suitable for development.',
            'status' => 'For Sale',
            'user_id' => $admin->id,
          
        ]);
    }
}