-- Extensions untuk UUID dan lainnya
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ==================== TABEL UTAMA ====================

-- Tabel sekolah/organisasi
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('TK', 'SD', 'SMP', 'SMA', 'SMK', 'MADRASAH', 'UNIVERSITY', 'OTHER')),
    type VARCHAR(20) NOT NULL CHECK (type IN ('NEGERI', 'SWASTA', 'MADRASAH', 'INTERNATIONAL')),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    logo_url VARCHAR(500),
    academic_year VARCHAR(9) NOT NULL, -- Format: 2024/2025
    timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel tahun akademik
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    year VARCHAR(9) NOT NULL, -- Format: 2024/2025
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, year)
);

-- Tabel semester
CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- Semester 1, Semester 2, etc.
    code VARCHAR(10) NOT NULL, -- GANJIL, GENAP
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(academic_year_id, code)
);

-- ==================== TABEL AKADEMIK ====================

-- Tabel tingkat/level kelas (Grade Levels)
CREATE TABLE grade_levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- Kelas 7, Kelas 8, etc.
    level INTEGER NOT NULL, -- 1, 2, 3, etc.
    description TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, name)
);

-- Tabel kelas (Classes)
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    grade_level_id UUID NOT NULL REFERENCES grade_levels(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL, -- 7A, 7B, 8A, etc.
    code VARCHAR(20) NOT NULL,
    capacity INTEGER DEFAULT 40,
    homeroom_teacher_id UUID, -- Akan di-reference setelah tabel teachers dibuat
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, academic_year_id, code)
);

-- Tabel mata pelajaran (Subjects)
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT,
    category VARCHAR(50) CHECK (category IN ('UMUM', 'KEAHLIAN', 'WAJIB', 'PEMINATAN', 'MUATAN_LOKAL')),
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, code)
);

-- Tabel kurikulum (Curriculum)
CREATE TABLE curricula (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- Kurikulum 2013, Kurikulum Merdeka, etc.
    code VARCHAR(50) NOT NULL,
    version VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    description TEXT,
    implementation_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, code)
);

-- Tabel mapping kurikulum dengan mata pelajaran
CREATE TABLE curriculum_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curriculum_id UUID NOT NULL REFERENCES curricula(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    grade_level_id UUID NOT NULL REFERENCES grade_levels(id) ON DELETE CASCADE,
    is_compulsory BOOLEAN DEFAULT true,
    hours_per_week INTEGER DEFAULT 2,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(curriculum_id, subject_id, grade_level_id)
);

-- ==================== TABEL SISWA & GURU ====================

-- Tabel siswa (Students)
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    nis VARCHAR(50) NOT NULL, -- Nomor Induk Siswa
    nisn VARCHAR(50), -- Nomor Induk Siswa Nasional
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    gender VARCHAR(1) CHECK (gender IN ('L', 'P')),
    birth_place VARCHAR(100),
    birth_date DATE,
    religion VARCHAR(20),
    address TEXT,
    photo_url VARCHAR(500),
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    parent_phone VARCHAR(20),
    enrollment_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'GRADUATED', 'TRANSFERRED', 'DROPOUT', 'INACTIVE')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, nis)
);

-- Tabel riwayat kelas siswa (Student Class History)
CREATE TABLE student_class_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    student_number INTEGER, -- No. absen
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'REPEAT', 'PROMOTED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, academic_year_id, semester_id)
);

-- Tabel guru/staff (Teachers/Staff)
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    nip VARCHAR(50), -- Nomor Induk Pegawai
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    gender VARCHAR(1) CHECK (gender IN ('L', 'P')),
    birth_place VARCHAR(100),
    birth_date DATE,
    address TEXT,
    photo_url VARCHAR(500),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'RETIRED')),
    teacher_type VARCHAR(20) CHECK (teacher_type IN ('GURU', 'TU', 'KEPALA_SEKOLAH', 'WAKIL_KEPALA_SEKOLAH')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, nip)
);

-- Tabel penugasan guru mengajar (Teaching Assignments)
CREATE TABLE teaching_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    hours_per_week INTEGER DEFAULT 2,
    is_homeroom BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(teacher_id, subject_id, class_id, academic_year_id, semester_id)
);

-- ==================== TABEL NILAI & ASSESSMENT ====================

-- Tabel jenis penilaian (Assessment Types)
CREATE TABLE assessment_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- Ulangan Harian, UTS, UAS, Tugas, Praktik, etc.
    code VARCHAR(50) NOT NULL,
    weight DECIMAL(5,2) DEFAULT 0.00, -- Bobot dalam persentase
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, code)
);

-- Tabel komponen penilaian (Grade Components)
CREATE TABLE grade_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- Pengetahuan, Keterampilan, Sikap
    code VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, code)
);

-- Tabel skala penilaian (Grade Scales)
CREATE TABLE grade_scales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- Skala 0-100, Skala 0-4, etc.
    min_score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    grade_letter VARCHAR(5), -- A, B, C, D, E
    grade_point DECIMAL(3,2), -- 4.00, 3.50, etc.
    description VARCHAR(255),
    color VARCHAR(20), -- Untuk UI
    is_passing BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, min_score, max_score)
);

-- Tabel nilai siswa (Student Grades)
CREATE TABLE student_grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    assessment_type_id UUID NOT NULL REFERENCES assessment_types(id) ON DELETE CASCADE,
    grade_component_id UUID NOT NULL REFERENCES grade_components(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    score DECIMAL(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
    max_score DECIMAL(5,2) DEFAULT 100,
    grade_scale_id UUID REFERENCES grade_scales(id),
    description TEXT,
    assessment_date DATE NOT NULL,
    recorded_by UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel nilai akhir (Final Grades)
CREATE TABLE final_grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    grade_component_id UUID NOT NULL REFERENCES grade_components(id) ON DELETE CASCADE,
    knowledge_score DECIMAL(5,2), -- Nilai pengetahuan
    skill_score DECIMAL(5,2), -- Nilai keterampilan
    final_score DECIMAL(5,2), -- Nilai akhir
    grade_letter VARCHAR(5),
    grade_point DECIMAL(3,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, subject_id, academic_year_id, semester_id, grade_component_id)
);

-- ==================== TABEL FITUR LANJUTAN ====================

-- Tabel kehadiran (Attendance)
CREATE TABLE attendances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'SICK', 'PERMISSION', 'HOLIDAY')),
    description TEXT,
    recorded_by UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, date)
);

-- Tabel pelanggaran (Violations)
CREATE TABLE violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('RINGAN', 'SEDANG', 'BERAT')),
    point INTEGER DEFAULT 0,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, code)
);

-- Tabel catatan pelanggaran siswa
CREATE TABLE student_violations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    violation_id UUID NOT NULL REFERENCES violations(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    violation_date DATE NOT NULL,
    description TEXT,
    point INTEGER NOT NULL,
    recorded_by UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel ekstrakurikuler
CREATE TABLE extracurriculars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT,
    coach_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, code)
);

-- Tabel partisipasi ekstrakurikuler
CREATE TABLE student_extracurriculars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    extracurricular_id UUID NOT NULL REFERENCES extracurriculars(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    position VARCHAR(100), -- Posisi/jabatan
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, extracurricular_id, academic_year_id, semester_id)
);

-- ==================== TABEL SISTEM ====================

-- Tabel import/export history
CREATE TABLE import_export_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('IMPORT', 'EXPORT')),
    entity_type VARCHAR(50) NOT NULL, -- STUDENTS, GRADES, TEACHERS, etc.
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500),
    total_records INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PROCESSING' CHECK (status IN ('PROCESSING', 'COMPLETED', 'FAILED')),
    errors JSONB DEFAULT '[]',
    performed_by UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel sistem logs
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID, -- Bisa teacher atau user lain
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address INET,
    user_agent TEXT,
    resource_type VARCHAR(50),
    resource_id UUID,
    changes JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== INDEXES ====================

-- Indexes untuk performa
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_students_nis ON students(nis);
CREATE INDEX idx_students_status ON students(status);

CREATE INDEX idx_student_grades_student_id ON student_grades(student_id);
CREATE INDEX idx_student_grades_subject_id ON student_grades(subject_id);
CREATE INDEX idx_student_grades_class_id ON student_grades(class_id);
CREATE INDEX idx_student_grades_academic_year_id ON student_grades(academic_year_id);
CREATE INDEX idx_student_grades_semester_id ON student_grades(semester_id);

CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_teachers_nip ON teachers(nip);

CREATE INDEX idx_attendances_student_id ON attendances(student_id);
CREATE INDEX idx_attendances_date ON attendances(date);

CREATE INDEX idx_system_logs_school_id ON system_logs(school_id);
CREATE INDEX idx_system_logs_created_at ON system_logs(created_at);
CREATE INDEX idx_system_logs_user_id ON system_logs(user_id);

-- Full text search indexes
CREATE INDEX idx_students_name_search ON students USING gin(to_tsvector('indonesian', name));
CREATE INDEX idx_teachers_name_search ON teachers USING gin(to_tsvector('indonesian', name));

-- ==================== FUNCTIONS & TRIGGERS ====================

-- Function untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers untuk update updated_at
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_grades_updated_at BEFORE UPDATE ON student_grades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function untuk menghitung grade otomatis
CREATE OR REPLACE FUNCTION calculate_grade_letter(score DECIMAL)
RETURNS VARCHAR(5) AS $$
BEGIN
    RETURN CASE
        WHEN score >= 85 THEN 'A'
        WHEN score >= 70 THEN 'B'
        WHEN score >= 60 THEN 'C'
        WHEN score >= 50 THEN 'D'
        ELSE 'E'
    END;
END;
$$ LANGUAGE plpgsql;

-- Function untuk menghitung grade point
CREATE OR REPLACE FUNCTION calculate_grade_point(score DECIMAL)
RETURNS DECIMAL(3,2) AS $$
BEGIN
    RETURN CASE
        WHEN score >= 85 THEN 4.00
        WHEN score >= 80 THEN 3.75
        WHEN score >= 75 THEN 3.50
        WHEN score >= 70 THEN 3.00
        WHEN score >= 65 THEN 2.75
        WHEN score >= 60 THEN 2.50
        WHEN score >= 55 THEN 2.00
        WHEN score >= 50 THEN 1.75
        ELSE 0.00
    END;
END;
$$ LANGUAGE plpgsql;