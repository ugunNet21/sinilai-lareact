<?php

namespace App\Repositories\Contracts\Admin;

use App\Models\Student;

interface StudentRepositoryInterface
{
    public function all();
    public function find(string $id);
    public function create(array $data);
    public function update(string $id, array $data);
    public function delete(string $id);
}