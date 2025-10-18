<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StudentRequest;
use App\Services\Admin\StudentService;
use App\Models\School;
use App\Models\ClassRoom;
use App\Models\GradeLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    protected $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    /**
     * Display a listing of students
     */
    public function index(Request $request)
    {
        $filters = $request->only([
            'search',
            'class_id',
            'grade_level_id',
            'status',
            'gender',
            'academic_year_id',
            'semester_id'
        ]);

        $perPage = $request->input('per_page', 15);
        $students = $this->studentService->paginate($filters, $perPage);
        $statistics = $this->studentService->getStatistics();

        // Get filter options
        $classes = ClassRoom::with('gradeLevel')
            ->orderBy('name')
            ->get()
            ->map(fn($class) => [
                'value' => $class->id,
                'label' => $class->name . ' - ' . $class->gradeLevel->name
            ]);

        $gradeLevels = GradeLevel::orderBy('level')
            ->get()
            ->map(fn($level) => [
                'value' => $level->id,
                'label' => $level->name
            ]);

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'statistics' => $statistics,
            'filters' => $filters,
            'filterOptions' => [
                'class_rooms' => $classes,
                'gradeLevels' => $gradeLevels,
                'statuses' => [
                    ['value' => 'ACTIVE', 'label' => 'Aktif'],
                    ['value' => 'INACTIVE', 'label' => 'Tidak Aktif'],
                    ['value' => 'GRADUATED', 'label' => 'Lulus'],
                    ['value' => 'TRANSFERRED', 'label' => 'Pindah'],
                    ['value' => 'DROPOUT', 'label' => 'Dropout'],
                ],
                'genders' => [
                    ['value' => 'L', 'label' => 'Laki-laki'],
                    ['value' => 'P', 'label' => 'Perempuan'],
                ],
            ],
        ]);
    }

    /**
     * Show the form for creating a new student
     */
    public function create()
    {
        $schools = School::orderBy('name')
            ->get()
            ->map(fn($school) => [
                'value' => $school->id,
                'label' => $school->name
            ]);

        $classes = ClassRoom::with('gradeLevel')
            ->orderBy('name')
            ->get()
            ->map(fn($class) => [
                'value' => $class->id,
                'label' => $class->name . ' - ' . $class->gradeLevel->name
            ]);

        return Inertia::render('Admin/Students/Create', [
            'schools' => $schools,
            'class_rooms' => $classes,
        ]);
    }

    /**
     * Store a newly created student
     */
    public function store(StudentRequest $request)
    {
        try {
            $student = $this->studentService->create($request->validated());

            return redirect()
                ->route('admin.students.show', $student->id)
                ->with('success', 'Data siswa berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal menambahkan data siswa: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified student
     */
    public function show(string $id)
    {
        $student = $this->studentService->find($id);

        return Inertia::render('Admin/Students/Show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified student
     */
    public function edit(string $id)
    {
        $student = $this->studentService->find($id);

        $schools = School::orderBy('name')
            ->get()
            ->map(fn($school) => [
                'value' => $school->id,
                'label' => $school->name
            ]);

        $classes = ClassRoom::with('gradeLevel')
            ->orderBy('name')
            ->get()
            ->map(fn($class) => [
                'value' => $class->id,
                'label' => $class->name . ' - ' . $class->gradeLevel->name
            ]);

        return Inertia::render('Admin/Students/Edit', [
            'student' => $student,
            'schools' => $schools,
            'class_rooms' => $classes,
        ]);
    }


    /**
     * Update the specified student
     */
    public function update(StudentRequest $request, string $id)
    {
        try {
            $student = $this->studentService->update($id, $request->validated());

            return redirect()
                ->route('admin.students.show', $student->id)
                ->with('success', 'Data siswa berhasil diperbarui');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Gagal memperbarui data siswa: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified student
     */
    public function destroy(string $id)
    {
        try {
            $this->studentService->delete($id);

            return redirect()
                ->route('admin.students.index')
                ->with('success', 'Data siswa berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menghapus data siswa: ' . $e->getMessage());
        }
    }

    /**
     * Export students to Excel
     */
    public function export(Request $request)
    {
        $filters = $request->only([
            'search',
            'class_id',
            'grade_level_id',
            'status',
            'gender'
        ]);

        return $this->studentService->export($filters);
    }

    /**
     * Import students from Excel
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048'
        ]);

        try {
            $this->studentService->import($request->file('file'));

            return redirect()
                ->back()
                ->with('success', 'Data siswa berhasil diimpor');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal mengimpor data siswa: ' . $e->getMessage());
        }
    }

    /**
     * Bulk action for students (activate, deactivate, etc.)
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,delete',
            'ids' => 'required|array',
            'ids.*' => 'required|uuid|exists:students,id'
        ]);

        try {
            $action = $request->input('action');
            $ids = $request->input('ids');

            switch ($action) {
                case 'activate':
                    $this->studentService->bulkUpdateStatus($ids, 'ACTIVE');
                    $message = 'Siswa berhasil diaktifkan';
                    break;
                case 'deactivate':
                    $this->studentService->bulkUpdateStatus($ids, 'INACTIVE');
                    $message = 'Siswa berhasil dinonaktifkan';
                    break;
                case 'delete':
                    $this->studentService->bulkDelete($ids);
                    $message = 'Siswa berhasil dihapus';
                    break;
                default:
                    throw new \Exception('Aksi tidak valid');
            }

            return redirect()
                ->back()
                ->with('success', $message);
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal melakukan aksi: ' . $e->getMessage());
        }
    }

    /**
     * Get student class history
     */
    public function classHistory(string $id)
    {
        $student = $this->studentService->find($id);
        $classHistory = $student->classHistories()
            ->with(['class.gradeLevel', 'academicYear', 'semester'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Students/ClassHistory', [
            'student' => $student,
            'classHistory' => $classHistory,
        ]);
    }

    public function assignClass(Request $request, string $id)
    {
        $request->validate([
            'class_id' => 'required|uuid|exists:class_rooms,id',
            'academic_year_id' => 'required|uuid|exists:academic_years,id',
            'semester_id' => 'required|uuid|exists:semesters,id',
        ]);

        try {
            $this->studentService->assignToClass(
                $id,
                $request->class_id,
                $request->academic_year_id,
                $request->semester_id
            );

            return redirect()
                ->back()
                ->with('success', 'Siswa berhasil ditambahkan ke kelas');
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menambahkan siswa ke kelas: ' . $e->getMessage());
        }
    }
}
