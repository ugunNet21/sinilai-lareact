// js/Pages/Welcome.tsx
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head } from '@inertiajs/react';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({
  canLogin,
  canRegister,
  laravelVersion,
  phpVersion,
}: Props) {
  const route = useRoute();
  const page = useTypedPage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head title="Sistem Nilai Siswa - Dashboard Pendidikan Modern" />

      <div className="bg-gray-50 text-gray-800">
        {/* Header / Navbar */}
        <header className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-lg shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="flex items-center space-x-2">
              <i className="fas fa-graduation-cap text-blue-600 text-2xl"></i>
              <span className="text-xl font-bold text-blue-700">
                SistemNilai
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 font-medium">
              <a href="#fitur" className="hover:text-blue-600 transition">
                Fitur
              </a>
              <a href="#tentang" className="hover:text-blue-600 transition">
                Tentang
              </a>
              <a href="#kontak" className="hover:text-blue-600 transition">
                Kontak
              </a>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {page.props.auth.user ? (
                <Link
                  href={route('dashboard')}
                  className="px-4 py-2 rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="px-4 py-2 rounded-lg text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition"
                  >
                    Login
                  </Link>
                  {canRegister && (
                    <Link
                      href={route('register')}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Daftar
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-700"
            >
              <i
                className={
                  menuOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl'
                }
              ></i>
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t">
              <nav className="flex flex-col space-y-3 p-4 text-center font-medium">
                <a href="#fitur" className="hover:text-blue-600">
                  Fitur
                </a>
                <a href="#tentang" className="hover:text-blue-600">
                  Tentang
                </a>
                <a href="#kontak" className="hover:text-blue-600">
                  Kontak
                </a>
                {page.props.auth.user ? (
                  <Link
                    href={route('dashboard')}
                    className="text-blue-600 border-t pt-3"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href={route('login')}
                      className="text-blue-600 border-t pt-3"
                    >
                      Login
                    </Link>
                    {canRegister && (
                      <Link
                        href={route('register')}
                        className="text-white bg-blue-600 rounded-lg py-2"
                      >
                        Daftar
                      </Link>
                    )}
                  </>
                )}
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section */}
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

        {/* Fitur Section */}
        <section id="fitur" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">
              Fitur Unggulan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-6">
                  <i className="fas fa-chart-line text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Dashboard Interaktif
                </h3>
                <p className="text-gray-600">
                  Pantau statistik siswa, rata-rata nilai, dan performa kelas
                  dalam satu tampilan intuitif.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 flex items-center justify-center rounded-full mb-6">
                  <i className="fas fa-file-excel text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Import & Export Data
                </h3>
                <p className="text-gray-600">
                  Kelola nilai dengan mudah melalui fitur impor dan ekspor Excel
                  tanpa ribet.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition">
                <div className="w-16 h-16 mx-auto bg-purple-100 text-purple-600 flex items-center justify-center rounded-full mb-6">
                  <i className="fas fa-lock text-2xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Keamanan Data</h3>
                <p className="text-gray-600">
                  Data siswa tersimpan dengan aman menggunakan enkripsi dan
                  autentikasi multi-level.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tentang Section */}
        <section id="tentang" className="py-20 bg-gray-50 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Tentang SistemNilai
              </h2>
              <p className="text-gray-600 mb-4">
                SistemNilai adalah solusi digital yang memudahkan guru dan
                sekolah dalam pengelolaan nilai siswa secara efisien. Dengan
                tampilan yang sederhana, data terorganisir dengan baik, dan
                akses cepat, setiap guru dapat bekerja lebih produktif.
              </p>
              <p className="text-gray-600 mb-6">
                Didesain responsif, kompatibel dengan perangkat apapun, dan
                dapat diintegrasikan dengan sistem sekolah lain.
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

        {/* CTA Section */}
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

        {/* Footer */}
        <footer id="kontak" className="bg-gray-900 text-gray-300 py-10 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                SistemNilai
              </h3>
              <p>
                Platform modern untuk manajemen nilai siswa, kelas, dan laporan
                akademik berbasis web.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Navigasi
              </h3>
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
      </div>
    </>
  );
}
