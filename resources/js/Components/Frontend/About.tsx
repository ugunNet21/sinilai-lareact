// js/Components/Frontend/About.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

interface AboutProps {
  canRegister: boolean;
}

export default function About({ canRegister }: AboutProps) {
  const route = useRoute();
  const page = useTypedPage();

  return (
    <section id="tentang" className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Tentang SistemNilai
          </h2>
          <p className="text-gray-600 mb-4">
            SistemNilai adalah solusi digital yang memudahkan guru dan sekolah
            dalam pengelolaan nilai siswa secara efisien. Dengan tampilan yang
            sederhana, data terorganisir dengan baik, dan akses cepat, setiap
            guru dapat bekerja lebih produktif.
          </p>
          <p className="text-gray-600 mb-6">
            Didesain responsif, kompatibel dengan perangkat apapun, dan dapat
            diintegrasikan dengan sistem sekolah lain.
          </p>
          {page.props.auth.user ? (
            <Link
              href={route('dashboard')}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Buka Dashboard
            </Link>
          ) : (
            <Link
              href={canRegister ? route('register') : route('login')}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Daftar Sekarang
            </Link>
          )}
        </div>
        <div className="flex justify-center">
          <img
            src="https://cdn.dribbble.com/userupload/13025816/file/original-57868f5adc612369ed85794f6c477bfe.jpg?resize=752x&vertical=center"
            alt="Ilustrasi Sistem Nilai"
            className="rounded-2xl shadow-lg w-full md:w-4/5"
          />
        </div>
      </div>
    </section>
  );
}
