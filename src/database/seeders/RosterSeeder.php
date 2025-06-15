<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Roster;

class RosterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Starting Roster seeder...');

        $rosterData = [
            [
                'name' => 'Victor M.',
                'title' => 'DCM',
                'phone' => null,
                'email' => 'vrm65@cox.net'
            ],
            [
                'name' => 'Susan L.',
                'title' => 'Alt DCM',
                'phone' => '(909) 360-6683',
                'email' => 'susanliora@msn.com'
            ],
            [
                'name' => 'Bryce B.',
                'title' => 'Secretary',
                'phone' => '(702) 496-7495',
                'email' => 'Bryce92211@gmail.com'
            ],
            [
                'name' => 'Tanya T.',
                'title' => 'Treasurer',
                'phone' => '(858) 336-3795',
                'email' => 'tanyataylor78@gmail.com'
            ],
            [
                'name' => 'Andrew B.',
                'title' => 'GSR Orientor',
                'phone' => '(714) 599-2126',
                'email' => 'abirnbaum83@gmail.com'
            ],
            [
                'name' => 'Eileen P.',
                'title' => 'Intergroup',
                'phone' => '(210) 207-2039',
                'email' => 'eileenp1203@gmail.com'
            ],
            [
                'name' => 'Mindy',
                'title' => 'Registrar',
                'phone' => '(702) 481-8369',
                'email' => null
            ],
            [
                'name' => 'Andrew B.',
                'title' => 'Grapevine',
                'phone' => '(714) 599-2126',
                'email' => 'abirnbaum83@gmail.com'
            ],
            [
                'name' => 'Cynthia',
                'title' => 'Workshops',
                'phone' => '(702) 409-2784',
                'email' => null
            ],
            [
                'name' => 'Eric M.',
                'title' => 'Workshops',
                'phone' => '(608) 732-8681',
                'email' => 'muus.eric@gmail.com'
            ],
            [
                'name' => 'Bill',
                'title' => 'H&I',
                'phone' => null,
                'email' => null
            ],
            [
                'name' => 'Bill',
                'title' => 'CWTPC',
                'phone' => null,
                'email' => null
            ],
            [
                'name' => 'Susan L.',
                'title' => 'Picnic',
                'phone' => '(909) 360-6683',
                'email' => 'susanliora@msn.com'
            ],
            [
                'name' => 'Pam F.',
                'title' => 'Archives',
                'phone' => null,
                'email' => 'flisspamela@gmail.com'
            ]
        ];
        Roster::truncate();
        foreach ($rosterData as $member) {
            Roster::create($member);
        }
        $this->command->info('✅ Successfully created ' . count($rosterData) . ' roster members');
    }
}
