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
        Schema::create('import_export_history', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('school_id')->constrained('schools')->onDelete('cascade');
            $table->enum('type', ['IMPORT', 'EXPORT']);
            $table->string('entity_type', 50);
            $table->string('file_name', 255);
            $table->string('file_path', 500)->nullable();
            $table->integer('total_records')->default(0);
            $table->integer('success_count')->default(0);
            $table->integer('error_count')->default(0);
            $table->enum('status', ['PROCESSING', 'COMPLETED', 'FAILED'])->default('PROCESSING');
            $table->jsonb('errors')->default('[]');
            $table->foreignUuid('performed_by')->constrained('teachers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_export_history');
    }
};
