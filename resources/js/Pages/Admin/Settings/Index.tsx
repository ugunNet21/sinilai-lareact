// js/Pages/Admin/Settings/Index.tsx
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function SettingsIndex() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    schoolName: 'SMP Negeri 1 Jakarta',
    schoolAddress: 'Jl. Pendidikan No. 123, Jakarta',
    phone: '(021) 1234567',
    email: 'info@smpn1jakarta.sch.id',
    academicYear: '2024/2025',
    gradeScale: '100',
    minPassingGrade: '65',
    autoBackup: true,
    emailNotifications: true,
  });

  const handleSaveSettings = () => {
    alert('Pengaturan berhasil disimpan!');
  };

  const handleResetSettings = () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan pengaturan ke default?')) {
      setSettings({
        schoolName: 'SMP Negeri 1 Jakarta',
        schoolAddress: 'Jl. Pendidikan No. 123, Jakarta',
        phone: '(021) 1234567',
        email: 'info@smpn1jakarta.sch.id',
        academicYear: '2024/2025',
        gradeScale: '100',
        minPassingGrade: '65',
        autoBackup: true,
        emailNotifications: true,
      });
      alert('Pengaturan telah direset ke default!');
    }
  };

  return (
    <AdminLayout title="Pengaturan Sistem">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Pengaturan Sistem</h1>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleResetSettings}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <i className="fas fa-undo mr-2"></i>Reset Default
          </button>
          <button 
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <i className="fas fa-save mr-2"></i>Simpan Pengaturan
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {[
              { id: 'general', name: 'Umum', icon: 'fas fa-cog' },
              { id: 'academic', name: 'Akademik', icon: 'fas fa-graduation-cap' },
              { id: 'notifications', name: 'Notifikasi', icon: 'fas fa-bell' },
              { id: 'backup', name: 'Backup', icon: 'fas fa-database' },
              { id: 'users', name: 'Pengguna', icon: 'fas fa-users' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className={tab.icon}></i>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Sekolah</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Sekolah</label>
                  <input
                    type="text"
                    value={settings.schoolName}
                    onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran</label>
                  <input
                    type="text"
                    value={settings.academicYear}
                    onChange={(e) => setSettings({...settings, academicYear: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Sekolah</label>
                  <textarea
                    value={settings.schoolAddress}
                    onChange={(e) => setSettings({...settings, schoolAddress: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Akademik</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skala Nilai</label>
                  <select
                    value={settings.gradeScale}
                    onChange={(e) => setSettings({...settings, gradeScale: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="100">0 - 100</option>
                    <option value="10">0 - 10</option>
                    <option value="4">0 - 4</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nilai Minimal Lulus</label>
                  <input
                    type="number"
                    value={settings.minPassingGrade}
                    onChange={(e) => setSettings({...settings, minPassingGrade: e.target.value})}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-blue-800 font-semibold mb-2">Informasi Skala Nilai</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>A: 85 - 100 (Sangat Baik)</p>
                  <p>B: 70 - 84 (Baik)</p>
                  <p>C: 60 - 69 (Cukup)</p>
                  <p>D: 0 - 59 (Kurang)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Notifikasi</h3>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">Aktifkan notifikasi email</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700">Backup otomatis mingguan</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Backup & Restore</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <i className="fas fa-download text-3xl text-blue-600 mb-4"></i>
                  <h4 className="font-semibold text-blue-800 mb-2">Backup Data</h4>
                  <p className="text-sm text-blue-600 mb-4">Download semua data sistem dalam format Excel</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Backup Sekarang
                  </button>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <i className="fas fa-upload text-3xl text-green-600 mb-4"></i>
                  <h4 className="font-semibold text-green-800 mb-2">Restore Data</h4>
                  <p className="text-sm text-green-600 mb-4">Upload file backup untuk mengembalikan data</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Pilih File
                  </button>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                  <div>
                    <h4 className="text-yellow-800 font-semibold">Peringatan</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Proses restore akan menggantikan semua data yang ada. Pastikan Anda telah melakukan backup terlebih dahulu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Manajemen Pengguna</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">Admin User</td>
                      <td className="px-6 py-4 text-sm text-gray-600">admin@sistemnilai.com</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          Administrator
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <i className="fas fa-plus mr-2"></i>Tambah Pengguna
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}