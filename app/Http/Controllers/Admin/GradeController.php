<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GradeController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Grades/Index');
    }

    public function create()
    {
        return Inertia::render('Admin/Grades/Create');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Grades/Edit', ['id' => $id]);
    }
}