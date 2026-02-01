<?php

namespace Database\Seeders;

use App\Models\Owner;
use App\Models\User;
use Illuminate\Database\Seeder;

class OwnerSeeder extends Seeder
{
    public function run(): void
    {
        // Create some users first
        $users = User::factory()->count(5)->create(['role' => 'user']);

        // Create owners linked to users
        foreach ($users as $user) {
            Owner::factory()->create([
                'user_id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
            ]);
        }

        // Create some owners without user accounts
        Owner::factory()->count(10)->create([
            'user_id' => null,
        ]);
    }
}