<?php

namespace Database\Seeders;

use App\Models\GradeLevel;
use App\Models\School;
use Illuminate\Database\Seeder;

class GradeLevelSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createGradeLevelsForSchool($school);
        }
    }

    private function createGradeLevelsForSchool(School $school): void
    {
        $gradeLevels = match($school->level) {
            'SMA' => [
                ['name' => 'Kelas 10', 'level' => 10, 'order_index' => 1, 'description' => 'Tingkat 1 SMA'],
                ['name' => 'Kelas 11', 'level' => 11, 'order_index' => 2, 'description' => 'Tingkat 2 SMA'],
                ['name' => 'Kelas 12', 'level' => 12, 'order_index' => 3, 'description' => 'Tingkat 3 SMA'],
            ],
            'SMP' => [
                ['name' => 'Kelas 7', 'level' => 7, 'order_index' => 1, 'description' => 'Tingkat 1 SMP'],
                ['name' => 'Kelas 8', 'level' => 8, 'order_index' => 2, 'description' => 'Tingkat 2 SMP'],
                ['name' => 'Kelas 9', 'level' => 9, 'order_index' => 3, 'description' => 'Tingkat 3 SMP'],
            ],
            'SD' => [
                ['name' => 'Kelas 1', 'level' => 1, 'order_index' => 1, 'description' => 'Tingkat 1 SD'],
                ['name' => 'Kelas 2', 'level' => 2, 'order_index' => 2, 'description' => 'Tingkat 2 SD'],
                ['name' => 'Kelas 3', 'level' => 3, 'order_index' => 3, 'description' => 'Tingkat 3 SD'],
                ['name' => 'Kelas 4', 'level' => 4, 'order_index' => 4, 'description' => 'Tingkat 4 SD'],
                ['name' => 'Kelas 5', 'level' => 5, 'order_index' => 5, 'description' => 'Tingkat 5 SD'],
                ['name' => 'Kelas 6', 'level' => 6, 'order_index' => 6, 'description' => 'Tingkat 6 SD'],
            ],
            default => [
                ['name' => 'Tingkat 1', 'level' => 1, 'order_index' => 1, 'description' => 'Tingkat 1'],
                ['name' => 'Tingkat 2', 'level' => 2, 'order_index' => 2, 'description' => 'Tingkat 2'],
                ['name' => 'Tingkat 3', 'level' => 3, 'order_index' => 3, 'description' => 'Tingkat 3'],
            ]
        };

        foreach ($gradeLevels as $gradeLevel) {
            GradeLevel::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'name' => $gradeLevel['name']
                ],
                $gradeLevel
            );
        }
    }
}