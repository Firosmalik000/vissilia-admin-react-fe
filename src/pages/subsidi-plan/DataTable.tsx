'use client';

import * as React from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type ColumnFiltersState, type SortingState, type VisibilityState } from '@tanstack/react-table';
import { ArrowUpDown, CheckCircle, ChevronDown, Edit2Icon, Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { handleApiError } from '../utils/handleApiError';
import api from '@/services/interceptor';
import { Skeleton } from '@/components/ui/skeleton';
import { ModalAddSubsidi } from './ModalAddSubsidi';
import toast from 'react-hot-toast';

type SubsidiPlan = {
  id: number;
  title: string;
  description: string;
  original_price: number;
  discount_percentage: number;
  final_price: number;
  period: string;
  benefits: string; // string JSON
  regulation: string;
  reward_per_month: number;
  best_selling: number;
};

const DataTable = ({ label }: { label: string }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<SubsidiPlan[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState({});

  const fetchSubsidi = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/subsidi-plans');
      if (response.data.data) {
        setData(response.data.data.data); // sesuai dengan bentuk respons kamu
        setLoading(false);
      }
    } catch (err) {
      handleApiError(err);
    }
  };

  React.useEffect(() => {
    fetchSubsidi();
  }, [open]);
  const handleOpenModal = ({ data }: any) => {
    setOpen(true);
    setPayload(data);
  };

  const handleDeleteSubsidi = async ({ id }: { id: number }) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus subsidi ini?")) return;
  
    try {
      const response = await api.delete(`/admin/subsidi-plans/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSubsidi();
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus subsidi");
    }
  };
  
  const subsidiPlanColumns: ColumnDef<SubsidiPlan>[] = [
    {
      accessorKey: 'no',
      header: 'No',
      cell: ({ row }) => <div>{row.index + 1}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nama Plan <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-semibold">{row.original.title}</div>,
    },

    {
      accessorKey: 'discount_percentage',
      header: 'Diskon',
      cell: ({ row }) => <div>{row.original.discount_percentage}%</div>,
    },

    {
      accessorKey: 'period',
      header: 'Periode',
      cell: ({ row }) => <div>{row.original.period}</div>,
    },
    {
      accessorKey: 'reward_per_month',
      header: 'Reward/Bulan',
      cell: ({ row }) =>
        new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(row.original.reward_per_month),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: 'Aksi',
      cell: ({ row }) => (
        <div className="flex gap-x-2 text-sm">
          <Button title="Realese" onClick={() => handleOpenModal({ data: row.original })} className="text-white bg-gradient-to-b  from-green-300 to-green-500 hover:bg-green-200">
            <CheckCircle className="w-4 h-4" />
          </Button>
          <Button title="Edit" onClick={() => handleOpenModal({ data: row.original })} className="text-white bg-gradient-to-b  from-amber-300 to-amber-500 hover:bg-amber-200">
            <Edit2Icon className="w-4 h-4" />
          </Button>
          <Button title="Hapus" onClick={() => handleDeleteSubsidi({ id: row.original.id })} className="text-white bg-gradient-to-b  from-red-400 to-red-600 hover:bg-red-300">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data,
    columns: subsidiPlanColumns,
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
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{label}</h3>
          <Button type="button" onClick={() => setOpen(true)} className="text-white bg-gradient-to-b from-blue-400 to-blue-600  text-sm p-0 h-auto">
            <Plus className="h-4 w-4" /> Tambah Plan
          </Button>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <Input placeholder="Cari Plan..." value={(table.getColumn('title')?.getFilterValue() as string) ?? ''} onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)} className="max-w-sm" />
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
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          {loading ? (
            <>
              {' '}
              <Table>
                <TableHeader>
                  <TableRow>
                    {subsidiPlanColumns.map((_, i) => (
                      <TableHead key={i}>
                        <Skeleton className="h-4 w-20 rounded-md" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {subsidiPlanColumns.map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="h-4 w-full rounded-md" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <>
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
                      <TableCell colSpan={subsidiPlanColumns.length} className="h-24 text-center">
                        Tidak ada hasil.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
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
      <ModalAddSubsidi isOpen={open} onOpenChange={setOpen} onCancel={() => setOpen(false)} payload={payload} setPayload={setPayload} />
    </div>
  );
};

export default DataTable;
