<?php

namespace App\Repositories\Admin;

use App\Models\Student;
use App\Models\StudentClassHistory;
use App\Models\AcademicYear;
use App\Models\Semester;
use App\Repositories\Contracts\Admin\StudentRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class StudentRepository implements StudentRepositoryInterface
{
    protected $model;

    public function __construct(Student $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->with(['school', 'classHistories.class.gradeLevel'])->get();
    }

    public function paginate(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->query()->withCurrentClass();

        // Search filter
        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        // Class filter
        if (!empty($filters['class_id'])) {
            $query->byClass($filters['class_id']);
        }

        // Grade level filter
        if (!empty($filters['grade_level_id'])) {
            $query->byGradeLevel($filters['grade_level_id']);
        }

        // Status filter
        if (!empty($filters['status'])) {
            $query->byStatus($filters['status']);
        }

        // Gender filter
        if (!empty($filters['gender'])) {
            $query->byGender($filters['gender']);
        }

        // Academic year filter
        if (!empty($filters['academic_year_id'])) {
            $query->whereHas('classHistories', function ($q) use ($filters) {
                $q->where('academic_year_id', $filters['academic_year_id']);
            });
        }

        return $query->latest()->paginate($perPage);
    }

    public function find(string $id)
    {
        return $this->model->with([
            'school',
            'classHistories' => function ($query) {
                $query->with(['class.gradeLevel', 'academicYear', 'semester'])
                    ->latest();
            },
            'grades' => function ($query) {
                $query->with(['subject', 'assessmentType'])
                    ->latest()
                    ->limit(10);
            },
            'finalGrades' => function ($query) {
                $query->with(['subject', 'semester'])
                    ->latest();
            },
            'attendances' => function ($query) {
                $query->latest()->limit(20);
            },
            'violations' => function ($query) {
                $query->with('violation')->latest();
            },
            'extracurriculars' => function ($query) {
                $query->with('extracurricular')->where('status', 'ACTIVE');
            }
        ])->findOrFail($id);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Extract class_id if provided
            $classId = $data['class_id'] ?? null;
            unset($data['class_id']);

            // Create student
            $student = $this->model->create($data);

            // Assign to class if provided
            if ($classId) {
                $this->assignToClass($student->id, $classId);
            }

            return $student->load('classHistories.class.gradeLevel');
        });
    }

    public function update(string $id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $student = $this->find($id);
            
            // Extract class_id if provided
            $classId = $data['class_id'] ?? null;
            unset($data['class_id']);
    
            // Update student data - JANGAN overwrite NIS/NISN jika null
            $updateData = [];
            foreach ($data as $key => $value) {
                if ($key === 'nis' && $value === null) {
                    continue; // Skip jika NIS null
                }
                if ($key === 'nisn' && $value === null) {
                    continue; // Skip jika NISN null
                }
                $updateData[$key] = $value;
            }
            
            $student->update($updateData);
    
            // Update class assignment if provided
            if ($classId) {
                $this->assignToClass($student->id, $classId);
            }
    
            return $student->fresh(['classHistories.class.gradeLevel']);
        });
    }

    public function delete(string $id)
    {
        return DB::transaction(function () use ($id) {
            $student = $this->find($id);

            // Soft delete by updating status
            $student->update(['status' => 'INACTIVE']);

            // Or hard delete if needed
            // $student->delete();

            return true;
        });
    }

    public function assignToClass(string $studentId, string $classId)
    {
        $currentAcademicYear = AcademicYear::where('is_current', true)->first();
        $currentSemester = Semester::where('is_current', true)->first();
    
        if (!$currentAcademicYear || !$currentSemester) {
            throw new \Exception('No active academic year or semester found');
        }
    
        // Cek apakah sudah ada record untuk student di academic year dan semester ini
        $existingRecord = StudentClassHistory::where('student_id', $studentId)
            ->where('academic_year_id', $currentAcademicYear->id)
            ->where('semester_id', $currentSemester->id)
            ->first();
    
        if ($existingRecord) {
            // Update existing record
            $existingRecord->update([
                'class_id' => $classId,
                'status' => 'ACTIVE'
            ]);
            return $existingRecord;
        } else {
            // Get next student number in class
            $studentNumber = StudentClassHistory::where('class_id', $classId)
                ->where('academic_year_id', $currentAcademicYear->id)
                ->where('semester_id', $currentSemester->id)
                ->max('student_number') + 1;
    
            // Create new class history
            return StudentClassHistory::create([
                'student_id' => $studentId,
                'class_id' => $classId,
                'academic_year_id' => $currentAcademicYear->id,
                'semester_id' => $currentSemester->id,
                'student_number' => $studentNumber,
                'status' => 'ACTIVE',
            ]);
        }
    }

    public function getStatistics()
    {
        return [
            'total' => $this->model->count(),
            'active' => $this->model->where('status', 'ACTIVE')->count(),
            'inactive' => $this->model->where('status', 'INACTIVE')->count(),
            'graduated' => $this->model->where('status', 'GRADUATED')->count(),
            'male' => $this->model->where('gender', 'L')->count(),
            'female' => $this->model->where('gender', 'P')->count(),
        ];
    }
    /**
     * Bulk update student status
     */
    public function bulkUpdateStatus(array $ids, string $status)
    {
        return DB::transaction(function () use ($ids, $status) {
            return $this->model->whereIn('id', $ids)->update(['status' => $status]);
        });
    }

    /**
     * Bulk delete students
     */
    public function bulkDelete(array $ids)
    {
        return DB::transaction(function () use ($ids) {
            $students = $this->model->whereIn('id', $ids)->get();

            foreach ($students as $student) {
                // Delete photo if exists
                if ($student->photo_url) {
                    $path = str_replace('/storage/', '', $student->photo_url);
                    Storage::disk('public')->delete($path);
                }
            }

            return $this->model->whereIn('id', $ids)->delete();
        });
    }
}
