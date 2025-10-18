// js/Pages/Admin/Reports/Index.tsx
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

interface NilaiReportItem {
  kelas: string;
  mapel: string;
  rata_rata: number;
  tertinggi: number;
  terendah: number;
}

interface SiswaReportItem {
  nama: string;
  kelas: string;
  rata_rata: number;
  ranking: number;
}

interface ReportData {
  nilai: NilaiReportItem[];
  siswa: SiswaReportItem[];
  kehadiran: [];
  progress: [];
}

export default function ReportsIndex() {
  const [reportType, setReportType] = useState<keyof ReportData>('nilai');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const reportData: ReportData = {
    nilai: [
      {
        kelas: '7A',
        mapel: 'Matematika',
        rata_rata: 78.5,
        tertinggi: 95,
        terendah: 60,
      },
      {
        kelas: '7A',
        mapel: 'Bahasa Indonesia',
        rata_rata: 82.3,
        tertinggi: 92,
        terendah: 65,
      },
      {
        kelas: '7B',
        mapel: 'Matematika',
        rata_rata: 81.2,
        tertinggi: 98,
        terendah: 68,
      },
      {
        kelas: '7B',
        mapel: 'Bahasa Indonesia',
        rata_rata: 79.8,
        tertinggi: 94,
        terendah: 62,
      },
    ],
    siswa: [
      { nama: 'Andi Wijaya', kelas: '7A', rata_rata: 85.5, ranking: 1 },
      { nama: 'Citra Lestari', kelas: '7B', rata_rata: 92.1, ranking: 2 },
      { nama: 'Fitri Handayani', kelas: '8A', rata_rata: 88.9, ranking: 3 },
      { nama: 'Eko Prasetyo', kelas: '8A', rata_rata: 81.3, ranking: 4 },
    ],
    kehadiran: [],
    progress: [],
  };

  const generateReport = () => {
    console.log(`Generating ${reportType} report...`);
  };

  const exportReport = () => {
    console.log(`Exporting ${reportType} report to PDF...`);
  };

  return (
    <AdminLayout title="Laporan Akademik">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Laporan Akademik
        </h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <i className="fas fa-file-pdf mr-2"></i>Export PDF
          </button>
          <button
            onClick={generateReport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <i className="fas fa-sync-alt mr-2"></i>Generate Report
          </button>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Konfigurasi Laporan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Laporan
            </label>
            <select
              value={reportType}
              onChange={e => setReportType(e.target.value as keyof ReportData)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="nilai">Laporan Nilai Kelas</option>
              <option value="siswa">Laporan Ranking Siswa</option>
              <option value="kehadiran">Laporan Kehadiran</option>
              <option value="progress">Laporan Progress Belajar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kelas
            </label>
            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Kelas</option>
              <option value="7A">Kelas 7A</option>
              <option value="7B">Kelas 7B</option>
              <option value="8A">Kelas 8A</option>
              <option value="8B">Kelas 8B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mata Pelajaran
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Mapel</option>
              <option value="matematika">Matematika</option>
              <option value="bahasa">Bahasa Indonesia</option>
              <option value="ipa">IPA</option>
              <option value="ips">IPS</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Periode
          </label>
          <div className="flex space-x-4">
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span className="self-center text-gray-500">s/d</span>
            <input
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            {reportType === 'nilai' && 'Laporan Nilai Kelas'}
            {reportType === 'siswa' && 'Laporan Ranking Siswa'}
            {reportType === 'kehadiran' && 'Laporan Kehadiran'}
            {reportType === 'progress' && 'Laporan Progress Belajar'}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {reportType === 'nilai' ? (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Kelas
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Mata Pelajaran
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Rata-rata
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Nilai Tertinggi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Nilai Terendah
                    </th>
                  </>
                ) : reportType === 'siswa' ? (
                  <>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Ranking
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Nama
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Kelas
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Rata-rata
                    </th>
                  </>
                ) : (
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Data Tidak Tersedia
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportType === 'nilai' &&
                reportData.nilai.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {item.kelas}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.mapel}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {item.rata_rata}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">
                      {item.tertinggi}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-semibold">
                      {item.terendah}
                    </td>
                  </tr>
                ))}

              {reportType === 'siswa' &&
                reportData.siswa.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.ranking === 1
                            ? 'bg-yellow-100 text-yellow-800'
                            : item.ranking === 2
                              ? 'bg-gray-200 text-gray-800'
                              : item.ranking === 3
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        #{item.ranking}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.kelas}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                      {item.rata_rata}
                    </td>
                  </tr>
                ))}

              {(reportType === 'kehadiran' || reportType === 'progress') && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center px-6 py-10 text-gray-500"
                  >
                    Data untuk laporan ini belum tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Data</p>
              <p className="text-2xl font-bold text-blue-800 mt-2">
                {reportData[reportType] ? reportData[reportType].length : 0}
              </p>
            </div>
            <i className="fas fa-chart-bar text-2xl text-blue-600"></i>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Rata-rata Umum
              </p>
              <p className="text-2xl font-bold text-green-800 mt-2">82.1</p>
            </div>
            <i className="fas fa-chart-line text-2xl text-green-600"></i>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Status</p>
              <p className="text-2xl font-bold text-purple-800 mt-2">Siap</p>
            </div>
            <i className="fas fa-check-circle text-2xl text-purple-600"></i>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
