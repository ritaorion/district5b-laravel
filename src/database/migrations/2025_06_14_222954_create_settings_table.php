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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->boolean('blog_mod_enabled')->default(true);
            $table->boolean('events_mod_enabled')->default(true);
            $table->boolean('faqs_mod_enabled')->default(true);
            $table->boolean('resources_mod_enabled')->default(true);
            $table->boolean('meetings_mod_enabled')->default(true);
            $table->boolean('roster_mod_enabled')->default(true);
            $table->boolean('copyright_text_enabled')->default(true);
            $table->string('copyright_text_content')->default('© 2025 Your Organization Name. All rights reserved.');
            $table->boolean('notify_contact_form_submission')->default(false);
            $table->string('notify_contact_form_email')->nullable();
            $table->string('site_title')->default('Your Organization Name');
            $table->boolean('site_alert_enabled')->default(false);
            $table->string('site_alert_content')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
