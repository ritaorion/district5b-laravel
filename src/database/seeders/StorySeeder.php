<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Blog;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting Blogs seeder...');
        Blog::factory()
            ->count(25)
            ->published()
            ->create();

        Blog::factory()
            ->count(3)
            ->featured()
            ->create();

        Blog::factory()
            ->count(2)
            ->draft()
            ->create();

        $this->command->info('✅ Successfully created 30 blog posts (25 published, 3 featured, 2 drafts)');
    }
}
