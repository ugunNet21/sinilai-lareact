// js/Layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import AdminHeader from '@/Components/Admin/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title = 'Dashboard' }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Head title={`${title} - SistemNilai Admin`} />
      
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        <div className="lg:ml-64">
          <AdminHeader 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            title={title}
          />
          
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}