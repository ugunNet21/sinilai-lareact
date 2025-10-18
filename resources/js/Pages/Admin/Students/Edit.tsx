// js/Pages/Admin/Students/Edit.tsx
import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StudentForm from './_Form';
import { Student, StudentFormData, SelectOption } from '@/types/student';
import { route } from 'ziggy-js';

interface EditProps {
  student: Student;
  schools: SelectOption[];
  class_rooms: SelectOption[];
}

// Helper function untuk format tanggal ke YYYY-MM-DD
const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';

  // Jika sudah format ISO (dari database), langsung ambil bagian date-nya
  if (dateString.includes('T')) {
    return dateString.split('T')[0];
  }

  // Jika format lain, konversi dulu
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function StudentsEdit({
  student,
  schools,
  class_rooms,
}: EditProps) {
  const { data, setData, put, processing, errors } = useForm<StudentFormData>({
    school_id: student.school_id,
    nis: student.nis,
    nisn: student.nisn || null,
    name: student.name,
    email: student.email || null,
    phone: student.phone || null,
    gender: student.gender,
    birth_place: student.birth_place || null,
    birth_date: formatDateForInput(student.birth_date),
    religion: student.religion || null,
    address: student.address || null,
    photo_url: student.photo_url || null,
    father_name: student.father_name || null,
    mother_name: student.mother_name || null,
    parent_phone: student.parent_phone || null,
    enrollment_date: formatDateForInput(student.enrollment_date),
    status: student.status,
    class_id: student.current_class?.class_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('admin.students.update', student.id), {
      preserveScroll: true,
    });
  };

  return (
    <AdminLayout title="Edit Data Siswa">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Data Siswa</h1>
          <p className="text-gray-600 mt-1">
            {student.name} - {student.nis}
          </p>
        </div>
        <Link
          href={route('admin.students.show', student.id)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          <i className="fas fa-arrow-left mr-2"></i>Kembali
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <StudentForm
            formData={data}
            setFormData={setData}
            errors={errors}
            schools={schools}
            class_rooms={class_rooms}
            isEdit={true}
          />

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <Link
              href={route('admin.students.show', student.id)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-save mr-2"></i>
              {processing ? 'Memperbarui...' : 'Perbarui Data'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
