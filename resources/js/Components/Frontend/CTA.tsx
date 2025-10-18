// js/Components/Frontend/CTA.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

export default function CTA() {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <section
      id="daftar"
      className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 text-center text-white px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Mulai Digitalisasi Penilaian Sekarang!
        </h2>
        <p className="text-blue-100 mb-8">
          {page.props.auth.user
            ? 'Selamat datang di SistemNilai! Kelola data siswa dan nilai dengan mudah.'
            : 'Daftar gratis dan nikmati kemudahan mengelola data siswa, nilai, serta laporan sekolah dengan SistemNilai.'}
        </p>
        {page.props.auth.user ? (
          <Link
            href={route('dashboard')}
            className="px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Buka Dashboard
          </Link>
        ) : (
          <Link
            href={route('login')}
            className="px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Login Sekarang
          </Link>
        )}
      </div>
    </section>
  );
}
