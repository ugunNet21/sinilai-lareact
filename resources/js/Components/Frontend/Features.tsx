// js/Components/Frontend/Features.tsx
import React from 'react';

export default function Features() {
  const features = [
    {
      icon: 'fas fa-chart-line',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      title: 'Dashboard Interaktif',
      description:
        'Pantau statistik siswa, rata-rata nilai, dan performa kelas dalam satu tampilan intuitif.',
    },
    {
      icon: 'fas fa-file-excel',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      title: 'Import & Export Data',
      description:
        'Kelola nilai dengan mudah melalui fitur impor dan ekspor Excel tanpa ribet.',
    },
    {
      icon: 'fas fa-lock',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
      title: 'Keamanan Data',
      description:
        'Data siswa tersimpan dengan aman menggunakan enkripsi dan autentikasi multi-level.',
    },
  ];

  return (
    <section id="fitur" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          Fitur Unggulan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div
                className={`w-16 h-16 mx-auto ${feature.bgColor} ${feature.textColor} flex items-center justify-center rounded-full mb-6`}
              >
                <i className={`${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
