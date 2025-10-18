<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createSubjectsForSchool($school);
        }
    }

    private function createSubjectsForSchool(School $school): void
    {
        $commonSubjects = [
            // Wajib
            ['code' => 'MTK', 'name' => 'Matematika', 'category' => 'WAJIB', 'order_index' => 1],
            ['code' => 'BIN', 'name' => 'Bahasa Indonesia', 'category' => 'WAJIB', 'order_index' => 2],
            ['code' => 'BIG', 'name' => 'Bahasa Inggris', 'category' => 'WAJIB', 'order_index' => 3],
            ['code' => 'PKN', 'name' => 'Pendidikan Kewarganegaraan', 'category' => 'WAJIB', 'order_index' => 4],
            ['code' => 'PJOK', 'name' => 'Pendidikan Jasmani', 'category' => 'WAJIB', 'order_index' => 5],
            ['code' => 'AGM', 'name' => 'Pendidikan Agama', 'category' => 'WAJIB', 'order_index' => 6],
            
            // Umum
            ['code' => 'SEJ', 'name' => 'Sejarah', 'category' => 'UMUM', 'order_index' => 7],
            ['code' => 'GEO', 'name' => 'Geografi', 'category' => 'UMUM', 'order_index' => 8],
            ['code' => 'EKO', 'name' => 'Ekonomi', 'category' => 'UMUM', 'order_index' => 9],
            ['code' => 'SOS', 'name' => 'Sosiologi', 'category' => 'UMUM', 'order_index' => 10],
        ];

        $additionalSubjects = match($school->level) {
            'SMA' => [
                ['code' => 'FIS', 'name' => 'Fisika', 'category' => 'KEAHLIAN', 'order_index' => 11],
                ['code' => 'KIM', 'name' => 'Kimia', 'category' => 'KEAHLIAN', 'order_index' => 12],
                ['code' => 'BIO', 'name' => 'Biologi', 'category' => 'KEAHLIAN', 'order_index' => 13],
            ],
            'SMP' => [
                ['code' => 'IPA', 'name' => 'Ilmu Pengetahuan Alam', 'category' => 'UMUM', 'order_index' => 11],
                ['code' => 'IPS', 'name' => 'Ilmu Pengetahuan Sosial', 'category' => 'UMUM', 'order_index' => 12],
            ],
            default => []
        };

        $subjects = array_merge($commonSubjects, $additionalSubjects);

        foreach ($subjects as $subject) {
            Subject::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'code' => $subject['code']
                ],
                array_merge($subject, [
                    'description' => "Mata pelajaran {$subject['name']}",
                    'is_active' => true
                ])
            );
        }
    }
}