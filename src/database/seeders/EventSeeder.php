<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting Events seeder...');

        Event::factory()
            ->count(25)
            ->upcoming()
            ->create();

        Event::factory()
            ->count(5)
            ->thisWeek()
            ->create();

        Event::factory()
            ->count(3)
            ->workshop()
            ->create();

        Event::factory()
            ->count(7)
            ->create();

        $this->command->info('✅ Successfully created 40 events (25 upcoming, 5 this week, 3 workshops, 7 future)');
    }
}
