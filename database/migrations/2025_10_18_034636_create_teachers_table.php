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
        Schema::create('teachers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('school_id')->constrained('schools')->onDelete('cascade');
            $table->string('nip', 50)->nullable();
            $table->string('name', 255);
            $table->string('email', 255)->nullable();
            $table->string('phone', 20)->nullable();
            $table->enum('gender', ['L', 'P'])->nullable();
            $table->string('birth_place', 100)->nullable();
            $table->date('birth_date')->nullable();
            $table->text('address')->nullable();
            $table->string('photo_url', 500)->nullable();
            $table->date('hire_date')->nullable();
            $table->enum('status', ['ACTIVE', 'INACTIVE', 'RETIRED'])->default('ACTIVE');
            $table->enum('teacher_type', ['GURU', 'TU', 'KEPALA_SEKOLAH', 'WAKIL_KEPALA_SEKOLAH'])->nullable();
            $table->timestamps();

            $table->unique(['school_id', 'nip']);
            $table->index('school_id');
            $table->index('nip');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
