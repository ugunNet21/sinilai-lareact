<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $schools = [
            [
                'id' => Uuid::uuid4()->toString(),
                'name' => 'SMA Negeri 1 Jakarta',
                'code' => 'SMAN1JKT',
                'level' => 'SMA',
                'type' => 'NEGERI',
                'address' => 'Jl. Budi Utomo No. 7, Ps. Baru, Kec. Sawah Besar, Kota Jakarta Pusat',
                'phone' => '(021) 3841194',
                'email' => 'info@sman1-jkt.sch.id',
                'website' => 'www.sman1-jkt.sch.id',
                'logo_url' => null,
                'academic_year' => '2024/2025',
                'timezone' => 'Asia/Jakarta',
                'is_active' => true,
                'settings' => json_encode([
                    'max_attendance_hours' => 8,
                    'grade_scale' => 100,
                    'allow_online_registration' => true
                ])
            ],
            [
                'id' => Uuid::uuid4()->toString(),
                'name' => 'SMP Negeri 5 Bandung',
                'code' => 'SMPN5BDG',
                'level' => 'SMP',
                'type' => 'NEGERI',
                'address' => 'Jl. Belitung No.8, Merdeka, Kec. Sumur Bandung, Kota Bandung',
                'phone' => '(022) 4203360',
                'email' => 'info@smpn5bdg.sch.id',
                'website' => 'www.smpn5bdg.sch.id',
                'logo_url' => null,
                'academic_year' => '2024/2025',
                'timezone' => 'Asia/Jakarta',
                'is_active' => true,
                'settings' => json_encode([
                    'max_attendance_hours' => 7,
                    'grade_scale' => 100,
                    'allow_online_registration' => false
                ])
            ]
        ];

        foreach ($schools as $school) {
            School::create($school);
        }
    }
}