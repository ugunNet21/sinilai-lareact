// js/Pages/Admin/Grades/Index.tsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

interface Grade {
  id: number;
  nama: string;
  kelas: string;
  mapel: string;
  nilai: number;
  grade: string;
}

export default function GradesIndex() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const nilaiData: Grade[] = [
    { id: 1, nama: 'Andi', kelas: '7A', mapel: 'Matematika', nilai: 80, grade: 'B' },
    { id: 2, nama: 'Andi', kelas: '7A', mapel: 'Bahasa', nilai: 70, grade: 'B' },
    { id: 3, nama: 'Budi', kelas: '7A', mapel: 'Matematika', nilai: 60, grade: 'C' },
    { id: 4, nama: 'Budi', kelas: '7A', mapel: 'Bahasa', nilai: 75, grade: 'B' },
    { id: 5, nama: 'Citra', kelas: '7B', mapel: 'Matematika', nilai: 90, grade: 'A' },
    { id: 6, nama: 'Citra', kelas: '7B', mapel: 'Bahasa', nilai: 85, grade: 'A' }
  ];

  const getGradeColor = (grade: string) => {
    const colors = {
      'A': 'bg-green-100 text-green-800',
      'B': 'bg-blue-100 text-blue-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'D': 'bg-red-100 text-red-800'
    };
    return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout title="Data Nilai Siswa">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Data Nilai Siswa</h1>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowImportModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <i className="fas fa-file-import mr-2"></i>Import Excel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <i className="fas fa-file-export mr-2"></i>Export Excel
          </button>
          <Link
            href="/admin/grades/create"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <i className="fas fa-plus mr-2"></i>Tambah Nilai
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
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Semua Mapel</option>
            <option>Matematika</option>
            <option>Bahasa Indonesia</option>
            <option>IPA</option>
          </select>
          
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>Semua Grade</option>
            <option>A (85-100)</option>
            <option>B (70-84)</option>
            <option>C (60-69)</option>
            <option>D (&lt;60)</option>
          </select>
          
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kelas</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Mapel</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nilai</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Grade</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {nilaiData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.kelas}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.mapel}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{item.nilai}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(item.grade)}`}>
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/grades/${item.id}/edit`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
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
          <p className="text-sm text-gray-600">Menampilkan 1-6 dari 6 data</p>
          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Previous</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Next</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}