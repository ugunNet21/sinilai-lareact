<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Extracurricular extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'school_id', 'name', 'code', 'description', 
        'coach_id', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function coach()
    {
        return $this->belongsTo(Teacher::class, 'coach_id');
    }

    public function studentExtracurriculars()
    {
        return $this->hasMany(StudentExtracurricular::class);
    }
}