// js/Pages/Admin/Dashboard.tsx
import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Admin/Dashboard/StatCard';

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard Overview">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Siswa"
          value={150}
          icon="fas fa-users"
          color="blue"
          trend="+12% dari bulan lalu"
        />
        
        <StatCard
          title="Rata-rata Nilai"
          value="76.5"
          icon="fas fa-chart-line"
          color="green"
          trend="+3.2 poin"
        />
        
        <StatCard
          title="Total Kelas"
          value={8}
          icon="fas fa-school"
          color="purple"
          description="7A, 7B, 8A, 8B, 9A, 9B..."
        />
        
        <StatCard
          title="Mata Pelajaran"
          value={12}
          icon="fas fa-book"
          color="orange"
          description="Matematika, Bahasa, IPA..."
        />
      </div>

      {/* Recent Activity atau chart bisa ditambahkan di sini */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user-plus text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Siswa baru ditambahkan</p>
                  <p className="text-xs text-gray-500">2 menit yang lalu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Statistik Nilai</h3>
          <div className="space-y-3">
            {[
              { label: 'A (85-100)', value: 25, color: 'bg-green-500' },
              { label: 'B (70-84)', value: 45, color: 'bg-blue-500' },
              { label: 'C (60-69)', value: 20, color: 'bg-yellow-500' },
              { label: 'D (<60)', value: 10, color: 'bg-red-500' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-8">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}