/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { useRef, useState } from 'react';

interface ProductFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  payload: any;
}
interface ImageFile extends File {
  id: string;
}

export function ProductFormDialog({ isOpen, onOpenChange, title, payload }: ProductFormDialogProps) {
  const [shippingMethod, setShippingMethod] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [inputs, setInputs] = useState([0]);
  console.log({ payload });

  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const formObject = Object.fromEntries(formData.entries());
    formObject.metode_pengiriman = shippingMethod;
    formObject.images = images;
    console.log('Form Data Submitted:', formObject);
    setImages([]);
    setShippingMethod('');
    onOpenChange(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages: ImageFile[] = Array.from(files).map((file) => ({
        ...file,
        id: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
      e.target.value = '';
    }
  };

  const handleAddImage = () => {
    inputRef.current?.click();
  };

  const handleRemoveImage = (idToRemove: string) => {
    setImages((prev) => prev.filter((image: any) => image.id !== idToRemove));
    URL.revokeObjectURL(idToRemove);
  };

  const handleAddInput = () => {
    setInputs((prev) => [...prev, prev.length]);
  };

  const handleRemoveInput = (index: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] rounded-lg">
        <form action="" onSubmit={handleSubmit} ref={formRef}>
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold text-gray-800">{title}</DialogTitle>
            <DialogDescription className="text-gray-600">Isi detail produk baru Anda di bawah ini.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6 px-6 overflow-y-auto max-h-[70vh]">
            <div className=" gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-left font-semibold text-gray-700">
                  Nama Produk <span className="text-red-500">*</span>
                </Label>
                <Input id="name" name="name" placeholder="Cth: Chitato" defaultValue={payload?.name ?? '-'} className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Section: Harga Produk */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="price" className="text-left font-semibold text-gray-700">
                  Harga <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-2 border border-gray-300 rounded-l-md text-sm">Rp</span>
                  <Input id="price" name="price" type="number" placeholder="90000" className="rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" defaultValue={payload?.price ?? '-'} />
                </div>
              </div>
              {/* stok */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="stock" className="text-left font-semibold text-gray-700">
                  Stok Produk <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center">
                  <Input id="stock" name="stock" type="number" className="rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                  <span className="bg-gray-100 text-gray-700 px-3 py-2 border border-gray-300 rounded-r-md text-sm">pcs</span>
                </div>
              </div>

              {/* Berat */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="weight" className="text-left font-semibold text-gray-700">
                  Berat <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center">
                  <Input id="weight" name="weight" type="number" className="rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" defaultValue={payload?.weight ?? '-'} />
                  <span className="bg-gray-100 text-gray-700 px-3 py-2 border border-gray-300 rounded-r-md text-sm">g</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="productDescription" className="text-left font-semibold text-gray-700">
                Deskripsi Produk <span className="text-red-500">*</span>
              </Label>
              <Textarea id="productDescription" name="productDescription" placeholder="Masukkan deskripsi produk..." className="min-h-[100px] rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
            </div>

            {/* Section: Metode Pengiriman (Simplified) */}
            <div className="flex flex-col gap-2">
              <Label className="text-left font-semibold text-gray-700">
                Metode Pengiriman <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant={shippingMethod === 'jne' ? 'default' : 'outline'}
                  onClick={() => setShippingMethod('jne')}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 transition-all duration-200 ${shippingMethod === 'jne' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <img src="https://placehold.co/40x20/e0e0e0/000000?text=JNE" alt="JNE Logo" className="h-5 object-contain" />
                  JNE
                </Button>
                <Button
                  type="button"
                  variant={shippingMethod === 'jnt' ? 'default' : 'outline'}
                  onClick={() => setShippingMethod('jnt')}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 transition-all duration-200 ${shippingMethod === 'jnt' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  <img src="https://placehold.co/40x20/e0e0e0/000000?text=J&T" alt="J&T Logo" className="h-5 object-contain" />
                  J&T Express
                </Button>
              </div>
            </div>
            {/* image */}
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*" multiple ref={inputRef} onChange={handleFileChange} className="hidden" />

              {images.length > 0 && (
                <div className="flex gap-2">
                  {images.map((image: any) => (
                    <div key={image.id} className="relative w-24 h-24 rounded-md overflow-hidden group">
                      <img src={image.id} alt={`Preview ${image.name}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${image.name}`}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div
                className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 bg-gray-50 hover:border-blue-400 cursor-pointer group overflow-hidden"
                onClick={handleAddImage}
              >
                {images.length === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <span className="text-xl font-bold">+</span>
                )}
              </div>
            </div>

            <Button type="button" className="rounded-md px-6 py-2  bg-blue-600 text-white hover:bg-blue-700" onClick={handleAddInput}>
              Tambahkan Variant
            </Button>
            {inputs.map((_, index) => (
              <div className="relative mb-6 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                  <p className="text-lg font-semibold text-gray-800">Variant Produk {index + 1}</p>
                  <Button
                    type="button"
                    onClick={() => handleRemoveInput(index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Hapus Variant</span>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
                  <div>
                    <Label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nama Produk
                    </Label>
                    <Input
                      id={`name-${index}`}
                      type="text"
                      name={`name[${index}][name]`}
                      placeholder="Contoh: Kemeja Polos Ukuran M"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`final_price-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Harga Akhir
                    </Label>
                    <Input
                      id={`final_price-${index}`}
                      type="number"
                      name={`final_price[${index}][final_price]`}
                      placeholder="Contoh: 150000"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`discount_amount-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Diskon (Opsional)
                    </Label>
                    <Input
                      id={`discount_amount-${index}`}
                      type="number"
                      name={`discount_amount[${index}][discount_amount]`}
                      placeholder="Contoh: 20000"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`stock-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Stok Produk
                    </Label>
                    <Input
                      id={`stock-${index}`}
                      type="number"
                      name={`stock[${index}][stock]`}
                      placeholder="Contoh: 100"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-3">
                    {' '}
                    {/* Untuk Textarea agar mengambil lebar lebih */}
                    <Label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1.5">
                      Deskripsi Variant
                    </Label>
                    <Textarea
                      id={`description-${index}`}
                      name={`description[${index}][description]`}
                      placeholder="Berikan deskripsi singkat untuk variant produk ini, contoh: Tersedia dalam berbagai warna dan ukuran."
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="p-6 pt-0 flex justify-end gap-3">
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
  );
}
