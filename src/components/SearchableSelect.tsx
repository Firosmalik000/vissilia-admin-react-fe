import * as React from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { User } from '@/services/inteface'

interface SearchableUserSelectProps {
    value: User | null
    onChange: (user: User | null) => void
    users: User[] // ✅ jangan lupa
    onSearch: (query: string) => void // ✅ jangan lupa
}

export const SearchableUserSelect: React.FC<SearchableUserSelectProps> = ({ value, onChange, users, onSearch }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    {value ? `${value.name} (${value.email})` : 'Pilih user...'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput placeholder="Cari nama / email..." onValueChange={onSearch} />
                    <CommandList>
                        <CommandEmpty>Tidak ada user</CommandEmpty>
                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={user.name}
                                    onSelect={() => {
                                        onChange(user)
                                        setOpen(false)
                                    }}
                                >
                                    <div>
                                        <p>{user.name}</p>
                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
