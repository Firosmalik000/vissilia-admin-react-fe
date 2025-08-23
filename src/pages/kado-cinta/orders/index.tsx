import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getKadoCintaOrders, markKadoCintaAsDelivered, updateKadoCintaPayment, updateKadoCintaResi } from '@/services/api'
import type { Order } from '@/services/inteface'
import React, { useEffect, useState } from 'react'
import { OrderDetailDialog } from './OrderDetailDialog'
import { formatRupiah } from '@/utils/helper'
import { ModalResi } from './ModalResi'
import { ModalPembayaran } from './ModalPembayaran'

const KadoCintaOrdersPage: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>('Semua')
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [totalData, setTotalData] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [perPage] = useState<number>(5)
    const [search, setSearch] = useState<string>('')

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDialogResiOpen, setIsDialogResiOpen] = useState(false)
    const [isDialogPaymentOpen, setIsDialogPaymentOpen] = useState(false)
    // const [isDialogShipmentOpen, setIsDialogShipmentOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const handleStatusOrder = (status: string, shipment: string) => {
        console.log(status, shipment)
        if (status === 'paid' || status === 'settlement') {
            switch (shipment) {
                case 'pending':
                case 'awaiting_shipment':
                    return 'Menunggu Pengiriman'
                case 'shipped':
                    return 'Pengiriman'
                case 'delivered':
                    return 'Diterima'
                default:
                    break
            }
        } else if (status === 'pending') {
            return 'Menunggu Pembayaran'
        } else {
            return 'Dibatalkan'
        }
    }

    const handleStatusOrderClass = (status: string, shipment: string) => {
        if (status === 'paid' || status === 'settlement') {
            switch (shipment) {
                case 'pending':
                case 'awaiting_shipment':
                    return 'bg-cyan-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
                case 'shipped':
                    return 'bg-blue-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
                case 'delivered':
                    return 'bg-green-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
                default:
                    return 'bg-gray-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
            }
        } else if (status === 'pending') {
            return 'bg-yellow-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
        } else if (status === 'canceled') {
            return 'bg-red-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
        } else {
            return 'bg-gray-500 text-white px-4 py-1 rounded-sm text-sm font-medium'
        }
    }

    const fetchOrders = async (page: number = 1, perPage: number, status: string, search: string) => {
        setLoading(true)
        try {
            const res = await getKadoCintaOrders(page, perPage, status, search)
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
            const res = await updateKadoCintaResi(id_order, resi)
            console.log(res)
            fetchOrders(page, perPage, selectedStatus, search)
        } catch (err) {
            console.error('Gagal update resi:', err)
        }
    }

    const handleMarkDelivered = async (id_order: number) => {
        try {
            const res = await markKadoCintaAsDelivered(id_order)
            console.log(res)
            fetchOrders(page, perPage, selectedStatus, search)
        } catch (err) {
            console.error('Gagal update resi:', err)
        }
    }

    const handleUpdatePayment = async (id_order: number, data: string) => {
        try {
            const res = await updateKadoCintaPayment(id_order, data)
            console.log(res)
            fetchOrders(page, perPage, selectedStatus, search)
        } catch (err) {
            console.error('Gagal update resi:', err)
        }
    }

    useEffect(() => {
        fetchOrders(page, perPage, selectedStatus, search)
    }, [page, search, selectedStatus])

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
                                    <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Semua">Semua</SelectItem>
                                            <SelectItem value="pending_payment">Belum Dibayar</SelectItem>
                                            <SelectItem value="pending_delivery">Belum Dikirim</SelectItem>
                                            <SelectItem value="shipped">Pengiriman</SelectItem>
                                            <SelectItem value="delivered">Terkirim</SelectItem>
                                            <SelectItem value="canceled">Dibatalkan</SelectItem>
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
                    ) : orders && orders.length === 0 ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Tidak ada order</h2>
                            <p className="text-lg text-gray-500">Belum ada order yang masuk</p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">List Order Kado Cinta</h2>
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        onClick={() => {
                                            setSelectedOrder(order)
                                            setIsDialogOpen(true)
                                        }}
                                        className="bg-white rounded-xl shadow-md p-4 flex justify-between gap-4 items-center hover:shadow-lg transition"
                                    >
                                        {/* <img src={productUrl(order.)} alt={order.name} className="w-24 h-24 object-cover rounded-lg shadow-sm" /> */}
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold text-lg text-gray-800">{order.order_id}</h3>
                                            <div className="mt-2 flex gap-3">
                                                <span className="font-bold text-blue-600 text-lg">{formatRupiah(order.final_amount)}</span>
                                                {order.total_price !== order.final_amount && <span className="text-gray-500 line-through">{formatRupiah(order.total_price)}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className={handleStatusOrderClass(order.status, order.shipment.shipping_status)}>{handleStatusOrder(order.status, order.shipment.shipping_status)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                className="px-4 py-2"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setSelectedOrder(order)
                                                    setIsDialogResiOpen(true)
                                                }}
                                                disabled={order.shipment.shipping_status !== 'pending'}
                                            >
                                                Resi
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="px-4 py-2"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setSelectedOrder(order)
                                                    setIsDialogPaymentOpen(true)
                                                    // payment
                                                }}
                                                disabled={order.status == 'paid'}
                                            >
                                                Pembayaran
                                            </Button>
                                            {/* <Button
                                                    variant="outline"
                                                    className="px-4 py-2"
                                                    onClick={() => {
                                                        setSelectedOrder(order)
                                                        setIsDialogPaymentOpen(true)
                                                    }}
                                                >
                                                    Pengiriman
                                                </Button> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <OrderDetailDialog
                                isOpen={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                                order={selectedOrder}
                                onSubmit={(orderId) => {
                                    handleMarkDelivered(orderId)
                                }}
                            />
                            <ModalResi
                                isOpen={isDialogResiOpen}
                                onOpenChange={setIsDialogResiOpen}
                                order={selectedOrder}
                                onSubmit={(orderId, resi) => {
                                    handleUpdateResi(orderId, resi)
                                }}
                            />
                            <ModalPembayaran
                                isOpen={isDialogPaymentOpen}
                                onOpenChange={setIsDialogPaymentOpen}
                                order={selectedOrder}
                                onSubmit={(orderId, data) => {
                                    handleUpdatePayment(orderId, data)
                                }}
                            />
                            {/* <ModalPengiriman
                                    isOpen={isDialogShipmentOpen}
                                    onOpenChange={setIsDialogShipmentOpen}
                                    order={selectedOrder}
                                    onSubmitResi={(orderId, data) => {
                                        // handleUpdatePayment(orderId, data)
                                    }}
                                /> */}
                        </>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
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
                    )}
                </div>
            </div>
        </main>
    )
}

export default KadoCintaOrdersPage
