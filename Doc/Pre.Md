## Create Schema

```bash
# Urutan pembuatan model & migration (PENTING: Jalankan sesuai urutan!)

# 1. TABEL UTAMA
php artisan make:model School -m
php artisan make:model AcademicYear -m
php artisan make:model Semester -m

# 2. TABEL AKADEMIK DASAR
php artisan make:model GradeLevel -m
php artisan make:model Subject -m
php artisan make:model Curriculum -m

# 3. TABEL USER (Teachers harus dibuat sebelum Classes karena homeroom_teacher_id)
php artisan make:model Teacher -m

# 4. TABEL AKADEMIK LANJUTAN
php artisan make:model ClassRoom -m  # Gunakan ClassRoom karena Class adalah reserved keyword
php artisan make:model CurriculumSubject -m

# 5. TABEL SISWA
php artisan make:model Student -m
php artisan make:model StudentClassHistory -m

# 6. TABEL PENUGASAN
php artisan make:model TeachingAssignment -m

# 7. TABEL NILAI & ASSESSMENT
php artisan make:model AssessmentType -m
php artisan make:model GradeComponent -m
php artisan make:model GradeScale -m
php artisan make:model StudentGrade -m
php artisan make:model FinalGrade -m

# 8. TABEL FITUR LANJUTAN
php artisan make:model Attendance -m
php artisan make:model Violation -m
php artisan make:model StudentViolation -m
php artisan make:model Extracurricular -mphp
php artisan make:model StudentExtracurricular -m

# 9. TABEL SISTEM
php artisan make:model ImportExportHistory -m
php artisan make:model SystemLog -m

```

### **2\. Command**

1. Buat Command - Hanya sekali
```bash
    php artisan make:command GenerateSchoolModels
    php artisan generate:school-models
```
