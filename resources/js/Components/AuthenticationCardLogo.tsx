// js/components/AuthenticationCardLogo.tsx
import { Link } from '@inertiajs/react';
import React from 'react';

export default function AuthenticationCardLogo() {
  return (
    <Link href="/" className="flex flex-col items-center space-y-1">
      <div className="flex items-center space-x-2">
        <i className="fas fa-graduation-cap text-blue-600 text-3xl"></i>
        <span className="text-2xl font-bold text-blue-700">SistemNilai</span>
      </div>
      <div className="text-sm text-gray-500 italic">
        Membentuk Generasi Berprestasi
      </div>
    </Link>
  );
}
