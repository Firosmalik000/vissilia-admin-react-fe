import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import type { KadoCintaCategory, ProductOption, User } from '@/services/inteface'
import { getCategoryKadoCinta, getListProductKadoCinta } from '@/services/api'
import { SearchableProductSelect } from '@/components/SearchableProduct'
import { X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CreateKadoCintaModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedUser: User | null
    onSubmit: (data: { productTypeId: number; categoryId: number; namaKado: string; quantity: number }) => void
}

const CreateKadoCintaModal: React.FC<CreateKadoCintaModalProps> = ({ open, onOpenChange, selectedUser, onSubmit }) => {
    const [searchItem, setSearchItem] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null)
    const [products, setProducts] = useState<ProductOption[]>([])
    const [category, setCategory] = useState<KadoCintaCategory[]>([])
    const [newQuantity, setNewQuantity] = useState(1)
    const [namaKado, setNamaKado] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<KadoCintaCategory | null>(null)

    const fetchProduct = async (query: string) => {
        try {
            const res = await getListProductKadoCinta(query)
            setProducts(res.data)
        } catch (err) {
            console.error('Gagal fetch products:', err)
            setProducts([])
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await getCategoryKadoCinta()
            setCategory(res.data)
        } catch (err) {
            console.error('Gagal fetch Category:', err)
            setCategory([])
        }
    }

    useEffect(() => {
        if (open && searchItem !== '') {
            const timeoutId = setTimeout(() => {
                fetchProduct(searchItem)
            }, 300)

            return () => clearTimeout(timeoutId)
        }
    }, [searchItem])

    useEffect(() => {
        if (!open) {
            setSelectedProduct(null)
            setSearchItem('')
            setProducts([])
            setCategory([])
        } else {
            fetchProduct('')
            fetchCategories()
        }
    }, [open])

    const handleSubmit = () => {
        if (!selectedProduct || !selectedCategory || !namaKado) return

        onSubmit({
            productTypeId: selectedProduct.id,
            categoryId: selectedCategory.id,
            namaKado,
            quantity: newQuantity,
        })
    }

    // Close modal ketika klik di background
    const handleBackdropClick = () => {
        onOpenChange(false)
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
            <div
                className="bg-white rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-lg font-semibold">Buat Kado Cinta untuk {selectedUser?.name}</h2>
                    <button onClick={() => onOpenChange(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="product">Produk</Label>
                        <SearchableProductSelect
                            value={selectedProduct}
                            onChange={(product) => {
                                setSelectedProduct(product)
                                // if (user) fetchOrders(user.id)
                            }}
                            products={products}
                            onSearch={setSearchItem}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={selectedCategory?.id?.toString() ?? ''}
                            onValueChange={(val) => {
                                const selected = category.find((c) => c.id.toString() === val)
                                setSelectedCategory(selected || null)
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                                {category.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Kado</Label>
                        <Input id="name" type="text" value={namaKado} onChange={(e) => setNamaKado(e.target.value)} placeholder="Masukkan Nama Kado" className="w-full" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="quantity">Jumlah</Label>
                        <Input id="quantity" type="number" value={newQuantity} onChange={(e) => setNewQuantity(Number(e.target.value))} min={1} className="w-full" />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t">
                    <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                        Batal
                    </Button>
                    <Button variant="outline" onClick={handleSubmit} disabled={!selectedProduct} type="button">
                        Tambahkan
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateKadoCintaModal
