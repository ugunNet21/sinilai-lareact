<?php

namespace Database\Seeders;

use App\Models\GradeComponent;
use App\Models\School;
use Illuminate\Database\Seeder;

class GradeComponentSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createGradeComponentsForSchool($school);
        }
    }

    private function createGradeComponentsForSchool(School $school): void
    {
        $gradeComponents = [
            [
                'name' => 'Pengetahuan',
                'code' => 'PENGETAHUAN',
                'description' => 'Komponen penilaian aspek pengetahuan',
                'order_index' => 1
            ],
            [
                'name' => 'Keterampilan',
                'code' => 'KETERAMPILAN',
                'description' => 'Komponen penilaian aspek keterampilan',
                'order_index' => 2
            ],
            [
                'name' => 'Sikap Spiritual',
                'code' => 'SIKAP_SPIRITUAL',
                'description' => 'Komponen penilaian aspek sikap spiritual',
                'order_index' => 3
            ],
            [
                'name' => 'Sikap Sosial',
                'code' => 'SIKAP_SOSIAL',
                'description' => 'Komponen penilaian aspek sikap sosial',
                'order_index' => 4
            ],
            [
                'name' => 'Proyek Penguatan Profil',
                'code' => 'P5',
                'description' => 'Komponen penilaian proyek penguatan profil pelajar Pancasila',
                'order_index' => 5
            ]
        ];

        foreach ($gradeComponents as $component) {
            GradeComponent::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'code' => $component['code']
                ],
                array_merge($component, ['is_active' => true])
            );
        }
    }
}