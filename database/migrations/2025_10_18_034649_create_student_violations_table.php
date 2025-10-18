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
        Schema::create('student_violations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('violation_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('academic_year_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('semester_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('recorded_by')->constrained('teachers')->onDelete('cascade');
            $table->date('violation_date');
            $table->text('description')->nullable();
            $table->integer('point');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_violations');
    }
};
