<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'file_name',
        'original_file_name',
        'file_size',
        'mime_type',
        'app_type',
        'uploaded_by',
        'storage_path',
        'is_public',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'is_public' => 'boolean',
    ];

    public function uploadedBy(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
