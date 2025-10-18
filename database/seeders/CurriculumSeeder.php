<?php

namespace Database\Seeders;

use App\Models\Curriculum;
use App\Models\School;
use Illuminate\Database\Seeder;

class CurriculumSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createCurriculaForSchool($school);
        }
    }

    private function createCurriculaForSchool(School $school): void
    {
        $curricula = [
            [
                'code' => 'K13',
                'name' => 'Kurikulum 2013',
                'version' => 'Revisi 2022',
                'description' => 'Kurikulum 2013 dengan pendekatan saintifik',
                'implementation_date' => '2022-07-01',
                'is_active' => true,
            ],
            [
                'code' => 'KM',
                'name' => 'Kurikulum Merdeka',
                'version' => 'Fase E',
                'description' => 'Kurikulum Merdeka dengan pembelajaran berdiferensiasi',
                'implementation_date' => '2024-07-01',
                'is_active' => true,
            ]
        ];

        foreach ($curricula as $curriculum) {
            Curriculum::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'code' => $curriculum['code']
                ],
                $curriculum
            );
        }
    }
}