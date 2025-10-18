<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    private const USERS = [
        [
            'name' => 'Admin Sekolah',
            'email' => 'admin@sekolah.test',
            'password' => 'password123',
            'role' => 'Admin',
        ],
        [
            'name' => 'Guru Biologi',
            'email' => 'guru@sekolah.test', 
            'password' => 'password123',
            'role' => 'Guru',
        ],
        [
            'name' => 'Siswa Contoh',
            'email' => 'siswa@sekolah.test',
            'password' => 'password123',
            'role' => 'Siswa',
        ],
    ];

    public function run(): void
    {
        foreach (self::USERS as $userData) {
            $user = User::factory()->create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make($userData['password']),
            ]);
            
            $user->assignRole($userData['role']);
        }
    }
}