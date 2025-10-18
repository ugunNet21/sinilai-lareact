<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_grades', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignUuid('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->foreignUuid('class_id')->constrained('class_rooms')->onDelete('cascade');
            $table->foreignUuid('assessment_type_id')->constrained('assessment_types')->onDelete('cascade');
            $table->foreignUuid('grade_component_id')->constrained('grade_components')->onDelete('cascade');
            $table->foreignUuid('academic_year_id')->constrained('academic_years')->onDelete('cascade');
            $table->foreignUuid('semester_id')->constrained('semesters')->onDelete('cascade');
            $table->decimal('score', 5, 2);
            $table->decimal('max_score', 5, 2)->default(100);
            $table->foreignUuid('grade_scale_id')->nullable()->constrained('grade_scales')->onDelete('set null');
            $table->text('description')->nullable();
            $table->date('assessment_date');
            $table->foreignUuid('recorded_by')->constrained('teachers')->onDelete('cascade');
            $table->timestamps();
            
            $table->index('student_id');
            $table->index('subject_id');
            $table->index('class_id');
            $table->index('academic_year_id');
            $table->index('semester_id');
            
            // DB::statement('ALTER TABLE student_grades ADD CONSTRAINT check_score_range CHECK (score >= 0 AND score <= 100)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_grades');
    }
};
