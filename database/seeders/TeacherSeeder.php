<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    public function run(): void
    {
        $schools = School::all();
        
        foreach ($schools as $school) {
            $this->createTeachersForSchool($school);
        }
    }

    private function createTeachersForSchool(School $school): void
    {
        $teachers = [
            // Kepala Sekolah & Wakil
            [
                'nip' => '196501011990031001',
                'name' => 'Dr. Surya Adi Wijaya, M.Pd.',
                'email' => 'kepsek@' . strtolower($school->code) . '.sch.id',
                'phone' => '081234567890',
                'gender' => 'L',
                'birth_place' => 'Jakarta',
                'birth_date' => '1965-01-01',
                'teacher_type' => 'KEPALA_SEKOLAH',
                'hire_date' => '1990-03-01',
                'status' => 'ACTIVE'
            ],
            [
                'nip' => '196803151992122001',
                'name' => 'Drs. Ahmad Hidayat, M.M.',
                'email' => 'wakasek@' . strtolower($school->code) . '.sch.id',
                'phone' => '081234567891',
                'gender' => 'L',
                'birth_place' => 'Bandung',
                'birth_date' => '1968-03-15',
                'teacher_type' => 'WAKIL_KEPALA_SEKOLAH',
                'hire_date' => '1992-12-01',
                'status' => 'ACTIVE'
            ],
            
            // Guru Mata Pelajaran
            [
                'nip' => '197204201995122002',
                'name' => 'Diana Sari, S.Pd.',
                'email' => 'diana@' . strtolower($school->code) . '.sch.id',
                'phone' => '081234567892',
                'gender' => 'P',
                'birth_place' => 'Surabaya',
                'birth_date' => '1972-04-20',
                'teacher_type' => 'GURU',
                'hire_date' => '1995-12-01',
                'status' => 'ACTIVE'
            ],
            [
                'nip' => '197512152000032003',
                'name' => 'Budi Santoso, S.Pd.',
                'email' => 'budi@' . strtolower($school->code) . '.sch.id',
                'phone' => '081234567893',
                'gender' => 'L',
                'birth_place' => 'Yogyakarta',
                'birth_date' => '1975-12-15',
                'teacher_type' => 'GURU',
                'hire_date' => '2000-03-01',
                'status' => 'ACTIVE'
            ],
            [
                'nip' => '198003102005012004',
                'name' => 'Rina Marlina, S.Pd.',
                'email' => 'rina@' . strtolower($school->code) . '.sch.id',
                'phone' => '081234567894',
                'gender' => 'P',
                'birth_place' => 'Semarang',
                'birth_date' => '1980-03-10',
                'teacher_type' => 'GURU',
                'hire_date' => '2005-01-01',
                'status' => 'ACTIVE'
            ],
            
            // TU
            [
                'nip' => '198506252010012005',
                'name' => 'Siti Aisyah, A.Md.',
                'email' => 'tatausaha@' . strtolower($school->code) . '.sch.id',
                'phone' => '081234567895',
                'gender' => 'P',
                'birth_place' => 'Malang',
                'birth_date' => '1985-06-25',
                'teacher_type' => 'TU',
                'hire_date' => '2010-01-01',
                'status' => 'ACTIVE'
            ]
        ];

        foreach ($teachers as $teacher) {
            Teacher::updateOrCreate(
                [
                    'school_id' => $school->id,
                    'nip' => $teacher['nip']
                ],
                array_merge($teacher, [
                    'address' => 'Alamat ' . $teacher['name'],
                ])
            );
        }
    }
}