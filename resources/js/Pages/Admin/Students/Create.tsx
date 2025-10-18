// js/Pages/Admin/Students/Create.tsx
import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import StudentForm from './_Form';
import { StudentFormData, SelectOption } from '@/types/student';
import { route } from 'ziggy-js';

interface CreateProps {
  schools: SelectOption[];
  class_rooms: SelectOption[];
}

export default function StudentsCreate({ schools, class_rooms }: CreateProps) {
  const { data, setData, post, processing, errors } = useForm<StudentFormData>({
    school_id: '',
    nis: '',
    nisn: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    birth_place: '',
    birth_date: '',
    religion: '',
    address: '',
    photo_url: '',
    father_name: '',
    mother_name: '',
    parent_phone: '',
    enrollment_date: '',
    status: 'ACTIVE',
    class_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.students.store'), {
      preserveScroll: true,
      onError: () => {
        // Error handling is automatic through flash messages
      }
    });
  };

  return (
    <AdminLayout title="Tambah Siswa Baru">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Siswa Baru</h1>
        <Link
          href={route('admin.students.index')}
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
            isEdit={false}
          />

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
            <Link
              href={route('admin.students.index')}
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
              {processing ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}