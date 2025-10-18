<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentGrade extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'student_id',
        'subject_id',
        'class_id',
        'assessment_type_id',
        'grade_component_id',
        'academic_year_id',
        'semester_id',
        'score',
        'max_score',
        'grade_scale_id',
        'description',
        'assessment_date',
        'recorded_by',
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'max_score' => 'decimal:2',
        'assessment_date' => 'date',
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

    public function assessmentType()
    {
        return $this->belongsTo(AssessmentType::class);
    }

    public function gradeComponent()
    {
        return $this->belongsTo(GradeComponent::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function gradeScale()
    {
        return $this->belongsTo(GradeScale::class);
    }

    public function recordedBy()
    {
        return $this->belongsTo(Teacher::class, 'recorded_by');
    }
}
