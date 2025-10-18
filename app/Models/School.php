<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'code',
        'level',
        'type',
        'address',
        'phone',
        'email',
        'website',
        'logo_url',
        'academic_year',
        'timezone',
        'is_active',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'settings' => 'array',
    ];

    public function academicYears()
    {
        return $this->hasMany(AcademicYear::class);
    }

    public function gradeLevels()
    {
        return $this->hasMany(GradeLevel::class);
    }

    public function classes()
    {
        return $this->hasMany(ClassRoom::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function curricula()
    {
        return $this->hasMany(Curriculum::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function assessmentTypes()
    {
        return $this->hasMany(AssessmentType::class);
    }

    public function gradeComponents()
    {
        return $this->hasMany(GradeComponent::class);
    }

    public function gradeScales()
    {
        return $this->hasMany(GradeScale::class);
    }

    public function violations()
    {
        return $this->hasMany(Violation::class);
    }

    public function extracurriculars()
    {
        return $this->hasMany(Extracurricular::class);
    }
}
