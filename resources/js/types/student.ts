// resources/js/types/student.ts

export interface Student {
    id: string;
    school_id: string;
    nis: string;
    nisn: string;
    name: string;
    email: string | null;
    phone: string | null;
    gender: 'L' | 'P';
    birth_place: string | null;
    birth_date: string | null;
    religion: string | null;
    address: string | null;
    photo_url: string | null;
    father_name: string | null;
    mother_name: string | null;
    parent_phone: string | null;
    enrollment_date: string | null;
    status: 'active' | 'inactive' | 'graduated' | 'transferred';
    created_at: string;
    updated_at: string;
    
    // Computed attributes
    current_class?: ClassInfo;
    average_grade?: number;
    total_grades?: number;
  }
  
  export interface ClassInfo {
    id: string;
    name: string;
    grade_level: {
      name: string;
      level: number;
    };
    academic_year: {
      name: string;
      code: string;
    };
    semester: {
      name: string;
      code: string;
    };
  }
  
  export interface StudentFormData {
    school_id: string;
    nis: string;
    nisn: string;
    name: string;
    email?: string;
    phone?: string;
    gender: 'L' | 'P' | '';
    birth_place?: string;
    birth_date?: string;
    religion?: string;
    address?: string;
    photo_url?: string;
    father_name?: string;
    mother_name?: string;
    parent_phone?: string;
    enrollment_date?: string;
    status: 'active' | 'inactive' | 'graduated' | 'transferred';
    
    // For class assignment
    class_id?: string;
  }
  
  export interface StudentFilters {
    search?: string;
    class_id?: string;
    grade_level_id?: string;
    status?: string;
    gender?: string;
    academic_year_id?: string;
    semester_id?: string;
  }
  
  export interface PaginatedStudents {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  }
  
  export interface SelectOption {
    value: string;
    label: string;
  }