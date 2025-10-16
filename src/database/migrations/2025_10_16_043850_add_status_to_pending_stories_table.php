<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pending_stories', function (Blueprint $table) {
            $table->enum('status', ['new', 'approved', 'rejected'])->default('new')->after('anonymous');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pending_stories', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
