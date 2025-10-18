<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'school_id',
        'name',
        'code',
        'version',
        'is_active',
        'description',
        'implementation_date',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'implementation_date' => 'date',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function curriculumSubjects()
    {
        return $this->hasMany(CurriculumSubject::class);
    }
}
