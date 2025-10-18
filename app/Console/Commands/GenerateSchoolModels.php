<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class GenerateSchoolModels extends Command
{
    protected $signature = 'generate:school-models';
    protected $description = 'Generate all school-related models and migrations in correct order';

    public function handle()
    {
        $this->info('⏳ Generating models and migrations...');

        // Daftar model & urutan
        $steps = [
            // 1. TABEL UTAMA
            ['School', '-m'],
            ['AcademicYear', '-m'],
            ['Semester', '-m'],

            // 2. TABEL AKADEMIK DASAR
            ['GradeLevel', '-m'],
            ['Subject', '-m'],
            ['Curriculum', '-m'],

            // 3. TABEL USER
            ['Teacher', '-m'],

            // 4. TABEL AKADEMIK LANJUTAN
            ['ClassRoom', '-m'],
            ['CurriculumSubject', '-m'],

            // 5. TABEL SISWA
            ['Student', '-m'],
            ['StudentClassHistory', '-m'],

            // 6. TABEL PENUGASAN
            ['TeachingAssignment', '-m'],

            // 7. TABEL NILAI & ASSESSMENT
            ['AssessmentType', '-m'],
            ['GradeComponent', '-m'],
            ['GradeScale', '-m'],
            ['StudentGrade', '-m'],
            ['FinalGrade', '-m'],

            // 8. TABEL FITUR LANJUTAN
            ['Attendance', '-m'],
            ['Violation', '-m'],
            ['StudentViolation', '-m'],
            ['Extracurricular', '-m'],
            ['StudentExtracurricular', '-m'],

            // 9. TABEL SISTEM
            ['ImportExportHistory', '-m'],
            ['SystemLog', '-m'],
        ];

        $delayInSeconds = 1; // Jeda 1 detik antara setiap migration

        foreach ($steps as $index => [$model, $option]) {
            $this->info("🔧 Making model: $model");
            Artisan::call("make:model {$model} {$option}");
            $this->line(Artisan::output());

            // jeda kecuali untuk elemen terakhir
            if ($index < count($steps) - 1) {
                $this->info("⏳ Waiting {$delayInSeconds} second...");
                sleep($delayInSeconds);
            }
        }

        $this->info('✅ All models and migrations generated successfully.');
        return Command::SUCCESS;
    }
}