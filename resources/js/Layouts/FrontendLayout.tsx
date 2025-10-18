// js/Layouts/FrontendLayout.tsx
import React from 'react';
import { Head } from '@inertiajs/react';

interface FrontendLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function FrontendLayout({
  children,
  title = 'Sistem Nilai Siswa',
}: FrontendLayoutProps) {
  return (
    <>
      <Head title={title} />
      <div className="bg-gray-50 text-gray-800 min-h-screen">{children}</div>
    </>
  );
}
