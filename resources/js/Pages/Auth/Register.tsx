// js/Pages/Auth/Registes.tsx
import { Link, useForm, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import AuthenticationCard from '@/Components/AuthenticationCard';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <>
      <Head title="Daftar - SistemNilai" />
      
      <AuthenticationCard
        title="Buat Akun Baru"
        subtitle="Bergabung dengan SistemNilai untuk mulai mengelola nilai siswa dengan mudah."
      >
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <InputLabel htmlFor="name" className="text-gray-700 font-medium">
              Nama Lengkap
            </InputLabel>
            <TextInput
              id="name"
              type="text"
              className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
              value={form.data.name}
              onChange={e => form.setData('name', e.currentTarget.value)}
              required
              autoFocus
              autoComplete="name"
              placeholder="masukkan nama lengkap"
            />
            <InputError className="mt-2" message={form.errors.name} />
          </div>

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
              placeholder="contoh@email.com"
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
              autoComplete="new-password"
              placeholder="buat password yang kuat"
            />
            <InputError className="mt-2" message={form.errors.password} />
          </div>

          <div>
            <InputLabel htmlFor="password_confirmation" className="text-gray-700 font-medium">
              Konfirmasi Password
            </InputLabel>
            <TextInput
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition"
              value={form.data.password_confirmation}
              onChange={e =>
                form.setData('password_confirmation', e.currentTarget.value)
              }
              required
              autoComplete="new-password"
              placeholder="ulangi password anda"
            />
            <InputError
              className="mt-2"
              message={form.errors.password_confirmation}
            />
          </div>

          {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
            <div className="mt-4">
              <label className="flex items-start">
                <Checkbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={e => form.setData('terms', e.currentTarget.checked)}
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  Saya setuju dengan{' '}
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="text-blue-600 hover:text-blue-500 font-medium transition"
                  >
                    Syarat Layanan
                  </a>{' '}
                  dan{' '}
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="text-blue-600 hover:text-blue-500 font-medium transition"
                  >
                    Kebijakan Privasi
                  </a>
                </span>
              </label>
              <InputError className="mt-2" message={form.errors.terms} />
            </div>
          )}

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
                Membuat Akun...
              </span>
            ) : (
              'Daftar Sekarang'
            )}
          </PrimaryButton>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link
                href={route('login')}
                className="font-medium text-blue-600 hover:text-blue-500 transition"
              >
                Masuk di sini
              </Link>
            </span>
          </div>
        </form>
      </AuthenticationCard>
    </>
  );
}