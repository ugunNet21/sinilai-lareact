// js/Pages/Admin/Students/Index.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Student {
  id: number;
  nama: string;
  kelas: string;
  nis: string;
  jumlah_nilai: number;
  rata_rata: number;
  status: string;
}

export default function StudentsIndex() {
  const siswaData: Student[] = [
    { id: 1, nama: 'Andi Wijaya', kelas: '7A', nis: '2024001', jumlah_nilai: 8, rata_rata: 85.5, status: 'Aktif' },
    { id: 2, nama: 'Budi Santoso', kelas: '7A', nis: '2024002', jumlah_nilai: 8, rata_rata: 78.2, status: 'Aktif' },
    { id: 3, nama: 'Citra Lestari', kelas: '7B', nis: '2024003', jumlah_nilai: 8, rata_rata: 92.1, status: 'Aktif' },
    { id: 4, nama: 'Dewi Anggraini', kelas: '7B', nis: '2024004', jumlah_nilai: 7, rata_rata: 76.8, status: 'Aktif' },
    { id: 5, nama: 'Eko Prasetyo', kelas: '8A', nis: '2023001', jumlah_nilai: 10, rata_rata: 81.3, status: 'Aktif' },
    { id: 6, nama: 'Fitri Handayani', kelas: '8A', nis: '2023002', jumlah_nilai: 9, rata_rata: 88.9, status: 'Aktif' },
  ];

  const getStatusColor = (status: string) => {
    return status === 'Aktif' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <AdminLayout title="Data Siswa">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Data Siswa</h1>
        
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <i className="fas fa-file-import mr-2"></i>Import Excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <i className="fas fa-file-export mr-2"></i>Export Excel
          </button>
          <Link
            href="/admin/students/create"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <i className="fas fa-plus mr-2"></i>Tambah Siswa
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Semua Kelas</option>
            <option>7A</option>
            <option>7B</option>
            <option>8A</option>
            <option>8B</option>
            <option>9A</option>
            <option>9B</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Tidak Aktif</option>
          </select>
          
          <input 
            type="text" 
            placeholder="Cari nama atau NIS..." 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            <i className="fas fa-filter mr-2"></i>Filter
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">No</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">NIS</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kelas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Jumlah Nilai</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rata-rata</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {siswaData.map((siswa, index) => (
                <tr key={siswa.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{siswa.nis}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{siswa.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{siswa.kelas}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{siswa.jumlah_nilai}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {siswa.rata_rata}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(siswa.status)}`}>
                      {siswa.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/students/${siswa.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      <Link
                        href={`/admin/students/${siswa.id}/edit`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">Menampilkan 1-6 dari 150 data</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}