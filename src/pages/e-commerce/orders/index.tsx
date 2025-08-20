import { Button } from '@/components/ui/button'
import { SelectContent } from '@/components/ui/select'
import { getOrders, updateResi } from '@/services/api'
import type { Order } from '@/services/inteface'
import { Select, SelectItem, SelectTrigger } from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { OrderDetailDialog } from './OrderDetailDialog'

const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount)
}

const OrdersPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Semua')
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [totalData, setTotalData] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [perPage] = useState<number>(5)
    const [search, setSearch] = useState<string>('')

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const fetchOrders = async (page: number = 1, perPage: number, category: string, search: string) => {
        setLoading(true)
        try {
            const res = await getOrders(page, perPage, category, search)
            setOrders(res.data)
            setTotalData(res.pagination?.total || res.data.length)
            setTotalPages(res.pagination?.last_page || 1)
        } catch (err) {
            console.error('Gagal fetch produk:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateResi = async (id_order: number, resi: string) => {
        try {
            const res = await updateResi(id_order, resi)
            console.log(res)
        } catch (err) {
            console.error('Gagal update resi:', err)
        }
    }

    useEffect(() => {
        fetchOrders(page, perPage, selectedCategory, search)
    }, [page, search, selectedCategory])

    return (
        <main className="p-6 flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="p-5 min-h-screen font-sans">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-y-4">
                        <div className="flex gap-2 py-2">
                            <div className="flex-1 min-w-[200px] max-w-sm ">
                                <input
                                    type="text"
                                    placeholder="Cari Order Id..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setPage(1) // reset ke page pertama
                                    }}
                                    className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1 min-w-[200px] max-w-sm">
                                <div className="relative">
                                    <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                                        <SelectTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                <span className="mr-2">{selectedCategory}</span>
                                                <ChevronDownIcon className="absolute top-1/2 transform -translate-y-1/2 right-4" />
                                            </Button>
                                        </SelectTrigger>
                                        <SelectContent className="mt-2">
                                            <SelectItem value="Semua">Semua</SelectItem>
                                            <SelectItem value="Baru">Baru</SelectItem>
                                            <SelectItem value="Diproses">Diproses</SelectItem>
                                            <SelectItem value="Selesai">Selesai</SelectItem>
                                            <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Total Produk */}
                        <div className="text-right">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Total Order</h3>
                            <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-3">
                                <span className="text-3xl">🛒</span>
                                <span className="text-3xl font-bold text-gray-900">{totalData}</span>
                            </div>
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
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center hover:shadow-lg transition"
                                        onClick={() => {
                                            setSelectedOrder(order)
                                            setIsDialogOpen(true)
                                        }}
                                    >
                                        {/* <img src={productUrl(order.)} alt={order.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" /> */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800">{order.order_id}</h3>
                                            <p className="text-gray-600 text-sm">Status: {order.status}</p>
                                            <div className="mt-2 flex gap-3">
                                                <span className="font-bold text-blue-600 text-lg">{formatRupiah(order.final_amount)}</span>
                                                {order.total_price !== order.final_amount && <span className="text-gray-500 line-through">{formatRupiah(order.total_price)}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <OrderDetailDialog
                                isOpen={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                                order={selectedOrder}
                                onSubmitResi={(orderId, resi) => {
                                    handleUpdateResi(orderId, resi)
                                }}
                            />
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
        </main>
    )
}

export default OrdersPage
