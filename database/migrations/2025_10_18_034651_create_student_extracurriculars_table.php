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
        Schema::create('student_extracurriculars', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('extracurricular_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('academic_year_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('semester_id')->constrained()->onDelete('cascade');
            $table->string('position', 100)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->unique(['student_id', 'extracurricular_id', 'academic_year_id', 'semester_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_extracurriculars');
    }
};
