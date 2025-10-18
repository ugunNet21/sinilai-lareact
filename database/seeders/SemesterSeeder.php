<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Semester;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class SemesterSeeder extends Seeder
{
    public function run(): void
    {
        $academicYears = AcademicYear::all();
        
        foreach ($academicYears as $academicYear) {
            $year = $academicYear->year;
            $startYear = intval(explode('/', $year)[0]);
            
            $semesters = [
                [
                    'id' => Uuid::uuid4()->toString(),
                    'academic_year_id' => $academicYear->id,
                    'name' => 'Ganjil',
                    'code' => 'GJL',
                    'start_date' => $startYear . '-07-17',
                    'end_date' => $startYear . '-12-20',
                    'is_current' => $academicYear->is_current
                ],
                [
                    'id' => Uuid::uuid4()->toString(),
                    'academic_year_id' => $academicYear->id,
                    'name' => 'Genap',
                    'code' => 'GNP',
                    'start_date' => ($startYear + 1) . '-01-08',
                    'end_date' => ($startYear + 1) . '-06-14',
                    'is_current' => $academicYear->is_current
                ]
            ];

            foreach ($semesters as $semester) {
                Semester::create($semester);
            }
        }
    }
}