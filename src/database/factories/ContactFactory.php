<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Contact;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    protected $model = Contact::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Array of realistic contact form subjects
        $subjects = [
            'Question about services',
            'Support request',
            'General inquiry',
            'Feedback about website',
            'Meeting information request',
            'Volunteer opportunities',
            'Event details needed',
            'Technical issue',
            'Partnership proposal',
            'Location and directions',
            'Schedule inquiry',
            'Resource request',
        ];

        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'subject' => fake()->randomElement($subjects),
            'message' => fake()->paragraphs(rand(2, 4), true), // More realistic message length
            'created_at' => fake()->dateTimeBetween('-6 months', 'now'), // Spread out over time
            'updated_at' => function (array $attributes) {
                return $attributes['created_at'];
            },
        ];
    }
}
