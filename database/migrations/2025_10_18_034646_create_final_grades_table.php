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
        Schema::create('final_grades', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained('students')->onDelete('cascade');
            $table->foreignUuid('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->foreignUuid('class_id')->constrained('classes')->onDelete('cascade');
            $table->foreignUuid('academic_year_id')->constrained('academic_years')->onDelete('cascade');
            $table->foreignUuid('semester_id')->constrained('semesters')->onDelete('cascade');
            $table->foreignUuid('grade_component_id')->constrained('grade_components')->onDelete('cascade');
            $table->decimal('knowledge_score', 5, 2)->nullable();
            $table->decimal('skill_score', 5, 2)->nullable();
            $table->decimal('final_score', 5, 2)->nullable();
            $table->string('grade_letter', 5)->nullable();
            $table->decimal('grade_point', 3, 2)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique(['student_id', 'subject_id', 'academic_year_id', 'semester_id', 'grade_component_id'], 'final_grade_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('final_grades');
    }
};
