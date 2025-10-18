// js/Pages/Welcome.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/Layouts/FrontendLayout';
import Header from '@/Components/Frontend/Header';
import Hero from '@/Components/Frontend/Hero';
import Features from '@/Components/Frontend/Features';
import About from '@/Components/Frontend/About';
import CTA from '@/Components/Frontend/CTA';
import Footer from '@/Components/Frontend/Footer';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
}

export default function Welcome({ canRegister }: Props) {
  return (
    <FrontendLayout title="Sistem Nilai Siswa - Dashboard Pendidikan Modern">
      <Header canRegister={canRegister} />
      <Hero canRegister={canRegister} />
      <Features />
      <About canRegister={canRegister} />
      <CTA />
      <Footer />
    </FrontendLayout>
  );
}
