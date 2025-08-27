/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState, useEffect } from 'react';
import { handleApiError } from '../utils/handleApiError';
import api from '@/services/interceptor';
import type { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface ModalAddSubsidiProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel?: () => void;
  payload?: any; // data plan untuk edit
  setPayload?: any;
}
interface FormResponse {
  success: boolean;
  message: string;
  status: number;
}

export function ModalAddSubsidi({ isOpen, onOpenChange, onCancel, payload, setPayload }: ModalAddSubsidiProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const [benefits, setBenefits] = useState<string[]>(['']);

  useEffect(() => {
    if (payload) {
      setBenefits(payload.benefits || ['']);
    }
  }, [payload]);

  const handleAddBenefit = () => setBenefits([...benefits, '']);
  const handleRemoveBenefit = (index: number) => setBenefits(benefits.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(formRef.current!);
    const formObject: Record<string, any> = Object.fromEntries(formData.entries());
    // formObject.benefits = benefits;

    try {
      const response: AxiosResponse<FormResponse> = await api.post(`/admin/subsidi-plans/${payload?.id}`, formObject);
      if (response.data.success) {
        onOpenChange(false);
        toast.success(response.data.message);
        formRef.current?.reset();
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onCancel?.();
    formRef.current?.reset();
    setBenefits(['']);
    setPayload({});
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) {
          // modal ditutup
          handleClose();
        }
      }}
    >
      <DialogContent className="max-w-[900px] max-h-[80vh] flex flex-col rounded-2xl backdrop-blur-lg bg-white/95 border border-gray-200 shadow-xl transition-all duration-300">
        {/* HEADER */}
        <DialogHeader className="text-center space-y-2 shrink-0">
          <DialogTitle className="text-2xl font-bold text-gray-800">{payload ? 'Edit Subsidi Plan' : 'Tambah Subsidi Plan'}</DialogTitle>
          <DialogDescription className="text-gray-500 mx-auto">{payload ? 'Perbarui data subsidi plan ✏️' : 'Tambahkan subsidi plan baru 🚀'}</DialogDescription>
        </DialogHeader>

        {/* BODY/FORM SCROLLABLE */}
        <div className="flex-1 overflow-y-auto pr-2">
          <form onSubmit={handleSubmit} ref={formRef} className="space-y-5 py-4">
            <div>
              <Label>Judul Plan</Label>
              <Input type="text" name="title" defaultValue={payload?.title} placeholder="Masukkan judul plan" className="mt-1" />
              <input type="hidden" name="id" value={payload?.id} />
            </div>

            <div>
              <Label>Deskripsi</Label>
              <Input type="text" name="description" defaultValue={payload?.description} placeholder="Masukkan deskripsi" className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Harga Asli</Label>
                <Input type="number" name="original_price" defaultValue={payload?.original_price} placeholder="700000" />
              </div>
              <div>
                <Label>Harga Akhir</Label>
                <Input type="number" name="final_price" defaultValue={payload?.final_price} placeholder="300000" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Reward per Bulan</Label>
                <Input type="number" name="reward_per_month" defaultValue={payload?.reward_per_month} placeholder="300000" />
              </div>
              <div>
                <Label>Diskon (%)</Label>
                <Input type="number" name="discount_percentage" defaultValue={payload?.discount_percentage} placeholder="57.14" step="0.01" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Periode</Label>
                <Input type="text" name="period" defaultValue={payload?.period} placeholder="thn" />
              </div>
              <div>
                <Label htmlFor="best_selling" className="font-medium text-gray-700">
                  Best Selling
                </Label>
                <select
                  name="best_selling"
                  id="best_selling"
                  defaultValue={payload?.best_selling}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                >
                  <option value="0">Tidak</option>
                  <option value="1">Benar</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Regulasi</Label>
              <Input type="text" name="regulation" defaultValue={payload?.regulation} placeholder="Masukkan regulasi" />
            </div>

            {/* Dynamic Benefits */}
            <div>
              <Label>Benefit</Label>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <Input type="text" name={`benefits[${index}]`} defaultValue={benefit} placeholder={`Benefit ${index + 1}`} />
                    <Button type="button" variant="destructive" onClick={() => handleRemoveBenefit(index)}>
                      Hapus
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" onClick={handleAddBenefit} className="mt-2 w-full">
                + Tambah Benefit
              </Button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>

        {/* FOOTER */}
        <DialogFooter className="flex justify-between gap-3 shrink-0">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={handleClose} className="hover:bg-gray-100 transition">
              Batal
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => formRef.current?.requestSubmit()}>
            {loading ? 'Loading...' : 'Simpan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
