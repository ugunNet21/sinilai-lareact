<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'school_id',
        'nip',
        'name',
        'email',
        'phone',
        'gender',
        'birth_place',
        'birth_date',
        'address',
        'photo_url',
        'hire_date',
        'status',
        'teacher_type',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'hire_date' => 'date',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function homeroomClassRoom()
    {
        return $this->hasMany(ClassRoom::class, 'homeroom_teacher_id');
    }

    public function teachingAssignments()
    {
        return $this->hasMany(TeachingAssignment::class);
    }

    public function recordedGrades()
    {
        return $this->hasMany(StudentGrade::class, 'recorded_by');
    }

    public function recordedAttendances()
    {
        return $this->hasMany(Attendance::class, 'recorded_by');
    }

    public function recordedViolations()
    {
        return $this->hasMany(StudentViolation::class, 'recorded_by');
    }

    public function coachedExtracurriculars()
    {
        return $this->hasMany(Extracurricular::class, 'coach_id');
    }
}
