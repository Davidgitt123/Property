<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', ['House', 'Apartment', 'Land', 'Office']);
            $table->decimal('price', 15, 2);
            $table->string('location');
            $table->decimal('size', 10, 2)->comment('Size in square meters');
            $table->text('description')->nullable();
            $table->enum('status', ['For Rent', 'For Sale']);
            $table->string('image')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better performance
            $table->index(['type', 'status']);
            $table->index('price');
            $table->index('location');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};