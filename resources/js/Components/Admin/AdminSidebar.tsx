// js/Components/Admin/AdminSidebar.tsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
  const { url } = usePage();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'fas fa-chart-line', current: url === '/admin/dashboard' },
    { name: 'Data Siswa', href: '/admin/students', icon: 'fas fa-users', current: url.startsWith('/admin/students') },
    { name: 'Data Nilai', href: '/admin/grades', icon: 'fas fa-clipboard-list', current: url.startsWith('/admin/grades') },
    { name: 'Laporan', href: '/admin/reports', icon: 'fas fa-file-alt', current: url.startsWith('/admin/reports') },
    { name: 'Pengaturan', href: '/admin/settings', icon: 'fas fa-cog', current: url.startsWith('/admin/settings') },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-700">
          <Link href="/" className="flex items-center space-x-3">
            <i className="fas fa-graduation-cap text-2xl"></i>
            <span className="text-xl font-bold">SistemNilai</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                item.current 
                  ? 'bg-blue-700 text-white' 
                  : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <i className={`${item.icon} w-5`}></i>
              <span>{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-4 border-t border-blue-700 mt-4">
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer text-blue-100 hover:bg-red-600 hover:text-white transition w-full text-left"
            >
              <i className="fas fa-sign-out-alt w-5"></i>
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}