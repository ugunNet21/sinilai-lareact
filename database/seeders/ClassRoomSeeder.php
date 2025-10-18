<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassRoom;
use App\Models\GradeLevel;
use App\Models\School;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class ClassRoomSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createClassRoomsForSchool($school);
        }
    }

    private function createClassRoomsForSchool(School $school): void
    {
        $currentAcademicYear = AcademicYear::where('school_id', $school->id)
            ->where('is_current', true)
            ->first();

        if (!$currentAcademicYear) {
            return;
        }

        $gradeLevels = GradeLevel::where('school_id', $school->id)->get();
        $teachers = Teacher::where('school_id', $school->id)
            ->where('teacher_type', 'GURU')
            ->where('status', 'ACTIVE')
            ->get();

        foreach ($gradeLevels as $gradeLevel) {
            $classCount = match($school->level) {
                'SMA' => 4, // 4 kelas per tingkat
                'SMP' => 5, // 5 kelas per tingkat
                default => 3  // 3 kelas per tingkat
            };

            for ($i = 1; $i <= $classCount; $i++) {
                $className = $gradeLevel->name . ' ' . $this->getRomanNumeral($i);
                $classCode = $gradeLevel->level . '-' . $i;

                $homeroomTeacher = $teachers->shift(); // Ambil guru untuk wali kelas

                ClassRoom::updateOrCreate(
                    [
                        'school_id' => $school->id,
                        'academic_year_id' => $currentAcademicYear->id,
                        'code' => $classCode
                    ],
                    [
                        'grade_level_id' => $gradeLevel->id,
                        'name' => $className,
                        'capacity' => 36,
                        'homeroom_teacher_id' => $homeroomTeacher?->id,
                        'is_active' => true,
                        'description' => 'Kelas ' . $className . ' Tahun Ajaran ' . $currentAcademicYear->year
                    ]
                );
            }
        }
    }

    private function getRomanNumeral(int $number): string
    {
        $romans = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
        return $romans[$number] ?? (string) $number;
    }
}