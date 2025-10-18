// js/Pages/Admin/Grades/Create.tsx
import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function GradesCreate() {
  const { data, setData, post, processing, errors } = useForm({
    siswa_id: '',
    mapel: '',
    nilai: '',
    jenis_nilai: 'harian',
    semester: '1',
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: ''
  });

  // Mock data siswa - dalam aplikasi real akan dari props/API
  const siswaData = [
    { id: 1, nama: 'Andi Wijaya', kelas: '7A', nis: '2024001' },
    { id: 2, nama: 'Budi Santoso', kelas: '7A', nis: '2024002' },
    { id: 3, nama: 'Citra Lestari', kelas: '7B', nis: '2024003' },
    { id: 4, nama: 'Dewi Anggraini', kelas: '7B', nis: '2024004' },
    { id: 5, nama: 'Eko Prasetyo', kelas: '8A', nis: '2023001' },
  ];

  const mataPelajaran = [
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'IPA',
    'IPS',
    'Pendidikan Agama',
    'PKN',
    'Seni Budaya',
    'PJOK',
    'Prakarya'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/grades');
  };

  const calculateGrade = (nilai: number) => {
    if (nilai >= 85) return { grade: 'A', color: 'text-green-600' };
    if (nilai >= 70) return { grade: 'B', color: 'text-blue-600' };
    if (nilai >= 60) return { grade: 'C', color: 'text-yellow-600' };
    return { grade: 'D', color: 'text-red-600' };
  };

  const selectedSiswa = siswaData.find(s => s.id === parseInt(data.siswa_id));
  const gradeInfo = data.nilai ? calculateGrade(parseInt(data.nilai)) : null;

  return (
    <AdminLayout title="Tambah Nilai Siswa">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Nilai Siswa</h1>
        <Link
          href="/admin/grades"
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          <i className="fas fa-arrow-left mr-2"></i>Kembali
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Input */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Siswa <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.siswa_id}
                    onChange={(e) => setData('siswa_id', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Siswa</option>
                    {siswaData.map((siswa) => (
                      <option key={siswa.id} value={siswa.id}>
                        {siswa.nama} - {siswa.kelas} (NIS: {siswa.nis})
                      </option>
                    ))}
                  </select>
                  {errors.siswa_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.siswa_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mata Pelajaran <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.mapel}
                    onChange={(e) => setData('mapel', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Pilih Mata Pelajaran</option>
                    {mataPelajaran.map((mapel) => (
                      <option key={mapel} value={mapel}>{mapel}</option>
                    ))}
                  </select>
                  {errors.mapel && (
                    <p className="mt-1 text-sm text-red-600">{errors.mapel}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Nilai <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.jenis_nilai}
                    onChange={(e) => setData('jenis_nilai', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="harian">Harian</option>
                    <option value="uts">UTS</option>
                    <option value="uas">UAS</option>
                    <option value="tugas">Tugas</option>
                    <option value="praktik">Praktik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.semester}
                    onChange={(e) => setData('semester', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nilai (0-100) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={data.nilai}
                    onChange={(e) => setData('nilai', e.target.value)}
                    min="0"
                    max="100"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nilai"
                  />
                  {errors.nilai && (
                    <p className="mt-1 text-sm text-red-600">{errors.nilai}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Penilaian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={data.tanggal}
                    onChange={(e) => setData('tanggal', e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan
                  </label>
                  <textarea
                    value={data.keterangan}
                    onChange={(e) => setData('keterangan', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Tambahkan keterangan (opsional)"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Link
                  href="/admin/grades"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <span className="flex items-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Menyimpan...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <i className="fas fa-save mr-2"></i>
                      Simpan Nilai
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview & Information */}
        <div className="space-y-6">
          {/* Student Info */}
          {selectedSiswa && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Siswa</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{selectedSiswa.nama}</p>
                    <p className="text-sm text-gray-600">Kelas {selectedSiswa.kelas}</p>
                    <p className="text-xs text-gray-500">NIS: {selectedSiswa.nis}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grade Preview */}
          {data.nilai && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview Nilai</h3>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  <span className={gradeInfo?.color}>{data.nilai}</span>
                </div>
                {gradeInfo && (
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    gradeInfo.grade === 'A' ? 'bg-green-100 text-green-800' :
                    gradeInfo.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                    gradeInfo.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Grade: {gradeInfo.grade}
                  </div>
                )}
                <p className="text-sm text-gray-600 mt-3">
                  {data.mapel && `Mata Pelajaran: ${data.mapel}`}
                </p>
                <p className="text-sm text-gray-600">
                  {data.jenis_nilai && `Jenis: ${data.jenis_nilai.toUpperCase()}`}
                </p>
              </div>
            </div>
          )}

          {/* Grade Scale Info */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h4 className="text-blue-800 font-semibold mb-3">Skala Penilaian</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">A (Sangat Baik)</span>
                <span className="text-blue-700 font-semibold">85 - 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">B (Baik)</span>
                <span className="text-blue-700 font-semibold">70 - 84</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">C (Cukup)</span>
                <span className="text-blue-700 font-semibold">60 - 69</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">D (Kurang)</span>
                <span className="text-blue-700 font-semibold">0 - 59</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}