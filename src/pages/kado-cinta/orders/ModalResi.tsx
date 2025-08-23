/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Order } from '@/services/inteface'
import { useEffect, useRef, useState } from 'react'

interface ModalResiProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    order: Order | null
    onSubmit: (orderId: number, resi: string) => void
}

export function ModalResi({ isOpen, onOpenChange, order, onSubmit }: ModalResiProps) {
    const [resi, setResi] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (isOpen) {
            setResi(order?.shipment.tracking_number || '')
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (order) {
            onSubmit(order.id, resi)
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
                        <DialogTitle className="text-xl font-bold">Update Resi Order #{order.order_id}</DialogTitle>
                        <DialogDescription>
                            Status: <span className="font-semibold capitalize">{order.status}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6 px-2 overflow-y-auto max-h-[60vh]">
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
                            <Button type="button" variant="outline" className="rounded-md px-6 py-2 hover:bg-gray-50 border-transparent! hover:text-red-700 hover:border-red-500! text-red-500">
                                Tutup
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="rounded-md px-6 py-2 bg-blue-600 text-gray-700 border-transparent! hover:border-blue-700! hover:text-blue-700">
                            Simpan Resi
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
