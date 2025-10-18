<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentType extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'school_id',
        'name',
        'code',
        'weight',
        'description',
        'is_active',
        'order_index',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function studentGrades()
    {
        return $this->hasMany(StudentGrade::class);
    }
}
