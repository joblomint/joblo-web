import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@project/components/ui/table';
import { Button } from '@project/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@project/components/ui/select';
import type { Lead, Status } from './LeadsBoard';
import { STATUSES } from './LeadsBoard';

type Props = { data: Lead[]; onOpen: (id: string) => void; onStatus: (id: string, s: Status) => void };

const sortHeader = (label: string) => ({ column }: { column: { toggleSorting: (d: boolean) => void; getIsSorted: () => false | 'asc' | 'desc' } }) => (
  <button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>{label}<ArrowUpDown className="h-3 w-3" /></button>
);

export default function LeadsTable({ data, onOpen, onStatus }: Props) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'submittedAt', desc: true }]);
  const columns = useMemo<ColumnDef<Lead>[]>(() => [
    { accessorKey: 'name', header: sortHeader('Name'), cell: ({ row }) => <div><p className="font-medium">{row.original.name}</p><p className="text-xs text-muted-foreground">{row.original.business || row.original.email}</p></div> },
    { accessorKey: 'projectType', header: sortHeader('Project') },
    { accessorKey: 'budget', header: sortHeader('Budget') },
    { accessorKey: 'submittedAt', header: sortHeader('Received'), cell: ({ getValue }) => { const v = getValue<string>(); return v ? format(new Date(v), 'd MMM yyyy') : '—'; } },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <Select value={row.original.status} onValueChange={(v) => onStatus(row.original.id, v as Status)}>
          <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
          <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    ) },
  ], [onStatus]);
  const table = useReactTable({ data, columns, state: { sorting }, onSortingChange: setSorting, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel(), initialState: { pagination: { pageSize: 15 } } });

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>{table.getHeaderGroups().map((g) => <TableRow key={g.id}>{g.headers.map((h) => <TableHead key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TableHead>)}</TableRow>)}</TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? table.getRowModel().rows.map((r) => (
              <TableRow key={r.id} className="cursor-pointer" onClick={() => onOpen(r.original.id)}>
                {r.getVisibleCells().map((c) => <TableCell key={c.id}>{flexRender(c.column.columnDef.cell, c.getContext())}</TableCell>)}
              </TableRow>
            )) : <TableRow><TableCell colSpan={5} className="py-12 text-center text-muted-foreground">No leads yet. Quote requests from your site will appear here.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t border-border p-3 text-sm text-muted-foreground">
        <span>{data.length} lead{data.length === 1 ? '' : 's'}</span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous</Button>
          <Button size="sm" variant="outline" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next</Button>
        </div>
      </div>
    </div>
  );
}
