import React, { useState, type ChangeEvent, type FormEvent } from 'react';

interface FormState {
  namaLengkap: string;
  email: string;
  noHp: string;
  username: string;
  password: string;
  jabatan: string;
  kategori: string;
  namaKategori: string;
  akses: string[];
  fotoKtp: File | null;
  suratKontrak: File | null;
}

const UserForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    namaLengkap: '',
    email: '',
    noHp: '',
    username: '',
    password: '',
    jabatan: 'Direktur',
    kategori: 'Keuangan',
    namaKategori: '',
    akses: [],
    fotoKtp: null,
    suratKontrak: null,
  });

  const toggleAkses = (value: string) => {
    setForm((prev) => ({
      ...prev,
      akses: prev.akses.includes(value) ? prev.akses.filter((a) => a !== value) : [...prev.akses, value],
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'fotoKtp' | 'suratKontrak') => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setForm((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('namaLengkap', form.namaLengkap);
    formData.append('email', form.email);
    formData.append('noHp', form.noHp);
    formData.append('username', form.username);
    formData.append('password', form.password);
    formData.append('jabatan', form.jabatan);
    formData.append('kategori', form.kategori);
    formData.append('namaKategori', form.namaKategori);
    form.akses.forEach((a, i) => formData.append(`akses[${i}]`, a));
    if (form.fotoKtp) formData.append('fotoKtp', form.fotoKtp);
    if (form.suratKontrak) formData.append('suratKontrak', form.suratKontrak);

    // Simulasi kirim data
    console.log('Form Submitted:');
    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val);
    }
  };

  return (
    <div className="px-12 py-8">
      <div className="w-full min-h-screen bg-white rounded-md shadow-md p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri */}
          <div className="space-y-4">
            <Input label="Nama Lengkap" name="namaLengkap" value={form.namaLengkap} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Nomor Hp" name="noHp" value={form.noHp} onChange={handleChange} />
            <Input label="Username" name="username" value={form.username} onChange={handleChange} />
            <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

            <div>
              <label className="block font-semibold mb-2">
                Dokumen Tambahan <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                <div className="border border-dashed border-black rounded-md p-4 text-center">
                  <p className="font-semibold mb-2">
                    Upload Foto KTP <span className="text-red-500">*</span>
                  </p>
                  <input type="file" onChange={(e) => handleFileChange(e, 'fotoKtp')} accept="image/*" />
                </div>
                <div className="border border-dashed border-black rounded-md p-4 text-center">
                  <p className="font-semibold mb-2">
                    Upload Surat Kontrak Kerja & Jabatan <span className="text-red-500">*</span>
                  </p>
                  <input type="file" onChange={(e) => handleFileChange(e, 'suratKontrak')} />
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-4">
            <Select label="Jabatan" name="jabatan" value={form.jabatan} onChange={handleChange} options={['Direktur', 'Manajer']} />
            <Select label="Kategori" name="kategori" value={form.kategori} onChange={handleChange} options={['Keuangan', 'Operasional']} />
            <Input label="Nama Kategori" name="namaKategori" value={form.namaKategori} onChange={handleChange} placeholder="Cth: Operasi" />

            <button type="button" className="bg-black text-white px-4 py-2 rounded-md font-semibold mt-2">
              + Simpan
            </button>

            <div>
              <label className="block font-semibold mb-2">
                Level Akses <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Chart', 'Invest', 'E-commerce', 'Program', 'Reward', 'User', 'Approval', 'Notification', 'Activity'].map((akses) => (
                  <label key={akses}>
                    <input type="checkbox" checked={form.akses.includes(akses)} onChange={() => toggleAkses(akses)} /> {akses}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button type="button" className="border border-black px-4 py-2 rounded-md">
                Batalkan
              </button>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-md font-semibold">
                Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Komponen input terpisah agar lebih rapi
const Input = ({ label, name, value, onChange, type = 'text', placeholder }: { label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string }) => (
  <div>
    <label className="block font-semibold">
      {label} <span className="text-red-500">*</span>
    </label>
    <input name={name} value={value} type={type} onChange={onChange} placeholder={placeholder} className="w-full border border-black rounded-md px-4 py-2" />
  </div>
);

const Select = ({ label, name, value, onChange, options }: { label: string; name: string; value: string; onChange: (e: ChangeEvent<HTMLSelectElement>) => void; options: string[] }) => (
  <div>
    <label className="block font-semibold">
      {label} <span className="text-red-500">*</span>
    </label>
    <select name={name} value={value} onChange={onChange} className="w-full border border-black rounded-md px-4 py-2">
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default UserForm;
