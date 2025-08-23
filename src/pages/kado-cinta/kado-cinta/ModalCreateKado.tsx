// src/components/CreateKadoCintaModal.tsx
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import type { User } from '@/services/inteface'

interface CreateKadoCintaModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedUser: User | null
    newKadoName: string
    setNewKadoName: (val: string) => void
    newQuantity: number
    setNewQuantity: (val: number) => void
    onSubmit: () => void
}

const CreateKadoCintaModal: React.FC<CreateKadoCintaModalProps> = ({ open, onOpenChange, selectedUser, newKadoName, setNewKadoName, newQuantity, setNewQuantity, onSubmit }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Buat Kado Cinta untuk {selectedUser?.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="kadoName">Nama Kado</Label>
                        <Input id="kadoName" value={newKadoName} onChange={(e) => setNewKadoName(e.target.value)} placeholder="Masukkan nama kado" />
                    </div>

                    <div>
                        <Label htmlFor="quantity">Jumlah</Label>
                        <Input id="quantity" type="number" value={newQuantity} onChange={(e) => setNewQuantity(Number(e.target.value))} min={1} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Batal
                    </Button>
                    <Button onClick={onSubmit}>Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateKadoCintaModal
