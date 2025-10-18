<?php

namespace Database\Seeders;

use App\Models\Curriculum;
use App\Models\CurriculumSubject;
use App\Models\GradeLevel;
use App\Models\School;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class CurriculumSubjectSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createCurriculumSubjectsForSchool($school);
        }
    }

    private function createCurriculumSubjectsForSchool(School $school): void
    {
        $curricula = Curriculum::where('school_id', $school->id)->get();
        $subjects = Subject::where('school_id', $school->id)->get();
        $gradeLevels = GradeLevel::where('school_id', $school->id)->get();

        foreach ($curricula as $curriculum) {
            foreach ($gradeLevels as $gradeLevel) {
                $orderIndex = 1;
                
                foreach ($subjects as $subject) {
                    // Tentukan apakah mata pelajaran wajib berdasarkan level
                    $isCompulsory = $this->isCompulsorySubject($subject, $gradeLevel, $school->level);
                    
                    // Tentukan jam per minggu
                    $hoursPerWeek = $this->getHoursPerWeek($subject, $gradeLevel);

                    CurriculumSubject::updateOrCreate(
                        [
                            'curriculum_id' => $curriculum->id,
                            'subject_id' => $subject->id,
                            'grade_level_id' => $gradeLevel->id
                        ],
                        [
                            'is_compulsory' => $isCompulsory,
                            'hours_per_week' => $hoursPerWeek,
                            'order_index' => $orderIndex++
                        ]
                    );
                }
            }
        }
    }

    private function isCompulsorySubject(Subject $subject, GradeLevel $gradeLevel, string $schoolLevel): bool
    {
        $compulsorySubjects = ['MTK', 'BIN', 'BIG', 'PKN', 'PJOK', 'AGM'];
        
        if (in_array($subject->code, $compulsorySubjects)) {
            return true;
        }

        // Untuk SMA, mata pelajaran keahlian hanya untuk kelas 11-12
        if ($schoolLevel === 'SMA' && in_array($subject->code, ['FIS', 'KIM', 'BIO'])) {
            return $gradeLevel->level >= 11;
        }

        return false;
    }

    private function getHoursPerWeek(Subject $subject, GradeLevel $gradeLevel): int
    {
        $baseHours = match($subject->code) {
            'MTK', 'BIN', 'BIG' => 4,
            'PKN', 'AGM', 'PJOK' => 2,
            'FIS', 'KIM', 'BIO' => ($gradeLevel->level >= 11) ? 4 : 0,
            'IPA', 'IPS' => 3,
            default => 2
        };

        return $baseHours;
    }
}