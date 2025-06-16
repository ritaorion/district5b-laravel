<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(SiteSettingSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(DocumentSeeder::class);
        $this->call(ContactSeeder::class);
        $this->call(FaqSeeder::class);
        $this->call(StorySeeder::class);
        $this->call(EventSeeder::class);
        $this->call(RosterSeeder::class);
    }
}
