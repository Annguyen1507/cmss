import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export default function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: 190,
      minSize: 190,
      maxSize: 190,
    },
    state: {
      columnPinning: { right: ['action'] },
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-sm border border-[#D8D8D8] bg-white">
      <div className="overflow-x-auto">
        <table
          className="border-separate border-spacing-0 text-[15px]"
          style={{ tableLayout: 'fixed', width: table.getTotalSize() }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-[64px] bg-[#F7F7F7]">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize(), minWidth: header.getSize() }}
                      className={`border-b border-r border-[#D9D9D9] px-6 text-left text-[15px] font-medium text-[#202020] whitespace-nowrap ${
                        header.column.getIsPinned() === 'right'
                          ? 'sticky right-0 z-20 border-l bg-[#F7F7F7]'
                          : ''
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-2 ${canSort ? 'cursor-pointer select-none' : ''}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && (
                            <span className="text-[#202020]">
                              {sorted === 'asc' ? (
                                <ArrowUp size={14} />
                              ) : sorted === 'desc' ? (
                                <ArrowDown size={14} />
                              ) : (
                                <ArrowUpDown size={14} />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`h-[60px] hover:bg-[#F9F9F9] ${index % 2 === 0 ? 'bg-white' : 'bg-[#F3F3F3]'}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    className={`border-b border-r border-[#D9D9D9] px-6 align-middle text-[15px] text-[#2F2F2F] ${
                      cell.column.getIsPinned() === 'right'
                        ? `sticky right-0 z-10 border-l ${index % 2 === 0 ? 'bg-white' : 'bg-[#F3F3F3]'}`
                        : ''
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}