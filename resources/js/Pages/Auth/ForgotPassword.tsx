// js/Pages/Auth/ForgotPassword.tsx
import { useForm, Head, Link } from '@inertiajs/react';
import classNames from 'classnames';
import React from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.email'));
  }

  return (
    <>
      <Head title="Lupa Password - SistemNilai" />
      
      <AuthenticationCard
        title="Reset Password"
        subtitle="Masukkan email Anda dan kami akan mengirimkan link reset password."
      >
        <div className="mb-6 text-sm text-gray-600 text-center">
          Lupa password Anda? Tidak masalah. Beri tahu kami alamat email Anda dan kami akan mengirimkan link reset password untuk memilih password baru.
        </div>

        {status && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm text-center">
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

          <div className="flex flex-col space-y-4">
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
                  Mengirim...
                </span>
              ) : (
                'Kirim Link Reset Password'
              )}
            </PrimaryButton>

            <Link
              href={route('login')}
              className="text-center text-sm text-blue-600 hover:text-blue-500 font-medium transition"
            >
              Kembali ke halaman login
            </Link>
          </div>
        </form>
      </AuthenticationCard>
    </>
  );
}