<?php

namespace App\Repositories\Contracts\Admin;

interface StudentRepositoryInterface
{
    public function all();
    
    public function paginate(array $filters = [], int $perPage = 15);
    
    public function find(string $id);
    
    public function create(array $data);
    
    public function update(string $id, array $data);
    
    public function delete(string $id);
    
    public function assignToClass(string $studentId, string $classId);
    
    public function getStatistics();

    public function bulkUpdateStatus(array $ids, string $status);
    
    public function bulkDelete(array $ids);
}