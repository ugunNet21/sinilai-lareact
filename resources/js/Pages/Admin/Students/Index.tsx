// js/Pages/Admin/Students/Index.tsx
import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Pagination from '@/Components/Admin/Pagination';
import { PaginatedStudents, StudentFilters, SelectOption, Student } from '@/types/student';
import { route } from 'ziggy-js';

interface IndexProps {
  students: PaginatedStudents;
  statistics: {
    total: number;
    active: number;
    inactive: number;
    graduated: number;
    male: number;
    female: number;
  };
  filters: StudentFilters;
  filterOptions: {
    class_rooms: SelectOption[];
    gradeLevels: SelectOption[];
    statuses: SelectOption[];
    genders: SelectOption[];
  };
}

export default function StudentsIndex({ 
  students, 
  statistics, 
  filters, 
  filterOptions 
}: IndexProps) {
  const [localFilters, setLocalFilters] = useState<StudentFilters>(filters);

  const handleFilter = () => {
    router.get(route('admin.students.index'), localFilters as any, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    const emptyFilters = {
      search: '',
      class_id: '',
      grade_level_id: '',
      status: '',
      gender: '',
    };
    setLocalFilters(emptyFilters);
    router.get(route('admin.students.index'), emptyFilters as any, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus siswa ${name}?`)) {
      router.delete(route('admin.students.destroy', id), {
        preserveScroll: true,
      });
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
    <AdminLayout title="Data Siswa">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Siswa</h1>
          <p className="text-gray-600">Kelola data siswa sekolah</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <i className="fas fa-file-import mr-2"></i>Import Excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <i className="fas fa-file-export mr-2"></i>Export Excel
          </button>
          <Link
            href={route('admin.students.create')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <i className="fas fa-plus mr-2"></i>Tambah Siswa
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Siswa</p>
              <p className="text-2xl font-bold text-gray-800">{statistics.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-users text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Aktif</p>
              <p className="text-2xl font-bold text-green-600">{statistics.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-check text-green-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Lulus</p>
              <p className="text-2xl font-bold text-blue-600">{statistics.graduated}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tidak Aktif</p>
              <p className="text-2xl font-bold text-red-600">{statistics.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-user-times text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Laki-laki</p>
              <p className="text-2xl font-bold text-indigo-600">{statistics.male}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-mars text-indigo-600 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perempuan</p>
              <p className="text-2xl font-bold text-pink-600">{statistics.female}</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-venus text-pink-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input 
            type="text" 
            placeholder="Cari nama, NIS, atau NISN..." 
            value={localFilters.search || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <select 
            value={localFilters.class_id || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, class_id: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Kelas</option>
            {filterOptions.class_rooms.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <select 
            value={localFilters.grade_level_id || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, grade_level_id: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Tingkat</option>
            {filterOptions.gradeLevels.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select 
            value={localFilters.status || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Status</option>
            {filterOptions.statuses.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <div className="flex gap-2">
            <button 
              onClick={handleFilter}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <i className="fas fa-search mr-2"></i>Cari
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              <i className="fas fa-redo"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">NIS</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kelas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Jenis Kelamin</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rata-rata</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.data.length > 0 ? (
                students.data.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {students.from + index}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      {student.nis}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{student.name}</p>
                        {student.email && (
                          <p className="text-xs text-gray-500">{student.email}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.current_class 
                        ? `${student.current_class.class.name} - ${student.current_class.class.grade_level.name}`
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </td>
                    <td className="px-6 py-4">
                      {student.average_grade !== null ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                          {student.average_grade}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                        {getStatusLabel(student.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={route('admin.students.show', student.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Lihat Detail"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <Link
                          href={route('admin.students.edit', student.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button 
                          onClick={() => handleDelete(student.id, student.name)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Hapus"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    <i className="fas fa-inbox text-4xl mb-3 block"></i>
                    <p>Tidak ada data siswa</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <Pagination 
          links={students.links}
          from={students.from}
          to={students.to}
          total={students.total}
          currentPage={students.current_page}
          lastPage={students.last_page}
          filters={localFilters} 
        />
      </div>
    </AdminLayout>
  );
}