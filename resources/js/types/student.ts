// resources/js/types/student.ts

export interface Student {
  id: string;
  school_id: string;
  nis: string;
  nisn: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  gender: 'L' | 'P';
  birth_place: string | null;
  birth_date?: string; 
  religion: string | null;
  address: string | null;
  photo_url: string | null;
  father_name: string | null;
  mother_name: string | null;
  parent_phone: string | null;
  enrollment_date: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED' | 'DROPOUT';
  created_at: string;
  updated_at: string;
  current_class?: StudentClassHistory;
  average_grade?: number | null;
  total_grades?: number;
}

export interface ClassInfo {
  id: string;
  name: string;
  grade_level: {
    name: string;
    level: number;
  };
}

export interface StudentClassHistory {
  id: string;
  student_id: string;
  class_id: string;
  academic_year_id: string;
  semester_id: string;
  student_number: number;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
  class: ClassInfo;
  academic_year: {
    id: string;
    name: string;
  };
  semester: {
    id: string;
    name: string;
  };
}

export interface StudentFormData {
  school_id: string;
  nis: string;
  nisn: string | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  gender: 'L' | 'P' | '';
  birth_place?: string | null;
  birth_date?: string | null;
  religion?: string | null;
  address?: string | null;
  photo_url?: string | null;
  father_name?: string | null;
  mother_name?: string | null;
  parent_phone?: string | null;
  enrollment_date?: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED' | 'DROPOUT'; 
  
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
  [key: string]: string | undefined;
}

export interface PaginatedStudents {
  data: Student[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export interface SelectOption {
  value: string;
  label: string;
}
