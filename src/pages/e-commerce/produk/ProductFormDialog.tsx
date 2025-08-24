/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getProductDetail, postProduct, putProduct } from '@/services/api'
import type { Product, Type } from '@/services/inteface'
import { Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface ProductFormDialogProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    payload?: Product
}

interface ImagePreview {
    id: string
    name: string
    base64: string
    preview: string
}

export function ProductFormDialog({ isOpen, onOpenChange, title, payload }: ProductFormDialogProps) {
    const [primaryImage, setPrimaryImage] = useState<ImagePreview | null>(null)
    const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([])
    const [variantImages, setVariantImages] = useState<{ [key: number]: ImagePreview | null }>({})
    const [inputs, setInputs] = useState<Type[]>([])
    const [detail, setDetail] = useState<Partial<Product>>({})
    const formRef = useRef<HTMLFormElement>(null)
    const primaryInputRef = useRef<HTMLInputElement>(null)
    const detailInputRef = useRef<HTMLInputElement>(null)

    const fetchDetailProduct = async () => {
        if (!payload?.slug) return
        toast.promise(getProductDetail(payload.slug), {
            loading: 'Loading...',
            success: (response) => {
                setDetail(response.data)
                setInputs(response?.data?.types ?? [])
                loadExistingImages(response?.data?.image_details ?? [])
                if (response?.data?.primary_image) {
                    setPrimaryImage({ id: 'primary', name: 'primary', base64: response.data.primary_image, preview: response.data.primary_image })
                }
                if (response?.data?.types?.length > 0) {
                    const variantImages: { [key: number]: ImagePreview | null } = {}
                    response?.data?.types?.forEach((type, index) => {
                        variantImages[index] = type.image ? { id: type.id.toString(), name: type.variant, base64: type.image, preview: type.image } : null
                    })
                    setVariantImages(variantImages)
                }
                return `Berhasil mengambil data produk ${payload?.name}`
            },
            error: 'Gagal mengambil data produk',
        })
    }

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })

    const handlePrimaryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const base64 = await fileToBase64(file)
        setPrimaryImage({ id: 'primary', name: file.name, base64, preview: URL.createObjectURL(file) })
        e.target.value = ''
    }

    const handleFileChangeDetail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        const newImages: ImagePreview[] = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const base64 = await fileToBase64(file)
            newImages.push({ id: `detail_${Date.now()}_${i}`, name: file.name, base64, preview: URL.createObjectURL(file) })
        }
        setImagePreviews((prev) => [...prev, ...newImages])
        e.target.value = ''
    }

    const removeDetailImage = (index: number) => {
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    const handleVariantFileChange = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0]
        if (!file) return
        const base64 = await fileToBase64(file)
        const preview = URL.createObjectURL(file)
        setVariantImages((prev) => ({ ...prev, [index]: { id: `variant_${index}`, name: file.name, base64, preview } }))
        e.target.value = ''
    }

    const handleRemoveVariantImage = (index: number) => {
        setVariantImages((prev) => ({ ...prev, [index]: null }))
    }

    const loadExistingImages = useCallback((images: string[]) => {
        if (!Array.isArray(images)) return
        const previews: ImagePreview[] = images.map((base64, index) => ({
            id: `existing_${index}`,
            name: `image_${index}`,
            base64,
            preview: base64,
        }))
        setImagePreviews(previews)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(formRef.current!)
        if (payload) formData.append('id', payload.id.toString())
        const formObject: Record<string, any> = Object.fromEntries(formData.entries())
        toast
            .promise(payload ? putProduct(formObject) : postProduct(formObject), {
                loading: payload ? 'Mengubah produk...' : 'Menyimpan produk...',
                success: 'Produk berhasil disimpan!',
                error: 'Gagal menyimpan produk, coba lagi!',
            })
            .then(() => {
                setPrimaryImage(null)
                setImagePreviews([])
                onOpenChange(false)
                formRef.current?.reset()
            })
            .catch((err: any) => console.error(err))
    }

    const handleAddInput = () => setInputs((prev) => [...prev, {} as Type])
    const handleRemoveInput = (index: number) => setInputs((prev) => prev.filter((_, i) => i !== index))

    useEffect(() => {
        if (isOpen && payload?.slug) fetchDetailProduct()
        else if (!isOpen) {
            setDetail({})
            setInputs([])
            setPrimaryImage(null)
            setImagePreviews([])
            setVariantImages([])
        }
    }, [isOpen, payload?.slug])

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] rounded-lg">
                <form onSubmit={handleSubmit} ref={formRef}>
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-2xl font-bold text-gray-800">{title}</DialogTitle>
                        <DialogDescription className="text-gray-600">Isi detail produk Anda di bawah ini.</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-6 px-6 overflow-y-auto max-h-[70vh]">
                        {/* Nama, Harga, Berat */}
                        <div className="gap-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-left font-semibold text-gray-700">
                                    Nama Produk <span className="text-red-500">*</span>
                                </Label>
                                <Input id="name" name="name" placeholder="Cth: Chitato" defaultValue={detail?.name ?? ''} className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="price" className="text-left font-semibold text-gray-700">
                                    Harga <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex items-center">
                                    <span className="bg-gray-100 text-gray-700 px-3 py-2 border border-gray-300 rounded-l-md text-sm">Rp</span>
                                    <Input id="price" name="price" type="number" placeholder="90000" className="rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" defaultValue={detail?.price ?? ''} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="weight" className="text-left font-semibold text-gray-700">
                                    Berat <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex items-center">
                                    <Input id="weight" name="weight" type="number" className="rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" defaultValue={detail?.weight ?? ''} />
                                    <span className="bg-gray-100 text-gray-700 px-3 py-2 border border-gray-300 rounded-r-md text-sm">g</span>
                                </div>
                            </div>
                        </div>

                        {/* Gambar utama */}
                        <div className="flex flex-col gap-4">
                            <Label className="text-left font-semibold text-gray-700">Gambar Utama Produk</Label>
                            <input type="file" accept="image/*" ref={primaryInputRef} onChange={handlePrimaryChange} className="hidden" />
                            {primaryImage ? (
                                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                                    <img src={primaryImage.preview} alt={primaryImage.name} className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => setPrimaryImage(null)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs">
                                        &times;
                                    </button>
                                    <input type="hidden" name="image" value={primaryImage.base64} />
                                </div>
                            ) : (
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400" onClick={() => primaryInputRef.current?.click()}>
                                    +
                                </div>
                            )}
                        </div>

                        {/* Gambar detail */}
                        <div className="flex flex-col gap-4 mt-4">
                            <Label className="text-left font-semibold text-gray-700">Gambar Detail Produk</Label>
                            <input type="file" accept="image/*" multiple ref={detailInputRef} onChange={handleFileChangeDetail} className="hidden" />
                            <div className="flex gap-2 flex-wrap">
                                {imagePreviews.map((img, index) => (
                                    <div key={img.id} className="relative w-24 h-24 rounded-md overflow-hidden group">
                                        <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeDetailImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                            &times;
                                        </button>
                                        <input type="hidden" name={`images[${index}]`} value={img.base64} />
                                    </div>
                                ))}
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400" onClick={() => detailInputRef.current?.click()}>
                                    +
                                </div>
                            </div>
                        </div>

                        {/* Variant Section */}
                        {inputs?.map((item, index) => (
                            <div key={index} className="relative mb-6 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                                    <p className="text-lg font-semibold text-gray-800">Variant Produk {index + 1}</p>
                                    <Button type="button" onClick={() => handleRemoveInput(index)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200">
                                        <Trash2 className="w-4 h-4" />
                                        <span className="text-sm hidden sm:inline">Hapus Variant</span>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                                    <div>
                                        <Label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Nama Produk
                                        </Label>
                                        <Input id={`name-${index}`} type="text" defaultValue={item?.variant ?? ''} name={`variant[${index}][name]`} placeholder="Contoh: Kemeja Polos Ukuran M" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
                                    </div>

                                    <div>
                                        <Label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Harga
                                        </Label>
                                        <Input id={`price-${index}`} type="number" name={`variant[${index}][price]`} defaultValue={item?.price ?? ''} placeholder="Contoh: 150000" className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
                                    </div>
                                    <div>
                                        <Label htmlFor={`final_price-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Harga Akhir
                                        </Label>
                                        <Input id={`final_price-${index}`} type="number" name={`variant[${index}][final_price]`} placeholder="Contoh: 150000" defaultValue={item?.final_price ?? ''} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
                                    </div>

                                    <div>
                                        <Label htmlFor={`discount_amount-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Diskon (Opsional)
                                        </Label>
                                        <Input
                                            id={`discount_amount-${index}`}
                                            type="number"
                                            name={`variant[${index}][discount_amount]`}
                                            placeholder="Contoh: 20000"
                                            defaultValue={item?.discount_amount ?? ''}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor={`discount_percentage-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Persentase Diskon (Opsional)
                                        </Label>
                                        <Input
                                            id={`discount_percentage-${index}`}
                                            type="number"
                                            name={`variant[${index}][discount_percentage]`}
                                            placeholder="Contoh: 20000"
                                            defaultValue={item?.discountPercentage ?? ''}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor={`stock-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Stok Produk
                                        </Label>
                                        <Input id={`stock-${index}`} type="number" name={`variant[${index}][stock]`} placeholder="Contoh: 100" defaultValue={item?.stock ?? ''} className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200" />
                                    </div>

                                    <div className="md:col-span-2 lg:col-span-3">
                                        <Label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Deskripsi Variant
                                        </Label>
                                        <Textarea
                                            id={`description-${index}`}
                                            name={`variant[${index}][description]`}
                                            placeholder="Berikan deskripsi singkat untuk variant produk ini, contoh: Tersedia dalam berbagai warna dan ukuran."
                                            rows={3}
                                            defaultValue={item?.description ?? ''}
                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 mt-4">
                                    <Label className="text-gray-700 font-semibold">Gambar Variant</Label>

                                    <input type="file" accept="image/*" className="hidden" id={`variant-image-${index}`} onChange={(e) => handleVariantFileChange(e, index)} />

                                    <div className="flex gap-2 items-center">
                                        {variantImages[index] ? (
                                            <div className="relative w-24 h-24 rounded-md overflow-hidden">
                                                <img src={variantImages[index]?.preview} alt={variantImages[index]?.name} className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => handleRemoveVariantImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                    &times;
                                                </button>
                                                <input type="hidden" name={`variant[${index}][image]`} value={variantImages[index]?.base64} />
                                            </div>
                                        ) : (
                                            <label htmlFor={`variant-image-${index}`} className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400">
                                                +
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button type="button" className="rounded-md px-6 py-2  bg-blue-600! text-white hover:bg-blue-700!" onClick={handleAddInput}>
                            Tambahkan Variant
                        </Button>
                    </div>

                    <DialogFooter className="p-6 pt-4 flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-md px-6 py-2 border-gray-300 hover:bg-gray-50 text-gray-700">
                                Batal
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="rounded-md px-6 py-2 bg-blue-600 text-white hover:bg-blue-700">
                            Simpan
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
