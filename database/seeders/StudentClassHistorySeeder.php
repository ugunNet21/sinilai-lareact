<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassRoom;
use App\Models\School;
use App\Models\Semester;
use App\Models\Student;
use App\Models\StudentClassHistory;
use Illuminate\Database\Seeder;

class StudentClassHistorySeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createStudentClassHistoryForSchool($school);
        }
    }

    private function createStudentClassHistoryForSchool(School $school): void
    {
        $currentAcademicYear = AcademicYear::where('school_id', $school->id)
            ->where('is_current', true)
            ->first();

        if (!$currentAcademicYear) {
            return;
        }

        $semesters = Semester::where('academic_year_id', $currentAcademicYear->id)->get();
        $students = Student::where('school_id', $school->id)
            ->where('status', 'ACTIVE')
            ->get();
        $classRooms = ClassRoom::where('school_id', $school->id)
            ->where('academic_year_id', $currentAcademicYear->id)
            ->get();

        if ($classRooms->isEmpty() || $students->isEmpty()) {
            return;
        }

        foreach ($semesters as $semester) {
            $studentChunks = $students->chunk(ceil($students->count() / $classRooms->count()));
            $studentNumber = 1;

            foreach ($classRooms as $index => $classRoom) {
                $classStudents = $studentChunks[$index] ?? collect();
                
                foreach ($classStudents as $student) {
                    StudentClassHistory::updateOrCreate(
                        [
                            'student_id' => $student->id,
                            'academic_year_id' => $currentAcademicYear->id,
                            'semester_id' => $semester->id
                        ],
                        [
                            'class_id' => $classRoom->id,
                            'student_number' => $studentNumber++,
                            'status' => 'ACTIVE'
                        ]
                    );
                }
                
                $studentNumber = 1; // Reset untuk kelas berikutnya
            }
        }
    }
}