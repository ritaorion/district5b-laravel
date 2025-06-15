<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'blog_mod_enabled',
        'events_mod_enabled',
        'faqs_mod_enabled',
        'resources_mod_enabled',
        'meetings_mod_enabled',
        'roster_mod_enabled',
        'copyright_text_enabled',
        'copyright_text_content',
        'notify_contact_form_submission',
        'notify_contact_form_email',
        'site_title',
        'site_alert_enabled',
        'site_alert_content',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'blog_mod_enabled' => 'bool',
            'events_mod_enabled' => 'bool',
            'faqs_mod_enabled' => 'bool',
            'resources_mod_enabled' => 'bool',
            'meetings_mod_enabled' => 'bool',
            'roster_mod_enabled' => 'bool',
            'copyright_text_enabled' => 'bool',
            'notify_contact_form_submission' => 'bool',
            'site_alert_enabled' => 'bool',
        ];
    }
}
