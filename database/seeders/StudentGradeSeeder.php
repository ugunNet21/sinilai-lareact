<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\AssessmentType;
use App\Models\ClassRoom;
use App\Models\GradeComponent;
use App\Models\GradeScale;
use App\Models\School;
use App\Models\Semester;
use App\Models\Student;
use App\Models\StudentGrade;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class StudentGradeSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createStudentGradesForSchool($school);
        }
    }

    private function createStudentGradesForSchool(School $school): void
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
        $assessmentTypes = AssessmentType::where('school_id', $school->id)->where('is_active', true)->get();
        $gradeComponents = GradeComponent::where('school_id', $school->id)->where('is_active', true)->get();
        $teachers = Teacher::where('school_id', $school->id)->where('status', 'ACTIVE')->get();

        foreach ($semesters as $semester) {
            foreach ($classRooms as $classRoom) {
                $students = Student::where('school_id', $school->id)
                    ->where('status', 'ACTIVE')
                    ->limit(5) // Kurangi dari 10 ke 5 untuk performa
                    ->get();

                foreach ($students as $student) {
                    foreach ($subjects->take(3) as $subject) { // Batasi mata pelajaran
                        foreach ($assessmentTypes->take(2) as $assessmentType) { // Batasi jenis assessment
                            foreach ($gradeComponents->take(2) as $gradeComponent) { // Batasi komponen
                                if ($this->isRelevantCombination($gradeComponent, $assessmentType)) {
                                    $this->createGradeRecord(
                                        $student,
                                        $subject,
                                        $classRoom,
                                        $assessmentType,
                                        $gradeComponent,
                                        $currentAcademicYear,
                                        $semester,
                                        $teachers->random()
                                    );
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    private function isRelevantCombination(GradeComponent $gradeComponent, AssessmentType $assessmentType): bool
    {
        // Pengetahuan bisa dari semua jenis assessment
        if ($gradeComponent->code === 'PENGETAHUAN') {
            return true;
        }

        // Keterampilan hanya dari TGS, PRY, UAS
        if ($gradeComponent->code === 'KETERAMPILAN') {
            return in_array($assessmentType->code, ['TGS', 'PRY', 'UAS']);
        }

        // Sikap hanya dari observasi harian
        if (in_array($gradeComponent->code, ['SIKAP_SPIRITUAL', 'SIKAP_SOSIAL'])) {
            return $assessmentType->code === 'PH';
        }

        // P5 hanya dari proyek
        if ($gradeComponent->code === 'P5') {
            return $assessmentType->code === 'PRY';
        }

        return false;
    }

    private function createGradeRecord(
        Student $student,
        Subject $subject,
        ClassRoom $classRoom,
        AssessmentType $assessmentType,
        GradeComponent $gradeComponent,
        AcademicYear $academicYear,
        Semester $semester,
        Teacher $teacher
    ): void {
        $score = $this->generateRealisticScore($assessmentType, $gradeComponent);
        $maxScore = 100;
        
        // Perbaikan: Gunakan query langsung instead of method yang tidak ada
        $gradeScale = GradeScale::where('school_id', $student->school_id)
            ->where('min_score', '<=', $score)
            ->where('max_score', '>=', $score)
            ->first();

        StudentGrade::updateOrCreate(
            [
                'student_id' => $student->id,
                'subject_id' => $subject->id,
                'class_id' => $classRoom->id,
                'assessment_type_id' => $assessmentType->id,
                'grade_component_id' => $gradeComponent->id,
                'academic_year_id' => $academicYear->id,
                'semester_id' => $semester->id,
            ],
            [
                'score' => $score,
                'max_score' => $maxScore,
                'grade_scale_id' => $gradeScale?->id,
                'description' => "Nilai {$assessmentType->name} {$subject->name}",
                'assessment_date' => $this->getAssessmentDate($semester, $assessmentType),
                'recorded_by' => $teacher->id,
            ]
        );
    }

    private function generateRealisticScore(AssessmentType $assessmentType, GradeComponent $gradeComponent): float
    {
        $baseScore = match($assessmentType->code) {
            'PH' => rand(65, 95),
            'TGS' => rand(70, 98),
            'UTS' => rand(60, 90),
            'UAS' => rand(65, 92),
            'PRY' => rand(75, 100),
            default => rand(70, 90)
        };

        // Adjust untuk komponen tertentu
        if ($gradeComponent->code === 'SIKAP_SPIRITUAL' || $gradeComponent->code === 'SIKAP_SOSIAL') {
            $baseScore = rand(80, 100);
        }

        if ($gradeComponent->code === 'P5') {
            $baseScore = rand(85, 100);
        }

        return (float) $baseScore;
    }

    private function getAssessmentDate(Semester $semester, AssessmentType $assessmentType): string
    {
        $startDate = $semester->start_date;
        $endDate = $semester->end_date;

        return match($assessmentType->code) {
            'PH' => date('Y-m-d', strtotime($startDate . ' +' . rand(1, 30) . ' days')),
            'TGS' => date('Y-m-d', strtotime($startDate . ' +' . rand(15, 45) . ' days')),
            'UTS' => date('Y-m-d', strtotime($startDate . ' +' . rand(60, 75) . ' days')),
            'UAS' => date('Y-m-d', strtotime($endDate . ' -' . rand(5, 15) . ' days')),
            'PRY' => date('Y-m-d', strtotime($startDate . ' +' . rand(40, 80) . ' days')),
            default => $startDate
        };
    }
}