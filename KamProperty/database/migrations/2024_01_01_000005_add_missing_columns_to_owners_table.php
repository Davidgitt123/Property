<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('owners', function (Blueprint $table) {
            // Check if columns exist before adding them
            if (!Schema::hasColumn('owners', 'alternate_phone')) {
                $table->string('alternate_phone', 20)->nullable()->after('phone');
            }
            
            if (!Schema::hasColumn('owners', 'identification_type')) {
                $table->enum('identification_type', ['national_id', 'passport', 'driver_license'])->nullable()->after('address');
            }
            
            if (!Schema::hasColumn('owners', 'identification_number')) {
                $table->string('identification_number', 50)->nullable()->after('identification_type');
            }
            
            if (!Schema::hasColumn('owners', 'tax_id')) {
                $table->string('tax_id', 50)->nullable()->after('identification_number');
            }
            
            if (!Schema::hasColumn('owners', 'notes')) {
                $table->text('notes')->nullable()->after('tax_id');
            }
            
            // Add indexes if they don't exist
            if (!Schema::hasIndex('owners', 'owners_email_index')) {
                $table->index('email', 'owners_email_index');
            }
            
            if (!Schema::hasIndex('owners', 'owners_phone_index')) {
                $table->index('phone', 'owners_phone_index');
            }
            
            if (!Schema::hasIndex('owners', 'owners_user_id_index')) {
                $table->index('user_id', 'owners_user_id_index');
            }
        });
    }

    public function down(): void
    {
        Schema::table('owners', function (Blueprint $table) {
            // Remove columns if they exist
            if (Schema::hasColumn('owners', 'alternate_phone')) {
                $table->dropColumn('alternate_phone');
            }
            
            if (Schema::hasColumn('owners', 'identification_type')) {
                $table->dropColumn('identification_type');
            }
            
            if (Schema::hasColumn('owners', 'identification_number')) {
                $table->dropColumn('identification_number');
            }
            
            if (Schema::hasColumn('owners', 'tax_id')) {
                $table->dropColumn('tax_id');
            }
            
            if (Schema::hasColumn('owners', 'notes')) {
                $table->dropColumn('notes');
            }
            
            // Remove indexes if they exist
            $table->dropIndexIfExists('owners_email_index');
            $table->dropIndexIfExists('owners_phone_index');
            $table->dropIndexIfExists('owners_user_id_index');
        });
    }
};