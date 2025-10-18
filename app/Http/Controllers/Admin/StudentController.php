<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Students/Index');
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Students/Edit', ['id' => $id]);
    }
}