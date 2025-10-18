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

    protected $appends = ['average_grade', 'total_grades'];

    // Relationships
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

    // Computed Attributes
    
    /**
     * Get current class for the student
     */
    public function getCurrentClassAttribute()
    {
        return $this->classHistories()
            ->with(['class.gradeLevel', 'academicYear', 'semester'])
            ->whereHas('academicYear', function ($query) {
                $query->where('is_current', true);
            })
            ->whereHas('semester', function ($query) {
                $query->where('is_current', true);
            })
            ->where('status', 'active')
            ->first();
    }

    /**
     * Get average grade for this student
     */
    public function getAverageGradeAttribute(): float
    {
        return round($this->finalGrades()->avg('final_score') ?? 0, 2);
    }

    /**
     * Get total number of grades
     */
    public function getTotalGradesAttribute(): int
    {
        return $this->grades()->count();
    }

    /**
     * Get grade classification based on average
     */
    public function getGradeClassificationAttribute(): string
    {
        $avg = $this->average_grade;

        if ($avg >= 90) return 'Sangat Baik';
        if ($avg >= 80) return 'Baik';
        if ($avg >= 70) return 'Cukup';
        if ($avg >= 60) return 'Kurang';
        return 'Sangat Kurang';
    }

    /**
     * Get age from birth_date
     */
    public function getAgeAttribute(): ?int
    {
        return $this->birth_date ? $this->birth_date->age : null;
    }

    // Scopes
    
    /**
     * Scope: Filter by status
     */
    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope: Filter by gender
     */
    public function scopeByGender($query, string $gender)
    {
        return $query->where('gender', $gender);
    }

    /**
     * Scope: Filter by class
     */
    public function scopeByClass($query, string $classId)
    {
        return $query->whereHas('classHistories', function ($q) use ($classId) {
            $q->where('class_id', $classId)
              ->where('status', 'active');
        });
    }

    /**
     * Scope: Filter by grade level
     */
    public function scopeByGradeLevel($query, string $gradeLevelId)
    {
        return $query->whereHas('classHistories.class.gradeLevel', function ($q) use ($gradeLevelId) {
            $q->where('id', $gradeLevelId);
        });
    }

    /**
     * Scope: Search by name, NIS, or NISN
     */
    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('nis', 'like', "%{$search}%")
              ->orWhere('nisn', 'like', "%{$search}%");
        });
    }

    /**
     * Scope: Active students only
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope: With current class information
     */
    public function scopeWithCurrentClass($query)
    {
        return $query->with(['classHistories' => function ($q) {
            $q->whereHas('academicYear', function ($query) {
                $query->where('is_current', true);
            })
            ->whereHas('semester', function ($query) {
                $query->where('is_current', true);
            })
            ->where('status', 'active')
            ->with(['class.gradeLevel', 'academicYear', 'semester']);
        }]);
    }

    // Helper Methods
    
    /**
     * Get final grades for specific semester
     */
    public function getFinalGradesBySemester(string $semesterId)
    {
        return $this->finalGrades()
            ->where('semester_id', $semesterId)
            ->with(['subject', 'gradeComponent'])
            ->get();
    }

    /**
     * Get attendance summary
     */
    public function getAttendanceSummary(string $semesterId = null)
    {
        $query = $this->attendances();
        
        if ($semesterId) {
            $query->where('semester_id', $semesterId);
        }

        return [
            'present' => $query->clone()->where('status', 'present')->count(),
            'sick' => $query->clone()->where('status', 'sick')->count(),
            'permission' => $query->clone()->where('status', 'permission')->count(),
            'absent' => $query->clone()->where('status', 'absent')->count(),
            'total' => $query->count(),
        ];
    }
}