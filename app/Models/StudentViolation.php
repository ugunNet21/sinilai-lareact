<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentViolation extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'student_id',
        'violation_id',
        'academic_year_id',
        'semester_id',
        'violation_date',
        'description',
        'point',
        'recorded_by',
    ];

    protected $casts = [
        'violation_date' => 'date',
        'point' => 'integer',
        'created_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function violation()
    {
        return $this->belongsTo(Violation::class);
    }

    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function recordedBy()
    {
        return $this->belongsTo(Teacher::class, 'recorded_by');
    }
}
