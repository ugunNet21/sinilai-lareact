// js/Pages/Auth/Login.tsx
import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <>
      <Head title="Login - SistemNilai" />
      
      <AuthenticationCard
        title="Masuk ke Akun Anda"
        subtitle="Selamat datang kembali! Silakan masuk untuk mengelola sistem nilai."
      >
        {status && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
            {status}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <InputLabel htmlFor="email" className="text-gray-700 font-medium">
              Email
            </InputLabel>
            <TextInput
              id="email"
              type="email"
              className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
              value={form.data.email}
              onChange={e => form.setData('email', e.currentTarget.value)}
              required
              autoFocus
              placeholder="masukkan email anda"
            />
            <InputError className="mt-2" message={form.errors.email} />
          </div>

          <div>
            <InputLabel htmlFor="password" className="text-gray-700 font-medium">
              Password
            </InputLabel>
            <TextInput
              id="password"
              type="password"
              className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
              required
              autoComplete="current-password"
              placeholder="masukkan password anda"
            />
            <InputError className="mt-2" message={form.errors.password} />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={form.data.remember === 'on'}
                onChange={e =>
                  form.setData('remember', e.currentTarget.checked ? 'on' : '')
                }
              />
              <span className="ml-2 text-sm text-gray-600">
                Ingat saya
              </span>
            </label>

            {canResetPassword && (
              <Link
                href={route('password.request')}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium transition"
              >
                Lupa password?
              </Link>
            )}
          </div>

          <PrimaryButton
            className={classNames(
              'w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition',
              { 'opacity-50 cursor-not-allowed': form.processing }
            )}
            disabled={form.processing}
          >
            {form.processing ? (
              <span className="flex items-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Memproses...
              </span>
            ) : (
              'Masuk'
            )}
          </PrimaryButton>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link
                href={route('register')}
                className="font-medium text-blue-600 hover:text-blue-500 transition"
              >
                Daftar di sini
              </Link>
            </span>
          </div>
        </form>

        {/* Demo Info (optional) */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 text-center">
            <i className="fas fa-info-circle mr-1"></i>
            Demo: admin@sekolah.test / password123
          </p>
        </div>
      </AuthenticationCard>
    </>
  );
}