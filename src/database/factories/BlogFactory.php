<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Blog;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BlogFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Blog::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $recoveryTitles = [
            'Finding Hope in the Program',
            'One Day at a Time: My Journey',
            'The Power of the Serenity Prayer',
            'How Step 4 Changed My Life',
            'Building a New Foundation',
            'Learning to Let Go and Let God',
            'The Gift of Sponsorship',
            'Coming Back After a Relapse',
            'Celebrating One Year of Sobriety',
            'Finding My Higher Power',
            'The Importance of Daily Meetings',
            'Making Amends: A Path to Freedom',
            'Service Work Saved My Life',
            'From Rock Bottom to Recovery',
            'The Fellowship That Saved Me',
            'Working the Steps with Commitment',
            'Finding Peace in Acceptance',
            'My First 90 Days',
            'The Miracle of Recovery',
            'Learning to Live Life on Life\'s Terms'
        ];

        $recoveryContent = [
            "When I first walked into the rooms of Alcoholics Anonymous, I was broken, desperate, and had nowhere else to turn. The weight of my addiction had crushed everything I held dear - my relationships, my career, my self-respect.\n\nBut in those rooms, I found something I hadn't experienced in years: hope. The people I met there weren't judging me; they were welcoming me with open arms because they understood exactly what I was going through.\n\nToday, I want to share how the program has transformed my life and given me a second chance at living.",

            "Recovery isn't a destination; it's a journey that I take one day at a time. Some days are harder than others, but I've learned that each sober day is a victory worth celebrating.\n\nThe tools I've gained through working the steps have become my daily companions. Prayer, meditation, and connecting with my sponsor have become as essential as breathing.\n\nI've discovered that recovery isn't just about not drinking - it's about learning to live again.",

            "Step work seemed overwhelming at first. The idea of a fearless moral inventory filled me with dread. But as I worked through each step with my sponsor, I began to understand that this wasn't about punishment - it was about freedom.\n\nEach step built upon the last, creating a foundation of recovery that I never thought possible. The steps didn't just help me stop drinking; they helped me become the person I was meant to be.",

            "Service work changed everything for me. When I was struggling to find my purpose in early recovery, my sponsor suggested I start helping with coffee before meetings.\n\nWhat started as a simple act of service became the cornerstone of my recovery. Helping others, whether through sponsoring newcomers or simply setting up chairs, has given my life meaning and direction.\n\nIn giving back to the program, I've received far more than I could ever give.",

            "The concept of a Higher Power was foreign to me when I first came to the program. I had lost faith in everything, including myself. But through the gentle guidance of my sponsor and the fellowship, I began to understand that my Higher Power could be anything greater than myself.\n\nToday, my relationship with my Higher Power is the foundation of my recovery. Through prayer and meditation, I've found a peace I never knew was possible."
        ];

        $categories = [
            'Personal Stories',
            'Step Work',
            'Sponsorship',
            'Service',
            'Spirituality',
            'Early Recovery',
            'Long-term Recovery',
            'Relapse and Recovery',
            'Fellowship',
            'Gratitude'
        ];

        $tags = [
            ['recovery', 'hope', 'meetings'],
            ['steps', 'sponsor', 'growth'],
            ['service', 'fellowship', 'community'],
            ['spirituality', 'prayer', 'meditation'],
            ['newcomers', 'early-recovery', 'support'],
            ['gratitude', 'celebration', 'milestone'],
            ['relapse', 'comeback', 'resilience'],
            ['amends', 'step-nine', 'healing'],
            ['higher-power', 'faith', 'surrender'],
            ['one-day-at-a-time', 'daily', 'practice']
        ];

        $title = $this->faker->randomElement($recoveryTitles);
        $slug = Str::slug($title) . '-' . $this->faker->randomNumber(3);
        $content = $this->faker->randomElement($recoveryContent);
        $publishedAt = $this->faker->dateTimeBetween('-2 years', 'now');

        return [
            'title' => $title,
            'slug' => $slug,
            'content' => $content,
            'excerpt' => Str::limit(strip_tags($content), 150),
            'author' => $this->faker->name(),
            'featured_image' => 'https://placehold.co/' . $this->faker->randomElement(['800x600', '600x400', '1200x600']) . '?text=' . urlencode($title),
            'meta_title' => $title . ' | District 5B Stories',
            'meta_description' => Str::limit(strip_tags($content), 160),
            'meta_keyword' => implode(', ', $this->faker->randomElement($tags)),
            'reading_time' => $this->faker->numberBetween(2, 8),
            'views' => $this->faker->numberBetween(0, 500),
            'is_active' => $this->faker->boolean(90),
            'is_featured' => $this->faker->boolean(20),
            'category' => $this->faker->randomElement($categories),
            'tags' => $this->faker->randomElement($tags),
            'published_at' => $publishedAt,
            'created_at' => $publishedAt ?? now(),
            'updated_at' => $publishedAt ?? now(),
        ];
    }

    /**
     * Indicate that the blog post should be published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ]);
    }

    /**
     * Indicate that the blog post should be featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'is_active' => true,
            'published_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    /**
     * Indicate that the blog post should be a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
            'published_at' => null,
        ]);
    }
}
