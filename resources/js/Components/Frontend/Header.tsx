// js/Components/Frontend/Header.tsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

interface HeaderProps {
  canRegister: boolean;
}

export default function Header({ canRegister }: HeaderProps) {
  const route = useRoute();
  const page = useTypedPage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-lg shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <i className="fas fa-graduation-cap text-blue-600 text-2xl"></i>
          <span className="text-xl font-bold text-blue-700">SistemNilai</span>
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
              href={route('admin.dashboard')}
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
                href={route('admin.dashboard')}
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
  );
}
