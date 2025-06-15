<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Event::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventTitles = [
            'District 5B Monthly Business Meeting',
            'Speaker Meeting: Finding Hope in Recovery',
            'AA Step Study Workshop',
            'Newcomer Orientation and Welcome',
            'Big Book Study Group',
            'Sponsorship Workshop for New Sponsors',
            'Young People in AA Meeting',
            'Women in Recovery Support Group',
            'Men\'s Sobriety Circle',
            'Traditions Study Workshop',
            'Service Committee Planning Meeting',
            'Intergroup Representative Meeting',
            'Al-Anon Family Support Meeting',
            'Dual Recovery Anonymous Meeting',
            'Literature Study: Living Sober',
            'Anniversary Celebration Meeting',
            'Holiday Sobriety Support Meeting',
            'Meditation and Recovery Workshop',
            'Service Work Opportunities Fair',
            'Recovery Resources Information Session'
        ];

        $eventDescriptions = [
            "Join us for our monthly business meeting where we discuss district matters, upcoming events, and ways to better serve our recovery community. All are welcome to attend and participate in the democratic process of our fellowship.",

            "This special speaker meeting features members sharing their experience, strength, and hope. Come hear inspiring stories of recovery and connect with others on the same journey. Refreshments will be provided.",

            "A comprehensive workshop focusing on working the 12 Steps of Alcoholics Anonymous. Perfect for newcomers and those looking to deepen their understanding of the program. Workbooks will be provided.",

            "Designed specifically for those new to the program, this orientation covers the basics of AA, how meetings work, and introduces newcomers to the fellowship. A safe space to ask questions and learn.",

            "Weekly study of the Big Book of Alcoholics Anonymous. We read together, discuss the text, and share how the principles apply to our daily lives. All levels of recovery welcome.",

            "Educational workshop for those interested in sponsoring others in recovery. Learn about the responsibilities, boundaries, and rewards of sponsorship. Experienced sponsors will share their insights.",

            "A meeting specifically for young people in recovery, typically those under 35. Discuss challenges unique to young people in sobriety and build connections with peers.",

            "A supportive environment for women in recovery to share their experiences and challenges. Topics often include relationships, parenting, career, and maintaining sobriety as a woman.",

            "Men's support group focusing on recovery, accountability, and brotherhood. A safe space to discuss men's issues in recovery and build lasting friendships in sobriety.",

            "Study the 12 Traditions of Alcoholics Anonymous and learn how they guide our fellowship. Understanding traditions helps maintain unity and focus in our recovery community."
        ];

        $locations = [
            'Central Community Center, 123 Main St',
            'St. Mary\'s Church Hall, 456 Oak Avenue',
            'Riverside Community Building, 789 River Rd',
            'Downtown Library Meeting Room, 321 First St',
            'Hope Fellowship Center, 654 Pine Street',
            'Unity Hall, 987 Elm Street',
            'Serenity Center, 147 Maple Drive',
            'Community Methodist Church, 258 Cedar Ave',
            'Northside Community Center, 369 Birch Lane',
            'Westside Meeting Hall, 741 Willow Way',
            'Sunrise Recovery Center, 852 Dawn Street',
            'Peaceful Pathway Church, 963 Harmony Blvd',
            'New Beginnings Center, 159 Fresh Start Ave',
            'Circle of Hope Building, 357 Unity Drive',
            'Recovery First Hall, 468 Sober Street'
        ];

        $startDate = $this->faker->dateTimeBetween('+1 day', '+6 months');
        $startDateTime = Carbon::instance($startDate);

        $startDateTime->setTime(
            $this->faker->numberBetween(9, 19),
            $this->faker->randomElement([0, 15, 30, 45])
        );

        $endDateTime = $startDateTime->copy()->addHours($this->faker->numberBetween(1, 3));

        return [
            'title' => $this->faker->randomElement($eventTitles),
            'description' => $this->faker->randomElement($eventDescriptions),
            'location' => $this->faker->randomElement($locations),
            'start_time' => $startDateTime,
            'end_time' => $endDateTime,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the event should be in the near future.
     */
    public function upcoming(): static
    {
        return $this->state(function (array $attributes) {
            $startDate = $this->faker->dateTimeBetween('+1 day', '+1 month');
            $startDateTime = Carbon::instance($startDate);

            $startDateTime->setTime(
                $this->faker->numberBetween(9, 19),
                $this->faker->randomElement([0, 15, 30, 45])
            );

            $endDateTime = $startDateTime->copy()->addHours($this->faker->numberBetween(1, 3));

            return [
                'start_time' => $startDateTime,
                'end_time' => $endDateTime,
            ];
        });
    }

    /**
     * Indicate that the event should be this week.
     */
    public function thisWeek(): static
    {
        return $this->state(function (array $attributes) {
            $startDate = $this->faker->dateTimeBetween('now', '+1 week');
            $startDateTime = Carbon::instance($startDate);

            $startDateTime->setTime(
                $this->faker->numberBetween(9, 19),
                $this->faker->randomElement([0, 15, 30, 45])
            );

            $endDateTime = $startDateTime->copy()->addHours($this->faker->numberBetween(1, 3));

            return [
                'start_time' => $startDateTime,
                'end_time' => $endDateTime,
            ];
        });
    }

    /**
     * Indicate that the event should be a long workshop (3-4 hours).
     */
    public function workshop(): static
    {
        return $this->state(function (array $attributes) {
            $startDate = $this->faker->dateTimeBetween('+1 week', '+3 months');
            $startDateTime = Carbon::instance($startDate);

            $startDateTime->setTime(
                $this->faker->randomElement([9, 13]),
                0
            );

            $endDateTime = $startDateTime->copy()->addHours($this->faker->numberBetween(3, 4));

            return [
                'start_time' => $startDateTime,
                'end_time' => $endDateTime,
            ];
        });
    }
}
