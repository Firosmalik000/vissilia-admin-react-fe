import * as React from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
export type WithdrawalHistory = {
  id: string; // ID Transaksi
  date: string; // Tanggal
  time: string; // Waktu
  starCode: string; // Kode Bintang
  produk: string; // Nominal
};

const withdrawHistoryData: WithdrawalHistory[] = [
  {
    id: 'wdh12345',
    date: '08/09/2003',
    time: '23H,21M,34S',
    starCode: '1KMps',
    produk: 'test nama produk ',
  },
  {
    id: 'wdh67890',
    date: '07/09/2003',
    time: '10H,00M,00S',
    starCode: '2KMps',
    produk: 'test nama produk 2',
  },
  {
    id: 'wdh11223',
    date: '06/09/2003',
    time: '15H,45M,00S',
    starCode: '3KMps',
    produk: 'test nama produk 3',
  },
  {
    id: 'wdh44556',
    date: '05/09/2003',
    time: '09H,10M,20S',
    starCode: '4KMps',
    produk: 'test nama produk 4',
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export const withdrawHistoryColumns: ColumnDef<WithdrawalHistory>[] = [
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
    accessorKey: 'produk',
    header: () => {
      return <div className="text-center font-medium">Nama Produk</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center font-medium">{row.getValue('produk')}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Aksi',
    cell: () => (
      <Button variant="link" className="text-blue-600 hover:underline px-0">
        Pembatalan Pesanan
      </Button>
    ),
  },
];
const DataTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: withdrawHistoryData, // Menggunakan data dummy Riwayat Withdraw
    columns: withdrawHistoryColumns, // Menggunakan kolom untuk Riwayat Withdraw
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
    <div>
      {' '}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Riwayat Withdraw</h3>
          <Button variant="link" className="text-blue-600 hover:underline text-sm p-0 h-auto">
            Download Excel
          </Button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Input placeholder="Cari berdasarkan ID Transaksi..." value={(table.getColumn('id')?.getFilterValue() as string) ?? ''} onChange={(event) => table.getColumn('id')?.setFilterValue(event.target.value)} className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Kolom <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                      {/* Menyesuaikan nama kolom di dropdown */}
                      {column.id === 'id' ? 'ID Transaksi' : column.id === 'starCode' ? 'Kode Bintang' : column.id === 'amount' ? 'Nominal' : column.id === 'actions' ? 'Aksi' : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
                  <TableCell colSpan={withdrawHistoryColumns.length} className="h-24 text-center">
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
        </div>
      </div>
    </div>
  );
};

export default DataTable;
