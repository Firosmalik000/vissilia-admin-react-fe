import * as React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { ProductOption } from '@/services/inteface'

interface SearchableProductSelectProps {
    value: ProductOption | null
    onChange: (product: ProductOption | null) => void
    products: ProductOption[]
    onSearch: (query: string) => void
}

export const SearchableProductSelect: React.FC<SearchableProductSelectProps> = ({ value, onChange, products, onSearch }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    {value ? value.variant : 'Pilih produk...'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[1000]" style={{ zIndex: 1000 }}>
                <Command>
                    <CommandInput placeholder="Cari produk..." onValueChange={onSearch} />
                    <CommandList className="max-h-64 overflow-auto">
                        <CommandEmpty>Tidak ada produk</CommandEmpty>
                        <CommandGroup>
                            {products.map((product) => (
                                <CommandItem
                                    key={product.id}
                                    value={product.variant}
                                    onSelect={() => {
                                        onChange(product)
                                        setOpen(false)
                                    }}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.variant}
                                            className="w-8 h-8 rounded object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none'
                                            }}
                                        />
                                    )}
                                    <span>{product.variant}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
