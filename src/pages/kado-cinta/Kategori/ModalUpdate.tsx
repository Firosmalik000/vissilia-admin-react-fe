/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { KadoCintaCategory } from '@/services/inteface'
import { useEffect, useRef, useState } from 'react'

interface ModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    category: KadoCintaCategory | null
    onSubmit: (categoryName: string, id: number) => void
}

export function ModalCategoryKadoCinta({ isOpen, onOpenChange, category, onSubmit }: ModalProps) {
    const [categoryName, setCategoryName] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (isOpen) {
            setCategoryName(category?.name || '')
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (category && categoryName) {
            onSubmit(categoryName, category.id)
            setCategoryName('')
            onOpenChange(false)
        }
    }

    if (!category) return null

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] rounded-lg">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Update Category Kado Cinta</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6 py-6 px-2 overflow-y-auto max-h-[60vh]">
                        {/* Input Resi */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="resi">Nama Category</Label>
                            <Input id="resi" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Masukkan nomor resi" required />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-md px-6 py-2 hover:bg-gray-50 border-transparent! hover:text-red-700 hover:border-red-500! text-red-500">
                                Tutup
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="rounded-md px-6 py-2 bg-blue-600 text-gray-700 border-transparent! hover:border-blue-700! hover:text-blue-700">
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
