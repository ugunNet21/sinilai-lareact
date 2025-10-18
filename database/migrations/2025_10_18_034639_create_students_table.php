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
        Schema::create('students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('school_id')->constrained('schools')->onDelete('cascade');
            $table->string('nis', 50);
            $table->string('nisn', 50)->nullable();
            $table->string('name', 255);
            $table->string('email', 255)->nullable();
            $table->string('phone', 20)->nullable();
            $table->enum('gender', ['L', 'P'])->nullable();
            $table->string('birth_place', 100)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('religion', 20)->nullable();
            $table->text('address')->nullable();
            $table->string('photo_url', 500)->nullable();
            $table->string('father_name', 255)->nullable();
            $table->string('mother_name', 255)->nullable();
            $table->string('parent_phone', 20)->nullable();
            $table->date('enrollment_date')->nullable();
            $table->enum('status', ['ACTIVE', 'GRADUATED', 'TRANSFERRED', 'DROPOUT', 'INACTIVE'])->default('ACTIVE');
            $table->timestamps();
            
            $table->unique(['school_id', 'nis']);
            $table->index('school_id');
            $table->index('nis');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
