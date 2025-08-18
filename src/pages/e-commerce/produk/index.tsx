import { getProduct } from '@/services/api'
import type { Product } from '@/services/inteface'
import React, { useEffect, useState } from 'react'

const dummyKategoriData: string[] = ['Semua', 'Fresh Food', 'Snack', 'Beverages', 'Meat']

const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount)
}

const ProgramProduk: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua')
    const [produkList, setProdukList] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [totalProduk, setTotalProduk] = useState<number>(0)

    // pagination state
    const [page, setPage] = useState<number>(1)
    const [perPage] = useState<number>(5)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProduct()
                console.log(res.data)

                // kalau API lo udah support pagination langsung, tinggal ganti ke res.data.data
                setProdukList(res.data)
                setTotalProduk(res.pagination?.total || res.data.length)
            } catch (err) {
                console.error('Gagal fetch produk:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const filteredProduk = selectedCategory === 'Semua' ? produkList : produkList.filter(() => true) // nanti lo tambahin logika kategori

    // handle pagination
    const startIdx = (page - 1) * perPage
    const endIdx = startIdx + perPage
    const currentProduk = filteredProduk.slice(startIdx, endIdx)
    const totalPages = Math.ceil(filteredProduk.length / perPage)

    if (loading) return <p className="p-6">Loading produk...</p>

    return (
        <main className="p-6 flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-5 min-h-screen font-sans">
                    <div className="flex justify-between items-start mb-8 flex-wrap gap-y-4">
                        {/* Kategori */}
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

                        {/* Total Produk */}
                        <div className="text-right">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Produk</h3>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-3xl">📦</span>
                                <span className="text-3xl font-bold text-gray-900">{totalProduk}</span>
                            </div>
                        </div>
                    </div>

                    {/* List Produk */}
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">List Produk</h2>
                    <div className="space-y-4">
                        {currentProduk.map((produk) => (
                            <div key={produk.id} className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition">
                                <img src={produk.image} alt={produk.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg text-gray-800">{produk.name}</h3>
                                    <p className="text-gray-600 text-sm">Terjual: {produk.total_sold}</p>
                                    <div className="mt-2 flex gap-3">
                                        <span className="font-bold text-blue-600 text-lg">{formatRupiah(produk.price)}</span>
                                        {produk.final_price !== produk.price && <span className="text-gray-500 line-through">{formatRupiah(produk.final_price)}</span>}
                                    </div>
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Beli</button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-8">
                        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className={`px-4 py-2 rounded-lg border ${page === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-400 hover:bg-blue-50'}`}>
                            Prev
                        </button>
                        <span className="text-gray-600">
                            Halaman {page} dari {totalPages}
                        </span>
                        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className={`px-4 py-2 rounded-lg border ${page === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-400 hover:bg-blue-50'}`}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProgramProduk
