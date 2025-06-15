<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Setting::create([
            'blog_mod_enabled' => true,
            'events_mod_enabled' => true,
            'faqs_mod_enabled' => true,
            'resources_mod_enabled' => true,
            'meetings_mod_enabled' => true,
            'roster_mod_enabled' => true,
            'copyright_text_enabled' => true,
            'copyright_text_content' => 'These pages are neither endorsed nor approved by Alcoholics Anonymous World Services, Inc.',
            'notify_contact_form_submission' => true,
            'notify_contact_form_email' => null,
            'site_title' => 'District 5B',
            'site_alert_enabled' => false,
            'site_alert_content' => null
        ]);
    }
}
