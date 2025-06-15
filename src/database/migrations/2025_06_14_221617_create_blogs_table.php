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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->text('content')->nullable();
            $table->text('excerpt')->nullable();
            $table->string('author')->default('Anonymous');
            $table->string('featured_image')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description')->nullable();
            $table->string('meta_keyword')->nullable();
            $table->string('reading_time')->nullable();
            $table->bigInteger('views')->default(0);
            $table->boolean('is_active')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->datetime('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
