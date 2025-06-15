<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PendingStory extends Model
{
    protected $fillable = [
        'title',
        'content',
        'author',
        'anonymous',
    ];

    protected $casts = [
        'anonymous' => 'boolean',
    ];
}
