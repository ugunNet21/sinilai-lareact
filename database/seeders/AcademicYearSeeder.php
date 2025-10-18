<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\School;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class AcademicYearSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $academicYears = [
                [
                    'id' => Uuid::uuid4()->toString(),
                    'school_id' => $school->id,
                    'year' => '2023/2024',
                    'start_date' => '2023-07-17',
                    'end_date' => '2024-06-14',
                    'is_current' => false,
                    'description' => 'Tahun Ajaran 2023/2024'
                ],
                [
                    'id' => Uuid::uuid4()->toString(),
                    'school_id' => $school->id,
                    'year' => '2024/2025',
                    'start_date' => '2024-07-15',
                    'end_date' => '2025-06-13',
                    'is_current' => true,
                    'description' => 'Tahun Ajaran 2024/2025'
                ],
                [
                    'id' => Uuid::uuid4()->toString(),
                    'school_id' => $school->id,
                    'year' => '2025/2026',
                    'start_date' => '2025-07-14',
                    'end_date' => '2026-06-12',
                    'is_current' => false,
                    'description' => 'Tahun Ajaran 2025/2026'
                ]
            ];

            foreach ($academicYears as $academicYear) {
                AcademicYear::create($academicYear);
            }
        }
    }
}