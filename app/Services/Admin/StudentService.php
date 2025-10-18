<?php

namespace App\Services\Admin;

use App\Repositories\Contracts\Admin\StudentRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class StudentService
{
    protected $repository;

    public function __construct(StudentRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function all()
    {
        return $this->repository->all();
    }

    public function paginate(array $filters = [], int $perPage = 15)
    {
        return $this->repository->paginate($filters, $perPage);
    }

    public function find(string $id)
    {
        return $this->repository->find($id);
    }

    public function create(array $data)
    {
        // Handle photo upload if exists
        if (isset($data['photo']) && $data['photo']) {
            $data['photo_url'] = $this->uploadPhoto($data['photo']);
            unset($data['photo']);
        }

        return $this->repository->create($data);
    }

    public function update(string $id, array $data)
    {
        $student = $this->repository->find($id);

        // Jika NIS kosong pada update, gunakan nilai lama
        if (empty($data['nis'])) {
            $data['nis'] = $student->nis;
        }

        // Jika NISN kosong, gunakan nilai lama
        if (empty($data['nisn'])) {
            $data['nisn'] = $student->nisn;
        }

        // Handle photo upload if exists
        if (isset($data['photo']) && $data['photo']) {
            // Delete old photo
            if ($student->photo_url) {
                $this->deletePhoto($student->photo_url);
            }

            $data['photo_url'] = $this->uploadPhoto($data['photo']);
            unset($data['photo']);
        }

        return $this->repository->update($id, $data);
    }

    public function delete(string $id)
    {
        $student = $this->repository->find($id);

        // Delete photo if exists
        if ($student->photo_url) {
            $this->deletePhoto($student->photo_url);
        }

        return $this->repository->delete($id);
    }

    public function assignToClass(string $studentId, string $classId)
    {
        return $this->repository->assignToClass($studentId, $classId);
    }

    public function getStatistics()
    {
        return $this->repository->getStatistics();
    }

    protected function uploadPhoto($photo)
    {
        $path = $photo->store('students/photos', 'public');
        return Storage::url($path);
    }

    protected function deletePhoto(string $photoUrl)
    {
        $path = str_replace('/storage/', '', $photoUrl);
        Storage::disk('public')->delete($path);
    }

    public function export(array $filters = []) {}

    public function import($file) {}

    /**
     * Bulk update student status
     */
    public function bulkUpdateStatus(array $ids, string $status)
    {
        return $this->repository->bulkUpdateStatus($ids, $status);
    }

    /**
     * Bulk delete students
     */
    public function bulkDelete(array $ids)
    {
        return $this->repository->bulkDelete($ids);
    }
}
