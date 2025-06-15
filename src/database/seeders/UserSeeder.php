<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'dev',
            'first_name' => 'Andrew',
            'last_name' => 'Godby',
            'is_admin' => true,
            'email' => 'andrewmgodby@gmail.com',
            'password' => Hash::make('Nuya2616'),
        ]);
    }
}
