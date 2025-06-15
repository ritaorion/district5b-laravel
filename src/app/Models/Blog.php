<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'author',
        'featured_image',
        'meta_title',
        'meta_description',
        'meta_keyword',
        'reading_time',
        'views',
        'is_active',
        'is_featured',
        'category',
        'tags',
        'published_at'
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
    ];
}
