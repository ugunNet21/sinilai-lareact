// js/Components/Frontend/Footer.tsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">SistemNilai</h3>
          <p>
            Platform modern untuk manajemen nilai siswa, kelas, dan laporan
            akademik berbasis web.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Navigasi</h3>
          <ul className="space-y-2">
            <li>
              <a href="#fitur" className="hover:text-white">
                Fitur
              </a>
            </li>
            <li>
              <a href="#tentang" className="hover:text-white">
                Tentang
              </a>
            </li>
            <li>
              <a href="#daftar" className="hover:text-white">
                Daftar
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Kontak</h3>
          <p>
            <i className="fas fa-envelope mr-2"></i> support@sistemnilai.com
          </p>
          <p>
            <i className="fas fa-phone mr-2"></i> +62 812-3456-7890
          </p>
        </div>
      </div>
      <div className="mt-10 text-center border-t border-gray-700 pt-4 text-sm text-gray-500">
        &copy; 2025 SistemNilai. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}
