<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OwnerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => $this->faker->phoneNumber(),
            'alternate_phone' => $this->faker->optional()->phoneNumber(),
            'address' => $this->faker->address(),
            'identification_type' => $this->faker->randomElement(['national_id', 'passport', 'driver_license', null]),
            'identification_number' => $this->faker->optional()->numerify('##########'),
            'tax_id' => $this->faker->optional()->numerify('TID#########'),
            'notes' => $this->faker->optional()->sentence(),
            'user_id' => $this->faker->optional()->randomElement(User::pluck('id')->toArray()),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}