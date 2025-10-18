<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GradeScale extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;

    protected $fillable = [
        'school_id',
        'name',
        'min_score',
        'max_score',
        'grade_letter',
        'grade_point',
        'description',
        'color',
        'is_passing',
    ];

    protected $casts = [
        'min_score' => 'decimal:2',
        'max_score' => 'decimal:2',
        'grade_point' => 'decimal:2',
        'is_passing' => 'boolean',
        'created_at' => 'datetime',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function studentGrades()
    {
        return $this->hasMany(StudentGrade::class);
    }
    /**
     * Get matching grade scale for a given score
     */
    public static function getMatchingScale(string $schoolId, float $score): ?self
    {
        return static::where('school_id', $schoolId)
            ->where('min_score', '<=', $score)
            ->where('max_score', '>=', $score)
            ->first();
    }

    /**
     * Scope untuk mencari skala berdasarkan score
     */
    public function scopeForScore($query, float $score)
    {
        return $query->where('min_score', '<=', $score)
            ->where('max_score', '>=', $score);
    }
}
