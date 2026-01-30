<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            // Change image column to store URLs instead of file paths
            $table->string('image')->nullable()->change();
            
            // Add validation for square image
            $table->string('image_ratio')->nullable()->comment('Stores image ratio, should be 1:1 for square');
            
        
        });
    }

    public function down(): void
    {
        Schema::table('properties', function (Blueprint $table) {
            $table->dropColumn('image_ratio');
        });
    }
};