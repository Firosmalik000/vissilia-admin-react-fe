import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { KadoCinta } from '@/services/inteface'
import { productUrl } from '@/pages/utils/imageUrl'

interface ModalDetailKadoCintaProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    kado: KadoCinta | null
}

const ModalDetailKadoCinta: React.FC<ModalDetailKadoCintaProps> = ({ open, onOpenChange, kado }) => {
    if (!kado) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Detail Kado Cinta {kado.kado_name}</DialogTitle>
                </DialogHeader>

                <div className="flex gap-6">
                    {/* Gambar di kiri */}
                    <div className="w-40 flex-shrink-0">
                        <img src={productUrl(kado.product.image)} alt={kado.kado_name} className="w-full rounded-xl border object-cover shadow-sm" />
                    </div>

                    {/* Detail di kanan */}
                    <div className="flex-1 space-y-4">
                        <h3 className="text-base font-semibold">
                            {kado.product.product_header.name} ({kado.product.variant})
                        </h3>

                        <div className="space-y-2 text-sm">
                            <DetailRow label="Kategori" value={kado.category_name} />
                            <DetailRow label="Harga Asli" value={`Rp ${kado.product.price.toLocaleString()}`} />
                            <DetailRow label="Harga Final" value={`Rp ${kado.final_price.toLocaleString()}`} />
                            <DetailRow label="Jumlah" value={kado.quantity} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const DetailRow = ({ label, value }: { label: string; value: string | number | null }) => (
    <div className="flex text-sm">
        <span className="w-28 font-medium text-gray-600">{label}</span>
        <span className="flex-1">{value}</span>
    </div>
)

export default ModalDetailKadoCinta
