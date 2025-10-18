<?php

namespace Database\Seeders;

use App\Models\AssessmentType;
use App\Models\School;
use Illuminate\Database\Seeder;

class AssessmentTypeSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createAssessmentTypesForSchool($school);
        }
    }

    private function createAssessmentTypesForSchool(School $school): void
    {
        $assessmentTypes = [
            [
                'name' => 'Penilaian Harian',
                'code' => 'PH',
                'weight' => 20.00,
                'description' => 'Penilaian untuk setiap pertemuan atau subbab',
                'order_index' => 1
            ],
            [
                'name' => 'Tugas',
                'code' => 'TGS',
                'weight' => 15.00,
                'description' => 'Penilaian tugas individu atau kelompok',
                'order_index' => 2
            ],
            [
                'name' => 'Ulangan Tengah Semester',
                'code' => 'UTS',
                'weight' => 25.00,
                'description' => 'Penilaian di pertengahan semester',
                'order_index' => 3
            ],
            [
                'name' => 'Ulangan Akhir Semester',
                'code' => 'UAS',
                'weight' => 30.00,
                'description' => 'Penilaian di akhir semester',
                'order_index' => 4
            ],
            [
                'name' => 'Proyek',
                'code' => 'PRY',
                'weight' => 10.00,
                'description' => 'Penilaian proyek atau praktikum',
                'order_index' => 5
            ]
        ];

        foreach ($assessmentTypes as $type) {
            AssessmentType::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'code' => $type['code']
                ],
                array_merge($type, ['is_active' => true])
            );
        }
    }
}