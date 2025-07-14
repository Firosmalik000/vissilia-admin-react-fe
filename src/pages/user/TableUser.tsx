'use client';

import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DialogKonfirmasi } from './DialogKonfirmasi';

export type Investment = {
  id: string;
  date: string;
  time: string;
  starCode: string;
  amount: number;
};

// --- Data dummy sesuai dengan struktur Investment Anda ---
const investmentData: Investment[] = [
  {
    id: '234dfseh',
    date: '08/09/2003',
    time: '23H,21M,34S',
    starCode: '1KMps',
    amount: 50000,
  },
  {
    id: 'abcf1234',
    date: '10/01/2024',
    time: '10H,00M,00S',
    starCode: '2KMps',
    amount: 150000,
  },
  {
    id: 'xyz7890',
    date: '05/12/2023',
    time: '14H,30M,15S',
    starCode: '3KMps',
    amount: 250000,
  },
];

const TableUser = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isKonfirmasiDialogOpen, setIsKonfirmasiDialogOpen] = React.useState(false);
  const [selectedInvestment, setSelectedInvestment] = React.useState<Investment | null>(null);

  const handleKonfirmasiClick = (investment: Investment) => {
    setSelectedInvestment(investment);
    setIsKonfirmasiDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (selectedInvestment) {
      console.log('Konfirmasi investasi:', selectedInvestment.id);

      alert(`Investasi dengan ID ${selectedInvestment.id} telah dikonfirmasi!`);
    }
    setIsKonfirmasiDialogOpen(false);
    setSelectedInvestment(null);
  };

  const handleCancelAction = () => {
    console.log('Konfirmasi dibatalkan.');
    setIsKonfirmasiDialogOpen(false);
    setSelectedInvestment(null);
  };

  const columns: ColumnDef<Investment>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => <div>{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Tanggal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {row.original.date}
          <br />
          {row.original.time}
        </div>
      ),
    },
    {
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            ID Transaksi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'starCode',
      header: 'Kode Bintang',
      cell: ({ row }) => <div>{row.getValue('starCode')}</div>,
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-right">Nominal</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'));
        const formatted = new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      header: 'Aksi',
      cell: ({ row }) => {
        const investment = row.original; // Akses data baris saat ini

        return (
          <div className="flex gap-x-2 text-sm">
            <Button className="text-red-600 bg-white border border-red-600 hover:underline">Tolak</Button>
            {/* Tombol Konfirmasi yang memicu dialog */}
            <Button className="text-blue-600 hover:underline" onClick={() => handleKonfirmasiClick(investment)}>
              Konfirmasi
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: investmentData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Tidak ada hasil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} baris terpilih.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Sebelumnya
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Berikutnya
          </Button>
        </div>
      </div>{' '}
      {/* Dialog Konfirmasi */}
      <DialogKonfirmasi
        isOpen={isKonfirmasiDialogOpen}
        onOpenChange={setIsKonfirmasiDialogOpen}
        title="Konfirmasi Investasi"
        description="Apakah Anda yakin ingin mengkonfirmasi investasi ini?"
        dataToConfirm={
          selectedInvestment
            ? { 'ID Transaksi': selectedInvestment.id, Nominal: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(selectedInvestment.amount) }
            : {}
        }
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </>
  );
};

export default TableUser;
