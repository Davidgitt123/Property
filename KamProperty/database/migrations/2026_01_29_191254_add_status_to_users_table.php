<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    // In your migration file
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        // Remove this line if it exists
        // $table->timestamp('email_verified_at')->nullable()->after('last_login_at');
        
        // Keep only the new columns you want to add
        $table->string('status')->default('active'); // or whatever you intended
    });
}

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['status', 'last_login_at', 'email_verified_at', 'deleted_at']);
        });
    }
};