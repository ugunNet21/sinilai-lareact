// js/Components/Admin/AdminHeader.tsx
import React from 'react';
import { Link } from '@inertiajs/react';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  title: string;
}

export default function AdminHeader({ sidebarOpen, setSidebarOpen, title }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <i className="fas fa-bars text-2xl text-gray-700"></i>
        </button>
        
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari siswa, nilai, atau kelas..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <i className="fas fa-bell text-xl text-gray-600"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3 border-l pl-4">
            <img 
              src="https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff" 
              className="w-10 h-10 rounded-full"
              alt="Admin User"
            />
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}