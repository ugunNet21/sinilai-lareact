<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportExportHistory extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'import_export_history';

    protected $fillable = [
        'school_id', 'type', 'entity_type', 'file_name', 
        'file_path', 'total_records', 'success_count', 
        'error_count', 'status', 'errors', 'performed_by',
    ];

    protected $casts = [
        'total_records' => 'integer',
        'success_count' => 'integer',
        'error_count' => 'integer',
        'errors' => 'array',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function performedBy()
    {
        return $this->belongsTo(Teacher::class, 'performed_by');
    }
}