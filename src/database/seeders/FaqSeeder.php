<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Faq;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting FAQs seeder...');

        $faqs = [
            [
                'title' => 'What am I supposed to do as a GSR?',
                'content' => 'Read the pamphlet on being a GSR and see the Handy Checklist.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'What am I supposed to share with the group in my report(s)?',
                'content' => 'Typically it\'s a brief overview of what happened at the District Area meeting. It may be helpful to share something you learned or interested you at the meeting. You probably know your group better than anyone, so what do you think they would like to hear about? It may also be helpful and engaging to ask a question. It may also be helpful to say something like "If you want more information about upcoming events (or a topic you chose) please come and see me after the meeting. We also have a link about a sample report.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'How long should the report be?',
                'content' => 'Great question, again you will know your group, so that really up to you. A good idea of how long may relate back to when you heard other GSR reports and whether or not it was made interesting.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'What should I do if my group is apathetic and or doesn\'t seem interested?',
                'content' => 'Unfortunately, this is a very common question. It\'s sort of your job to make it interesting (or at least relevant). How would the group know about the changes to the AA Preamble, or the Plain Language Big Book, or the 5th Edition Big Book without the GSR? These are just some examples of ways to spark interest within the group. Perhaps not though, this is not a popularity contest, you are being of service to AA, sometimes its difficult. Perhaps take solace in the fact that you are learning new things and making friends with other people who are trying to be of service to AA in a different way than at the meeting level. level. Many groups change their interest levels about what is happening in AA in general, by the GSR\'s enthusiasm.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $faqsCount = 0;

        foreach ($faqs as $faqData) {
            try {
                Faq::create($faqData);
                $faqsCount++;
            } catch (\Exception $e) {
                $this->command->error('Error inserting FAQ: ' . $e->getMessage());
                $this->command->error('Data: ' . json_encode($faqData));
            }
        }

        $this->command->info("FAQs seeder completed!");
        $this->command->info("✅ Successfully imported: {$faqsCount} FAQs");
    }
}
