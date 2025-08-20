/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Order } from '@/services/inteface'
import { useRef, useState } from 'react'

interface OrderDetailDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    order: Order | null
    onSubmitResi: (orderId: number, resi: string) => void
}

export function OrderDetailDialog({ isOpen, onOpenChange, order, onSubmitResi }: OrderDetailDialogProps) {
    const [resi, setResi] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (order) {
            onSubmitResi(order.id, resi)
            setResi('')
            onOpenChange(false)
        }
    }

    if (!order) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] rounded-lg">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Detail Order #{order.order_id}</DialogTitle>
                        <DialogDescription>
                            Status: <span className="font-semibold capitalize">{order.status}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6 px-2 overflow-y-auto max-h-[60vh]">
                        {/* Info Order */}
                        <div className="space-y-2">
                            <p>
                                <strong>Tipe:</strong> {order.type}
                            </p>
                            <p>
                                <strong>Total Harga:</strong> Rp {order.total_price.toLocaleString()}
                            </p>
                            <p>
                                <strong>Diskon:</strong> Rp {order.discount_amount.toLocaleString()}
                            </p>
                            <p>
                                <strong>Ongkir:</strong> Rp {order.shipping_cost.toLocaleString()}
                            </p>
                            <p>
                                <strong>Final Amount:</strong> Rp {order.final_amount.toLocaleString()}
                            </p>
                        </div>

                        {/* Produk */}
                        <div>
                            <h3 className="font-semibold mb-2">Produk</h3>
                            <ul className="space-y-1">
                                {order.details.map((item) => (
                                    <li key={item.id} className="border-b pb-1">
                                        {item.product_name} × {item.quantity} — Rp {item.final_price.toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Shipment */}
                        <div>
                            <h3 className="font-semibold mb-2">Pengiriman</h3>
                            <p>
                                <strong>Kurir:</strong> {order.shipment.courier}
                            </p>
                            <p>
                                <strong>Penerima:</strong> {order.shipment.recipient_name}
                            </p>
                            <p>{order.shipment.recipient_address}</p>
                            <p>
                                {order.shipment.recipient_city}, {order.shipment.recipient_province} {order.shipment.recipient_postcode}
                            </p>
                        </div>

                        {/* Input Resi */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="resi">Nomor Resi</Label>
                            <Input id="resi" value={resi} onChange={(e) => setResi(e.target.value)} placeholder="Masukkan nomor resi" required />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-md px-6 py-2 border-gray-300 hover:bg-gray-50 text-gray-700">
                                Tutup
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="rounded-md px-6 py-2 bg-blue-600 text-white hover:bg-blue-700">
                            Simpan Resi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
