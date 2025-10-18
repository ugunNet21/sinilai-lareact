<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalGrade extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'student_id',
        'subject_id',
        'class_id',
        'academic_year_id',
        'semester_id',
        'grade_component_id',
        'knowledge_score',
        'skill_score',
        'final_score',
        'grade_letter',
        'grade_point',
        'description',
    ];

    protected $casts = [
        'knowledge_score' => 'decimal:2',
        'skill_score' => 'decimal:2',
        'final_score' => 'decimal:2',
        'grade_point' => 'decimal:2',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function class()
    {
        return $this->belongsTo(ClassRoom::class, 'class_id');
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function gradeComponent()
    {
        return $this->belongsTo(GradeComponent::class);
    }
}
