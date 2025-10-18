// js/Components/Frontend/Hero.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

interface HeroProps {
  canRegister: boolean;
}

export default function Hero({ canRegister }: HeroProps) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Digitalisasi Penilaian Siswa dengan{' '}
          <span className="text-yellow-300">SistemNilai</span>
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-8">
          Platform modern untuk mengelola data siswa, nilai, dan laporan
          akademik secara cepat, aman, dan efisien.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {page.props.auth.user ? (
            <Link
              href={route('dashboard')}
              className="px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg hover:bg-yellow-300 transition"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href={canRegister ? route('register') : route('login')}
              className="px-6 py-3 bg-yellow-400 text-blue-800 font-semibold rounded-lg hover:bg-yellow-300 transition"
            >
              Coba Sekarang
            </Link>
          )}
          <a
            href="#fitur"
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-blue-700 transition"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>
  );
}
