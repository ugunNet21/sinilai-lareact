<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Violation extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'school_id',
        'name',
        'code',
        'category',
        'point',
        'description',
        'is_active',
    ];

    protected $casts = [
        'point' => 'integer',
        'is_active' => 'boolean',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function studentViolations()
    {
        return $this->hasMany(StudentViolation::class);
    }
}
