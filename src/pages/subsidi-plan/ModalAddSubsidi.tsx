/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';
import { handleApiError } from '../utils/handleApiError';
import api from '@/services/interceptor';
import type { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

interface ModalAddSubsidiProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCancel?: () => void;
  payload?: () => void;
}
interface FormResponse {
  success: boolean;
  message: string;
  status: number;
}

export function ModalAddSubsidi({ isOpen, onOpenChange, onCancel, payload }: ModalAddSubsidiProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  console.log({ payload });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(formRef.current!);
    const formObject: Record<string, any> = Object.fromEntries(formData.entries());
    try {
      const response: AxiosResponse<FormResponse> = await api.post('/admin/subsidi-plans', formObject);
      if (response.success) {
        onOpenChange(false);
        toast.success(response.message);
        formRef.current?.reset();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onCancel?.();
    formRef.current?.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl backdrop-blur-lg bg-white/90 border border-gray-200 shadow-xl transition-all duration-300">
        <DialogHeader className="text-center space-y-2">
          <DialogTitle className="text-2xl font-bold text-gray-800">Tambah Member</DialogTitle>
          <DialogDescription className="text-gray-500 mx-auto">Tambahkan member baru ke dalam sistem 🚀</DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-5 py-4">
          <input type="hidden" name="role" value="direktur" />

          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Masukkan email" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="name">Username</Label>
            <Input type="text" name="name" placeholder="Masukkan username" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input type="text" name="phone" placeholder="Masukkan nomor telepon" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" placeholder="********" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="confPassword">Konfirmasi Password</Label>
            <Input type="password" name="confPassword" placeholder="********" className="mt-1" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:scale-[1.02] transition-transform duration-300 shadow-md disabled:opacity-50">
            {loading ? 'Loading...' : 'Daftar'}
          </Button>
        </form>

        {/* FOOTER */}
        <DialogFooter className="flex justify-between gap-3">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={handleClose} className="hover:bg-gray-100 transition">
              Batal
            </Button>
          </DialogClose>
          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => formRef.current?.requestSubmit()}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
