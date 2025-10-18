// js/Pages/Admin/Students/_Form.tsx
import React from 'react';
import { SelectOption, StudentFormData } from '@/types/student';

interface StudentFormProps {
  formData: StudentFormData;
  setFormData: (data: StudentFormData) => void;
  errors?: Record<string, string>;
  schools: SelectOption[];
  class_rooms: SelectOption[];
  isEdit?: boolean;
}

export default function StudentForm({ 
  formData, 
  setFormData, 
  errors = {}, 
  schools, 
  class_rooms,
  isEdit = false 
}: StudentFormProps) {
  
  const handleChange = (field: keyof StudentFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* School */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sekolah <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.school_id}
              onChange={(e) => handleChange('school_id', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.school_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Pilih Sekolah</option>
              {schools.map((school) => (
                <option key={school.value} value={school.value}>
                  {school.label}
                </option>
              ))}
            </select>
            {errors.school_id && (
              <p className="mt-1 text-sm text-red-500">{errors.school_id}</p>
            )}
          </div>

          {/* NIS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIS {!isEdit && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={formData.nis}
              onChange={(e) => handleChange('nis', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.nis ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={isEdit ? "Kosongkan jika tidak ingin mengubah NIS" : "Masukkan NIS"}
            />
            {isEdit && (
              <p className="mt-1 text-xs text-gray-500">
                Kosongkan jika tidak ingin mengubah NIS
              </p>
            )}
            {errors.nis && (
              <p className="mt-1 text-sm text-red-500">{errors.nis}</p>
            )}
          </div>

          {/* NISN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NISN
            </label>
            <input
              type="text"
              value={formData.nisn}
              onChange={(e) => handleChange('nisn', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.nisn ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={isEdit ? "Kosongkan jika tidak ingin mengubah NISN" : "Masukkan NISN"}
            />
            {isEdit && (
              <p className="mt-1 text-xs text-gray-500">
                Kosongkan jika tidak ingin mengubah NISN
              </p>
            )}
            {errors.nisn && (
              <p className="mt-1 text-sm text-red-500">{errors.nisn}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Birth Place */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tempat Lahir
            </label>
            <input
              type="text"
              value={formData.birth_place || ''}
              onChange={(e) => handleChange('birth_place', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan tempat lahir"
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={formData.birth_date || ''}
              onChange={(e) => handleChange('birth_date', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.birth_date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.birth_date && (
              <p className="mt-1 text-sm text-red-500">{errors.birth_date}</p>
            )}
          </div>

          {/* Religion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agama
            </label>
            <select
              value={formData.religion || ''}
              onChange={(e) => handleChange('religion', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Agama</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kontak</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Masukkan email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telepon Siswa
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nomor telepon"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat
            </label>
            <textarea
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan alamat lengkap"
            />
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Orang Tua</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Father Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Ayah
            </label>
            <input
              type="text"
              value={formData.father_name || ''}
              onChange={(e) => handleChange('father_name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama ayah"
            />
          </div>

          {/* Mother Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Ibu
            </label>
            <input
              type="text"
              value={formData.mother_name || ''}
              onChange={(e) => handleChange('mother_name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama ibu"
            />
          </div>

          {/* Parent Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telepon Orang Tua
            </label>
            <input
              type="tel"
              value={formData.parent_phone || ''}
              onChange={(e) => handleChange('parent_phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nomor telepon orang tua"
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Akademik</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kelas
            </label>
            <select
              value={formData.class_id || ''}
              onChange={(e) => handleChange('class_id', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kelas</option>
              {class_rooms.map((cls) => (
                <option key={cls.value} value={cls.value}>
                  {cls.label}
                </option>
              ))}
            </select>
          </div>

          {/* Enrollment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Masuk
            </label>
            <input
              type="date"
              value={formData.enrollment_date || ''}
              onChange={(e) => handleChange('enrollment_date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.status ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Pilih Status</option>
              <option value="ACTIVE">Aktif</option>
              <option value="INACTIVE">Tidak Aktif</option>
              <option value="GRADUATED">Lulus</option>
              <option value="TRANSFERRED">Pindah</option>
              <option value="DROPOUT">Dropout</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-500">{errors.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}