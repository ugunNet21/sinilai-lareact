<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'school_id',
        'nis',
        'nisn',
        'name',
        'email',
        'phone',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'address',
        'photo_url',
        'father_name',
        'mother_name',
        'parent_phone',
        'enrollment_date',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'enrollment_date' => 'date',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function classHistories()
    {
        return $this->hasMany(StudentClassHistory::class);
    }

    public function grades()
    {
        return $this->hasMany(StudentGrade::class);
    }

    public function finalGrades()
    {
        return $this->hasMany(FinalGrade::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function violations()
    {
        return $this->hasMany(StudentViolation::class);
    }

    public function extracurriculars()
    {
        return $this->hasMany(StudentExtracurricular::class);
    }
}
