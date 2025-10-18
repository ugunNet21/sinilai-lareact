<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            UserSeeder::class,
            SchoolSeeder::class,
            AcademicYearSeeder::class,
            SemesterSeeder::class,
            GradeLevelSeeder::class,
            SubjectSeeder::class,
            CurriculumSeeder::class,
            TeacherSeeder::class,
            ClassRoomSeeder::class,
            CurriculumSubjectSeeder::class,
            StudentSeeder::class,
            StudentClassHistorySeeder::class,
            TeachingAssignmentSeeder::class,
            AssessmentTypeSeeder::class,
            GradeComponentSeeder::class,
            GradeScaleSeeder::class,
            StudentGradeSeeder::class,
            FinalGradeSeeder::class,
            AttendanceSeeder::class,
        ]);
    }
}
