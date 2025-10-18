<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createStudentsForSchool($school);
        }
    }

    private function createStudentsForSchool(School $school): void
    {
        $studentCount = match($school->level) {
            'SMA' => 120, // 4 kelas × 30 siswa
            'SMP' => 135, // 5 kelas × 27 siswa
            default => 90   // 3 kelas × 30 siswa
        };

        $currentYear = date('Y');
        $startNIS = match($school->level) {
            'SMA' => $currentYear . '001',
            'SMP' => $currentYear . '001',
            default => $currentYear . '001'
        };

        for ($i = 1; $i <= $studentCount; $i++) {
            $nis = (string)($startNIS + $i - 1);
            $nisn = '00' . $nis;
            $gender = $i % 2 == 0 ? 'L' : 'P';
            
            $firstName = $gender === 'L' ? 
                $this->getMaleFirstName() : 
                $this->getFemaleFirstName();
            
            $lastName = $this->getLastName();
            $fullName = $firstName . ' ' . $lastName;

            Student::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'nis' => $nis
                ],
                [
                    'nisn' => $nisn,
                    'name' => $fullName,
                    'email' => strtolower(str_replace(' ', '.', $fullName)) . '@' . strtolower($school->code) . '.sch.id',
                    'phone' => '08' . substr($nis, -9),
                    'gender' => $gender,
                    'birth_place' => $this->getRandomCity(),
                    'birth_date' => $this->getRandomBirthDate($school->level),
                    'religion' => $this->getRandomReligion(),
                    'address' => 'Jl. ' . $firstName . ' No. ' . $i . ', ' . $this->getRandomCity(),
                    'father_name' => 'Bapak ' . $this->getMaleFirstName() . ' ' . $lastName,
                    'mother_name' => 'Ibu ' . $this->getFemaleFirstName() . ' ' . $lastName,
                    'parent_phone' => '08' . substr($nis, -8),
                    'enrollment_date' => $currentYear . '-07-15',
                    'status' => 'ACTIVE'
                ]
            );
        }
    }

    private function getMaleFirstName(): string
    {
        $names = ['Ahmad', 'Budi', 'Cahya', 'Dedi', 'Eko', 'Fajar', 'Gunawan', 'Hadi', 'Irfan', 'Joko'];
        return $names[array_rand($names)];
    }

    private function getFemaleFirstName(): string
    {
        $names = ['Ani', 'Bunga', 'Citra', 'Dewi', 'Eka', 'Fitri', 'Gita', 'Hani', 'Indah', 'Juli'];
        return $names[array_rand($names)];
    }

    private function getLastName(): string
    {
        $names = ['Santoso', 'Wijaya', 'Pratama', 'Kusuma', 'Nugroho', 'Siregar', 'Hidayat', 'Saputra', 'Setiawan', 'Ramadan'];
        return $names[array_rand($names)];
    }

    private function getRandomCity(): string
    {
        $cities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Malang', 'Medan', 'Makassar', 'Denpasar', 'Palembang'];
        return $cities[array_rand($cities)];
    }

    private function getRandomBirthDate(string $schoolLevel): string
    {
        $currentYear = date('Y');
        $age = match($schoolLevel) {
            'SMA' => rand(15, 18),
            'SMP' => rand(12, 15),
            default => rand(6, 12)
        };
        
        $birthYear = $currentYear - $age;
        $birthMonth = rand(1, 12);
        $birthDay = rand(1, 28);
        
        return sprintf('%d-%02d-%02d', $birthYear, $birthMonth, $birthDay);
    }

    private function getRandomReligion(): string
    {
        $religions = ['ISLAM', 'KRISTEN', 'KATOLIK', 'HINDU', 'BUDDHA', 'KONGHUCHU'];
        return $religions[array_rand($religions)];
    }
}