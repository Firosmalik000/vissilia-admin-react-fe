import { productUrl } from '@/pages/utils/imageUrl'
import { getCategoryActive, getProduct } from '@/services/api'
import { type Category, type Product } from '@/services/inteface'
import React, { useEffect, useState } from 'react'
import { ProductFormDialog } from './ProductFormDialog'

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
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [totalProduk, setTotalProduk] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [perPage] = useState<number>(5)
    const [search, setSearch] = useState<string>('')
    const [payload, setPayload] = useState<Product>()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const fetchProducts = async (page: number = 1, perPage: number, selectedCategory: string, search: string) => {
        setLoading(true)
        try {
            const res = await getProduct(page, perPage, selectedCategory, search)
            setProdukList(res.data)
            setTotalProduk(res.pagination?.total || res.data.length)
            setTotalPages(res.pagination?.last_page || 1)
        } catch (err) {
            console.error('Gagal fetch produk:', err)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        setLoadingCategories(true)
        try {
            const res = await getCategoryActive()
            setCategories(res.data)
        } catch (err) {
            console.error('Gagal fetch category:', err)
        } finally {
            setLoadingCategories(false)
        }
    }

    useEffect(() => {
        fetchProducts(page, perPage, selectedCategory, search)
    }, [page, selectedCategory, search])

    useEffect(() => {
        fetchCategories()
    }, [])
    const handleOpenData = (data: Product) => {
        setIsOpen(true)
        setPayload(data)
    }

    useEffect(() => {
        if (!isOpen) setPayload(undefined)
    }, [isOpen])

    return (
        <main className="p-6 flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-5 min-h-screen font-sans">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-y-4">
                        {/* Kategori */}
                        {loadingCategories ? (
                            <>
                                <div className="flex-1 min-w-[280px]">
                                    <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                                    <div className="flex flex-wrap gap-2">
                                        {Array.from({ length: 5 }).map((_, idx) => (
                                            <div key={idx} className="px-10 py-3 bg-gray-200 rounded-full animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex-1 min-w-[280px]">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Kategori</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                className={`px-5 py-2 rounded-full text-base transition-colors duration-200
                      ${selectedCategory === category.name ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                                onClick={() => setSelectedCategory(category.name)}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Total Produk */}
                        <div className="text-right">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Produk</h3>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-3xl">📦</span>
                                <span className="text-3xl font-bold text-gray-900">{totalProduk}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        {/* Search */}
                        <div className="flex-1 min-w-[200px] mb-4 max-w-sm py-2">
                            <input
                                type="text"
                                placeholder="Cari nama produk..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(1)
                                }}
                                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Tambah Produk */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => {
                                    setIsOpen(true)
                                }}
                                className="bg-green-600! text-white px-4 py-2 rounded-lg hover:bg-green-700! transition"
                            >
                                Tambah Produk
                            </button>
                        </div>
                    </div>
                    {/* List Produk */}
                    {loading ? (
                        <>
                            {/* Skeleton List Produk */}
                            <h2 className="h-7 w-40 bg-gray-200 rounded-md animate-pulse mb-6"></h2>
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <div key={idx} className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center">
                                        <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse"></div>
                                            <div className="h-4 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
                                            <div className="h-6 w-1/3 bg-gray-200 rounded-md animate-pulse"></div>
                                        </div>
                                        <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">List Produk</h2>
                            <div className="space-y-4">
                                {produkList.map((produk) => (
                                    <div key={produk.id} className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition">
                                        <img src={productUrl(produk.image)} alt={produk.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800">{produk.name}</h3>
                                            <p className="text-gray-600 text-sm">Terjual: {produk.total_sold}</p>
                                            <div className="mt-2 flex gap-3">
                                                <span className="font-bold text-blue-600 text-lg">{formatRupiah(produk.price)}</span>
                                                {produk.final_price !== produk.price && <span className="text-gray-500 line-through">{formatRupiah(produk.final_price)}</span>}
                                            </div>
                                        </div>
                                        <button onClick={() => handleOpenData(produk)} className="bg-blue-600! text-white px-4 py-2 rounded-lg hover:bg-blue-700!">
                                            Update
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-3 mt-8">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`px-4 py-2 rounded-lg border ${page === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-400 hover:bg-blue-50'}`}>
                            Prev
                        </button>
                        <span className="text-gray-600">
                            Halaman {page} dari {totalPages}
                        </span>
                        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className={`px-4 py-2 rounded-lg border ${page === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-400 hover:bg-blue-50'}`}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <ProductFormDialog isOpen={isOpen} onOpenChange={setIsOpen} title="Detail" payload={payload} />
        </main>
    )
}

export default ProgramProduk
