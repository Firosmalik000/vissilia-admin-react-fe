/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dialog/DialogKonfirmasi.tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DialogKonfirmasiProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  dataToConfirm?: Record<string, any>;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function DialogKonfirmasi({ isOpen, onOpenChange, title, description, dataToConfirm, onConfirm, onCancel }: DialogKonfirmasiProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="px-4 py-2 ">
          <DialogDescription>{description}</DialogDescription>
          <div className="grid gap-4 py-4">
            {dataToConfirm && (
              <div className="grid gap-2">
                {Object.entries(dataToConfirm).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={key} className="text-right capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </Label>
                    <Input id={key} defaultValue={value} readOnly className="col-span-2 h-8" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </DialogClose>
          <Button type="button" onClick={onConfirm}>
            Konfirmasi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
