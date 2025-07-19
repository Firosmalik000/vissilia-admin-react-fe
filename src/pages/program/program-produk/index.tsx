import React, { useState } from 'react';

export interface ProdukItem {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: string; // Bisa juga number, tergantung kebutuhan
  sold: string; // Bisa juga number, tergantung kebutuhan
  additionalInfo?: string; // Untuk angka 168/10 di bawah harga
}

// --- Data Dummy ---
const dummyProdukData: ProdukItem[] = [
  {
    id: 'prod-001',
    image: 'https://via.placeholder.com/150/ADD8E6/FFFFFF?text=Produk+1', // Ganti dengan URL gambar Anda
    name: 'Cicanic Soothing Cream SNP prop 200ml',
    price: 30000,
    stock: '10k+',
    sold: 'terjual',
    additionalInfo: '168',
  },
  {
    id: 'prod-002',
    image: 'https://via.placeholder.com/150/FFC0CB/FFFFFF?text=Produk+2', // Ganti dengan URL gambar Anda
    name: 'Cicanic Soothing Cream SNP prop 200ml',
    price: 80000,
    stock: '5k+',
    sold: 'terjual',
    additionalInfo: '10',
  },
  // Tambahkan lebih banyak data dummy jika diperlukan
];

const dummyKategoriData: string[] = ['Semua', 'Fresh Food', 'Snack', 'Beverages', 'Meat'];

// --- Fungsi Helper ---
const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// --- Komponen Produk ---
const ProgramProduk: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [produkList, setProdukList] = useState<ProdukItem[]>(dummyProdukData);

  // Filter produk berdasarkan kategori yang dipilih
  const filteredProduk =
    selectedCategory === 'Semua'
      ? produkList
      : produkList.filter((produk) => {
          // Logika filter kategori yang lebih kompleks mungkin diperlukan di sini,
          // misalnya jika setiap produk memiliki properti kategori.
          // Untuk contoh ini, kita hanya menampilkan semua jika "Semua" dipilih.
          return true; // placeholder
        });

  const totalProduk = filteredProduk.length;

  const handleEdit = (id: string) => {
    console.log(`Edit produk dengan ID: ${id}`);
    alert(`Edit produk dengan ID: ${id}`);
    // Implementasi logika edit di sini (misal: buka modal edit)
  };

  const handleDelete = (id: string) => {
    console.log(`Hapus produk dengan ID: ${id}`);
    if (window.confirm(`Apakah Anda yakin ingin menghapus produk dengan ID: ${id}?`)) {
      setProdukList((prevList) => prevList.filter((produk) => produk.id !== id));
    }
  };

  const handleAddProduk = () => {
    console.log('Tambah produk baru');
    alert('Fungsi Tambah Produk Baru');
    // Implementasi logika tambah produk di sini (misal: buka modal tambah)
  };

  return (
    <>
      <main className="p-6 flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="p-5  min-h-screen font-sans">
            <div className="flex justify-between items-start mb-8 flex-wrap gap-y-4">
              <div className="flex-1 min-w-[280px]">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Kategori</h2>
                <div className="flex flex-wrap gap-2">
                  {dummyKategoriData.map((category) => (
                    <button
                      key={category}
                      className={`px-5 py-2 rounded-full text-base transition-colors duration-200
                  ${selectedCategory === category ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Produk</h3>
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  <span className="text-3xl font-bold text-gray-900">{totalProduk}</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">List Produk</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProduk.map((produk) => (
                <div key={produk.id} className="bg-white rounded-xl shadow-lg p-5 text-center relative flex flex-col items-center group">
                  {/* Action Buttons (Edit/Delete) */}
                  <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-gray-800 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-opacity-90 transition-colors" onClick={() => handleEdit(produk.id)} title="Edit Produk">
                      ✏️
                    </button>
                    <button className="bg-red-500 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-opacity-90 transition-colors" onClick={() => handleDelete(produk.id)} title="Hapus Produk">
                      🗑️
                    </button>
                  </div>

                  <div className="relative mb-4 w-full flex justify-center">
                    <img src={produk.image} alt={produk.name} className="w-36 h-36 object-cover rounded-lg shadow-sm" />
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">{formatRupiah(produk.price)}</div>
                  </div>

                  <p className="font-semibold text-gray-800 mb-2 h-12 overflow-hidden line-clamp-2 text-ellipsis">{produk.name}</p>
                  <div className="flex justify-between items-center w-full px-2 mt-auto">
                    <span className="font-bold text-blue-600 text-lg">{formatRupiah(produk.price)}</span>
                    <span className="text-gray-500 text-sm">
                      {produk.stock}
                      {produk.sold}
                    </span>
                  </div>
                  {produk.additionalInfo && <div className="text-gray-400 text-xs mt-1">{produk.additionalInfo}</div>}
                </div>
              ))}

              {/* Add Product Card */}
              <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl flex flex-col justify-center items-center cursor-pointer p-5 transition-colors duration-200 hover:bg-gray-300" onClick={handleAddProduk}>
                <span className="text-gray-500 text-7xl font-light">+</span>
                <p className="text-gray-600 text-lg font-medium">Tambah Produk Baru</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProgramProduk;
