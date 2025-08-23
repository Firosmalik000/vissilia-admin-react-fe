/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Order } from '@/services/inteface'
import { useRef, useState } from 'react'

interface ModalPembayaranProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    order: Order | null
    onSubmit: (orderId: number, resi: string) => void
}

export function ModalPembayaran({ isOpen, onOpenChange, order, onSubmit }: ModalPembayaranProps) {
    const [data, setData] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (order) {
            onSubmit(order.id, data)
            setData('')
            onOpenChange(false)
        }
    }

    if (!order) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] rounded-lg">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Update Pembayaran Order #{order.order_id}</DialogTitle>
                        <DialogDescription>
                            Status: <span className="font-semibold capitalize">{order.status}</span>
                            <br />
                            <span className="font-semibold text-red-500">*pastikan data diambil dari dashboard midtrans</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6 px-2 overflow-y-auto max-h-[60vh]">
                        {/* Input Resi */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="data">Nomor Resi</Label>
                            <Textarea id="data" value={data} onChange={(e) => setData(e.target.value)} placeholder="Masukkan nomor resi" required />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-md px-6 py-2 hover:bg-gray-50 border-transparent! hover:text-red-700 hover:border-red-500! text-red-500">
                                Tutup
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="rounded-md px-6 py-2 bg-blue-600 text-gray-700 border-transparent! hover:border-blue-700! hover:text-blue-700">
                            Simpan Pembayaran
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
