<?php

namespace Database\Seeders;

use App\Models\GradeScale;
use App\Models\School;
use Illuminate\Database\Seeder;

class GradeScaleSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createGradeScalesForSchool($school);
        }
    }

    private function createGradeScalesForSchool(School $school): void
    {
        $gradeScales = [
            // Skala 0-100 (Kurikulum 2013)
            [
                'name' => 'Sangat Baik',
                'min_score' => 85.00,
                'max_score' => 100.00,
                'grade_letter' => 'A',
                'grade_point' => 4.00,
                'description' => 'Sangat Baik',
                'color' => 'success',
                'is_passing' => true
            ],
            [
                'name' => 'Baik',
                'min_score' => 75.00,
                'max_score' => 84.99,
                'grade_letter' => 'B',
                'grade_point' => 3.00,
                'description' => 'Baik',
                'color' => 'primary',
                'is_passing' => true
            ],
            [
                'name' => 'Cukup',
                'min_score' => 65.00,
                'max_score' => 74.99,
                'grade_letter' => 'C',
                'grade_point' => 2.00,
                'description' => 'Cukup',
                'color' => 'warning',
                'is_passing' => true
            ],
            [
                'name' => 'Kurang',
                'min_score' => 55.00,
                'max_score' => 64.99,
                'grade_letter' => 'D',
                'grade_point' => 1.00,
                'description' => 'Kurang',
                'color' => 'orange',
                'is_passing' => false
            ],
            [
                'name' => 'Sangat Kurang',
                'min_score' => 0.00,
                'max_score' => 54.99,
                'grade_letter' => 'E',
                'grade_point' => 0.00,
                'description' => 'Sangat Kurang',
                'color' => 'danger',
                'is_passing' => false
            ]
        ];

        // Untuk sekolah tertentu, buat skala alternatif
        if ($school->level === 'SMK') {
            $gradeScales = $this->getVocationalGradeScales();
        }

        foreach ($gradeScales as $scale) {
            GradeScale::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'min_score' => $scale['min_score'],
                    'max_score' => $scale['max_score']
                ],
                $scale
            );
        }
    }

    private function getVocationalGradeScales(): array
    {
        return [
            [
                'name' => 'Kompeten dengan Istimewa',
                'min_score' => 90.00,
                'max_score' => 100.00,
                'grade_letter' => 'A',
                'grade_point' => 4.00,
                'description' => 'Sangat Kompeten',
                'color' => 'success',
                'is_passing' => true
            ],
            [
                'name' => 'Kompeten',
                'min_score' => 75.00,
                'max_score' => 89.99,
                'grade_letter' => 'B',
                'grade_point' => 3.00,
                'description' => 'Kompeten',
                'color' => 'primary',
                'is_passing' => true
            ],
            [
                'name' => 'Cukup Kompeten',
                'min_score' => 60.00,
                'max_score' => 74.99,
                'grade_letter' => 'C',
                'grade_point' => 2.00,
                'description' => 'Cukup Kompeten',
                'color' => 'warning',
                'is_passing' => true
            ],
            [
                'name' => 'Belum Kompeten',
                'min_score' => 0.00,
                'max_score' => 59.99,
                'grade_letter' => 'D',
                'grade_point' => 1.00,
                'description' => 'Belum Kompeten',
                'color' => 'danger',
                'is_passing' => false
            ]
        ];
    }
}