<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurriculumSubject extends Model
{
    use HasFactory, HasUuids;

    public $timestamps = false;
    protected $fillable = [
        'curriculum_id',
        'subject_id',
        'grade_level_id',
        'is_compulsory',
        'hours_per_week',
        'order_index',
    ];

    protected $casts = [
        'is_compulsory' => 'boolean',
        'hours_per_week' => 'integer',
        'order_index' => 'integer',
        'created_at' => 'datetime',
    ];

    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function gradeLevel()
    {
        return $this->belongsTo(GradeLevel::class);
    }
}
