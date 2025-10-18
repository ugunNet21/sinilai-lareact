<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\ClassRoom;
use App\Models\FinalGrade;
use App\Models\GradeComponent;
use App\Models\School;
use App\Models\Semester;
use App\Models\Student;
use App\Models\StudentGrade;
use App\Models\Subject;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FinalGradeSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createFinalGradesForSchool($school);
        }
    }

    private function createFinalGradesForSchool(School $school): void
    {
        $currentAcademicYear = AcademicYear::where('school_id', $school->id)
            ->where('is_current', true)
            ->first();

        if (!$currentAcademicYear) {
            return;
        }

        $semesters = Semester::where('academic_year_id', $currentAcademicYear->id)->get();
        $subjects = Subject::where('school_id', $school->id)->where('is_active', true)->get();
        $classRooms = ClassRoom::where('school_id', $school->id)
            ->where('academic_year_id', $currentAcademicYear->id)
            ->where('is_active', true)
            ->get();
        $gradeComponents = GradeComponent::where('school_id', $school->id)->where('is_active', true)->get();

        foreach ($semesters as $semester) {
            foreach ($classRooms as $classRoom) {
                $students = Student::where('school_id', $school->id)
                    ->where('status', 'ACTIVE')
                    ->limit(3) // Kurangi lagi untuk menghindari duplikasi
                    ->get();

                foreach ($students as $student) {
                    foreach ($subjects->take(2) as $subject) { // Batasi mata pelajaran
                        foreach ($gradeComponents->take(2) as $gradeComponent) { // Batasi komponen
                            $this->calculateFinalGrade(
                                $student,
                                $subject,
                                $classRoom,
                                $currentAcademicYear,
                                $semester,
                                $gradeComponent
                            );
                        }
                    }
                }
            }
        }
    }

    private function calculateFinalGrade(
        Student $student,
        Subject $subject,
        ClassRoom $classRoom,
        AcademicYear $academicYear,
        Semester $semester,
        GradeComponent $gradeComponent
    ): void {
        // Cek dulu apakah sudah ada data final grade
        $existingFinalGrade = FinalGrade::where('student_id', $student->id)
            ->where('subject_id', $subject->id)
            ->where('academic_year_id', $academicYear->id)
            ->where('semester_id', $semester->id)
            ->where('grade_component_id', $gradeComponent->id)
            ->first();

        if ($existingFinalGrade) {
            return; // Skip jika sudah ada
        }

        // Hitung rata-rata dari student_grades
        $averageScore = StudentGrade::where('student_id', $student->id)
            ->where('subject_id', $subject->id)
            ->where('class_id', $classRoom->id)
            ->where('academic_year_id', $academicYear->id)
            ->where('semester_id', $semester->id)
            ->where('grade_component_id', $gradeComponent->id)
            ->avg('score');

        // Pastikan ada data student_grades sebelum membuat final_grade
        $hasStudentGrades = StudentGrade::where('student_id', $student->id)
            ->where('subject_id', $subject->id)
            ->where('class_id', $classRoom->id)
            ->where('academic_year_id', $academicYear->id)
            ->where('semester_id', $semester->id)
            ->where('grade_component_id', $gradeComponent->id)
            ->exists();

        if (!$hasStudentGrades || !$averageScore) {
            return;
        }

        $finalScore = round($averageScore, 2);
        $gradeInfo = $this->calculateGradeLetterAndPoint($student->school_id, $finalScore);

        // Gunakan create dengan error handling
        try {
            FinalGrade::create([
                'student_id' => $student->id,
                'subject_id' => $subject->id,
                'class_id' => $classRoom->id,
                'academic_year_id' => $academicYear->id,
                'semester_id' => $semester->id,
                'grade_component_id' => $gradeComponent->id,
                'knowledge_score' => $gradeComponent->code === 'PENGETAHUAN' ? $finalScore : null,
                'skill_score' => $gradeComponent->code === 'KETERAMPILAN' ? $finalScore : null,
                'final_score' => $finalScore,
                'grade_letter' => $gradeInfo['letter'],
                'grade_point' => $gradeInfo['point'],
                'description' => "Nilai akhir {$gradeComponent->name} {$subject->name}",
            ]);
        } catch (\Exception $e) {
            // Log error dan continue
            echo "Error creating final grade for student {$student->id}, subject {$subject->id}: " . $e->getMessage() . "\n";
        }
    }

    private function calculateGradeLetterAndPoint(string $schoolId, float $score): array
    {
        $gradeScale = \App\Models\GradeScale::where('school_id', $schoolId)
            ->where('min_score', '<=', $score)
            ->where('max_score', '>=', $score)
            ->first();

        return [
            'letter' => $gradeScale?->grade_letter ?? 'E',
            'point' => $gradeScale?->grade_point ?? 0.00,
        ];
    }
}