<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $studentId = $this->route('id');
        $isUpdate = $this->isMethod('PUT') || $this->isMethod('PATCH');
    
        $rules = [
            'school_id' => ['required', 'uuid', 'exists:schools,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'nullable',
                'email',
                'max:255',
                Rule::unique('students', 'email')->ignore($studentId)
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'gender' => ['required', Rule::in(['L', 'P'])],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'religion' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string'],
            'photo_url' => ['nullable', 'string', 'max:500'],
            'father_name' => ['nullable', 'string', 'max:255'],
            'mother_name' => ['nullable', 'string', 'max:255'],
            'parent_phone' => ['nullable', 'string', 'max:20'],
            'enrollment_date' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['ACTIVE', 'INACTIVE', 'GRADUATED', 'TRANSFERRED', 'DROPOUT'])],
            
            // For class assignment
            'class_id' => ['nullable', 'uuid', 'exists:class_rooms,id'],
        ];
    
        // Untuk NIS - hanya required saat create
        if ($isUpdate) {
            $rules['nis'] = [
                'nullable', // Bisa dikosongkan saat update
                'string',
                'max:50',
                Rule::unique('students', 'nis')->ignore($studentId)
            ];
        } else {
            $rules['nis'] = [
                'required',
                'string',
                'max:50',
                Rule::unique('students', 'nis')
            ];
        }
    
        // Untuk NISN - selalu optional
        $rules['nisn'] = [
            'nullable',
            'string',
            'max:50',
            Rule::unique('students', 'nisn')->ignore($studentId)
        ];
    
        return $rules;
    }

    public function messages(): array
    {
        return [
            'school_id.required' => 'Sekolah harus dipilih',
            'school_id.exists' => 'Sekolah tidak valid',
            'nis.required' => 'NIS wajib diisi',
            'nis.unique' => 'NIS sudah digunakan',
            'nisn.unique' => 'NISN sudah digunakan',
            'name.required' => 'Nama lengkap wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah digunakan',
            'gender.required' => 'Jenis kelamin wajib dipilih',
            'gender.in' => 'Jenis kelamin tidak valid',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini',
            'status.required' => 'Status wajib dipilih',
            'status.in' => 'Status tidak valid',
            'class_id.exists' => 'Kelas tidak valid',
        ];
    }

    public function attributes(): array
    {
        return [
            'school_id' => 'Sekolah',
            'nis' => 'NIS',
            'nisn' => 'NISN',
            'name' => 'Nama Lengkap',
            'email' => 'Email',
            'phone' => 'Telepon',
            'gender' => 'Jenis Kelamin',
            'birth_place' => 'Tempat Lahir',
            'birth_date' => 'Tanggal Lahir',
            'religion' => 'Agama',
            'address' => 'Alamat',
            'father_name' => 'Nama Ayah',
            'mother_name' => 'Nama Ibu',
            'parent_phone' => 'Telepon Orang Tua',
            'enrollment_date' => 'Tanggal Masuk',
            'status' => 'Status',
            'class_id' => 'Kelas',
        ];
    }

    /**
     * Prepare the data for validation.
     * Jika NIS/NISN kosong pada update, set menjadi null
     */
    protected function prepareForValidation()
    {
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            if ($this->has('nis') && empty($this->nis)) {
                $this->merge(['nis' => null]);
            }
            if ($this->has('nisn') && empty($this->nisn)) {
                $this->merge(['nisn' => null]);
            }
        }
    }
}
