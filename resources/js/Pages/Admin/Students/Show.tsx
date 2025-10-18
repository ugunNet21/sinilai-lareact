// js/Pages/Admin/Students/Show.tsx
import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Student } from '@/types/student';
import { route } from '../../../../../vendor/tightenco/ziggy/src/js';

interface ShowProps {
  student: Student;
}

export default function StudentsShow({ student }: ShowProps) {
  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus siswa ${student.name}?`)) {
      router.delete(route('admin.students.destroy', student.id));
    }
  };

  const getStatusColor = (status: Student['status']) => {
    const lowerCaseStatus = status.toLowerCase();
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      graduated: 'bg-blue-100 text-blue-800',
      transferred: 'bg-yellow-100 text-yellow-800',
      dropout: 'bg-gray-100 text-gray-800',
    };
    return colors[lowerCaseStatus] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: Student['status']) => {
    const lowerCaseStatus = status.toLowerCase();
    const labels: Record<string, string> = {
      active: 'Aktif',
      inactive: 'Tidak Aktif',
      graduated: 'Lulus',
      transferred: 'Pindah',
      dropout: 'Dropout',
    };
    return labels[lowerCaseStatus] || status;
  };


  return (
    <AdminLayout title="Detail Siswa">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Detail Siswa</h1>
          <p className="text-gray-600 mt-1">Informasi lengkap siswa</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={route('admin.students.index')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>Kembali
          </Link>
          <Link
            href={route('admin.students.edit', student.id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <i className="fas fa-edit mr-2"></i>Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <i className="fas fa-trash mr-2"></i>Hapus
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                {student.photo_url ? (
                  <img 
                    src={student.photo_url} 
                    alt={student.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <i className="fas fa-user text-5xl text-gray-400"></i>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
              <p className="text-gray-600 font-mono mb-3">{student.nis}</p>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(student.status)}`}>
                {getStatusLabel(student.status)}
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah Nilai:</span>
                  <span className="font-semibold">{student.total_grades || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rata-rata:</span>
                  <span className="font-semibold text-blue-600">
                    {student.average_grade !== null && student.average_grade !== undefined ? student.average_grade.toFixed(2) : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-user-circle mr-2 text-blue-600"></i>
              Informasi Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">NIS</label>
                <p className="font-semibold text-gray-800">{student.nis}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">NISN</label>
                <p className="font-semibold text-gray-800">{student.nisn || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Nama Lengkap</label>
                <p className="font-semibold text-gray-800">{student.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Jenis Kelamin</label>
                <p className="font-semibold text-gray-800">
                  {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tempat Lahir</label>
                <p className="font-semibold text-gray-800">{student.birth_place || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Lahir</label>
                <p className="font-semibold text-gray-800">
                  {student.birth_date 
                    ? new Date(student.birth_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : '-'
                  }
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Agama</label>
                <p className="font-semibold text-gray-800">{student.religion || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tanggal Masuk</label>
                <p className="font-semibold text-gray-800">
                  {student.enrollment_date 
                    ? new Date(student.enrollment_date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : '-'
                  }
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Alamat</label>
                <p className="font-semibold text-gray-800">{student.address || '-'}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-phone mr-2 text-green-600"></i>
              Informasi Kontak
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <p className="font-semibold text-gray-800">{student.email || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Telepon</label>
                <p className="font-semibold text-gray-800">{student.phone || '-'}</p>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-users mr-2 text-purple-600"></i>
              Informasi Orang Tua
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Nama Ayah</label>
                <p className="font-semibold text-gray-800">{student.father_name || '-'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Nama Ibu</label>
                <p className="font-semibold text-gray-800">{student.mother_name || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Telepon Orang Tua</label>
                <p className="font-semibold text-gray-800">{student.parent_phone || '-'}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-graduation-cap mr-2 text-yellow-600"></i>
              Informasi Akademik
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Kelas Saat Ini</label>
                <p className="font-semibold text-gray-800">
                  {student.current_class 
                    ? `${student.current_class.class.name} - ${student.current_class.class.grade_level.name}`
                    : 'Belum ada kelas'
                  }
                </p>
              </div>
              {student.current_class && (
                <>
                  <div>
                    <label className="text-sm text-gray-600">Tahun Ajaran</label>
                    <p className="font-semibold text-gray-800">
                      {student.current_class.academic_year.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Semester</label>
                    <p className="font-semibold text-gray-800">
                      {student.current_class.semester.name}
                    </p>
                  </div>
                </>
              )}
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                  {getStatusLabel(student.status)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}