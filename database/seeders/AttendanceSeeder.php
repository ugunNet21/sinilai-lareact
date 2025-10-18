<?php

namespace Database\Seeders;

use App\Models\AcademicYear;
use App\Models\Attendance;
use App\Models\ClassRoom;
use App\Models\School;
use App\Models\Semester;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            DB::transaction(function () use ($school) {
                $this->createAttendancesForSchool($school);
            });
        }
    }

    private function createAttendancesForSchool(School $school): void
    {
        $currentAcademicYear = AcademicYear::where('school_id', $school->id)
            ->where('is_current', true)
            ->first();

        if (!$currentAcademicYear) {
            return;
        }

        $semesters = Semester::where('academic_year_id', $currentAcademicYear->id)->get();
        $classRooms = ClassRoom::where('school_id', $school->id)
            ->where('academic_year_id', $currentAcademicYear->id)
            ->where('is_active', true)
            ->get();
        $teachers = Teacher::where('school_id', $school->id)->where('status', 'ACTIVE')->get();

        $attendanceData = [];

        foreach ($semesters as $semester) {
            foreach ($classRooms as $classRoom) {
                $students = Student::where('school_id', $school->id)
                    ->where('status', 'ACTIVE')
                    ->limit(3) // Lebih sedikit untuk menghindari duplikasi
                    ->get();

                // Generate 5 hari sekolah per semester
                for ($day = 1; $day <= 5; $day++) {
                    $date = date('Y-m-d', strtotime($semester->start_date . " +{$day} weekdays"));

                    // Skip weekend
                    if (date('N', strtotime($date)) >= 6) {
                        continue;
                    }

                    foreach ($students as $student) {
                        // Cek duplikasi sebelum menambahkan ke array
                        $key = $student->id . '_' . $date;
                        if (!isset($attendanceData[$key])) {
                            $status = $this->getRandomAttendanceStatus();
                            $description = $this->getAttendanceDescription($status);

                            $attendanceData[$key] = [
                                'id' => \Ramsey\Uuid\Uuid::uuid4()->toString(),
                                'student_id' => $student->id,
                                'class_id' => $classRoom->id,
                                'academic_year_id' => $currentAcademicYear->id,
                                'semester_id' => $semester->id,
                                'date' => $date,
                                'status' => $status,
                                'description' => $description,
                                'recorded_by' => $teachers->random()->id,
                                'created_at' => now(),
                            ];
                        }
                    }
                }
            }
        }

        // Insert dalam batch dengan ignore duplicates
        if (!empty($attendanceData)) {
            foreach (array_chunk($attendanceData, 100) as $chunk) {
                try {
                    DB::table('attendances')->insertOrIgnore($chunk);
                } catch (\Exception $e) {
                    // Continue jika ada error
                    continue;
                }
            }
        }
    }

    private function getRandomAttendanceStatus(): string
    {
        $weights = [
            'PRESENT' => 90,   // 90% hadir
            'LATE' => 4,       // 4% terlambat
            'SICK' => 3,       // 3% sakit
            'PERMISSION' => 2, // 2% izin
            'ABSENT' => 1,     // 1% alpha
        ];

        $random = rand(1, 100);
        $cumulative = 0;

        foreach ($weights as $status => $weight) {
            $cumulative += $weight;
            if ($random <= $cumulative) {
                return $status;
            }
        }

        return 'PRESENT';
    }

    private function getAttendanceDescription(string $status): string
    {
        return match($status) {
            'PRESENT' => 'Hadir tepat waktu',
            'LATE' => 'Terlambat datang ke sekolah',
            'SICK' => 'Sakit dengan surat dokter',
            'PERMISSION' => 'Ijin dengan surat dari orang tua',
            'ABSENT' => 'Tidak hadir tanpa keterangan',
            default => ''
        };
    }
}