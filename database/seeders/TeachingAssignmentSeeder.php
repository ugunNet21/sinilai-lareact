<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassRoom;
use App\Models\School;
use App\Models\Semester;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\TeachingAssignment;
use Illuminate\Database\Seeder;

class TeachingAssignmentSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createTeachingAssignmentsForSchool($school);
        }
    }

    private function createTeachingAssignmentsForSchool(School $school): void
    {
        $currentAcademicYear = AcademicYear::where('school_id', $school->id)
            ->where('is_current', true)
            ->first();

        if (!$currentAcademicYear) {
            return;
        }

        $semesters = Semester::where('academic_year_id', $currentAcademicYear->id)->get();
        $teachers = Teacher::where('school_id', $school->id)
            ->where('status', 'ACTIVE')
            ->where('teacher_type', 'GURU')
            ->get();
        $subjects = Subject::where('school_id', $school->id)
            ->where('is_active', true)
            ->get();
        $classRooms = ClassRoom::where('school_id', $school->id)
            ->where('academic_year_id', $currentAcademicYear->id)
            ->where('is_active', true)
            ->get();

        if ($teachers->isEmpty() || $subjects->isEmpty() || $classRooms->isEmpty()) {
            return;
        }

        foreach ($semesters as $semester) {
            foreach ($classRooms as $classRoom) {
                $assignedSubjects = collect();
                
                foreach ($subjects as $subject) {
                    // Cari guru yang sesuai dengan mata pelajaran
                    $teacher = $this->findTeacherForSubject($teachers, $subject, $assignedSubjects);
                    
                    if ($teacher) {
                        TeachingAssignment::updateOrCreate(
                            [
                                'teacher_id' => $teacher->id,
                                'subject_id' => $subject->id,
                                'class_id' => $classRoom->id,
                                'academic_year_id' => $currentAcademicYear->id,
                                'semester_id' => $semester->id
                            ],
                            [
                                'hours_per_week' => $this->getHoursPerWeek($subject),
                                'is_homeroom' => $classRoom->homeroom_teacher_id === $teacher->id
                            ]
                        );
                        
                        $assignedSubjects->push($subject->id);
                    }
                }
            }
        }
    }

    private function findTeacherForSubject($teachers, $subject, $assignedSubjects)
    {
        // Prioritaskan guru yang belum banyak mengajar
        $availableTeachers = $teachers->filter(function($teacher) use ($assignedSubjects, $subject) {
            // Logika sederhana: guru bisa mengajar maksimal 3 mata pelajaran berbeda
            $teachingCount = TeachingAssignment::where('teacher_id', $teacher->id)
                ->whereIn('subject_id', $assignedSubjects->toArray())
                ->count();
                
            return $teachingCount < 3;
        });

        return $availableTeachers->isNotEmpty() ? $availableTeachers->random() : $teachers->random();
    }

    private function getHoursPerWeek(Subject $subject): int
    {
        return match($subject->code) {
            'MTK', 'BIN', 'BIG' => 4,
            'FIS', 'KIM', 'BIO' => 4,
            'IPA', 'IPS' => 3,
            default => 2
        };
    }
}