<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Frontend
Route::get('/', [App\Http\Controllers\Frontend\HomeController::class, 'index']);

// Admin
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('students', App\Http\Controllers\Admin\StudentController::class)->names('students')->parameters(['students' => 'id']);
    Route::post('students/bulk-action', [App\Http\Controllers\Admin\StudentController::class, 'bulkAction'])->name('students.bulk-action');
    Route::get('students/{id}/class-history', [App\Http\Controllers\Admin\StudentController::class, 'classHistory'])->name('students.class-history');
    Route::post('students/{id}/assign-class', [App\Http\Controllers\Admin\StudentController::class, 'assignClass'])->name('students.assign-class');
    Route::post('students/import', [App\Http\Controllers\Admin\StudentController::class, 'import'])->name('students.import');
    Route::get('students/export', [App\Http\Controllers\Admin\StudentController::class, 'export'])->name('students.export');
    
    Route::resource('grades', App\Http\Controllers\Admin\GradeController::class);
    Route::resource('reports', App\Http\Controllers\Admin\ReportController::class);
    Route::resource('settings', App\Http\Controllers\Admin\SettingController::class);
});
