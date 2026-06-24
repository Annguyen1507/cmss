import { 
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState, } from '@tanstack/react-table';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  page: number;
  onPageChange: (page: number) => void;
};

export default function DataTable<T>({
  data,
  columns,
  page,
  onPageChange,

}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(25);
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: 190,
      minSize: 190,
      maxSize: 190,
    },
    state: {
      columnPinning: {
        right: ['action'],
      },
      sorting,
      pagination: {
        pageSize: pageSize,
        pageIndex: page - 1,
      },
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function'
      ? updater({ pageIndex: page - 1, pageSize })
      : updater
      setPageSize(next.pageSize);
    onPageChange(next.pageIndex + 1);
  },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    
  });

  

  const startRow =
    data.length === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endRow = Math.min((page) * pageSize, data.length);

  return (
    <div className="overflow-hidden rounded-sm border border-[#D8D8D8] bg-white">
      <div className="overflow-x-auto">
        <table
          className="border-separate border-spacing-0 text-[15px]"
          style={{
            tableLayout: 'fixed',
            width: table.getTotalSize(),
          }}
        >
          <thead>
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="h-[64px] bg-[#F7F7F7]"
                >
                  {headerGroup.headers.map(
                    (header) => {
                      const sorted =
                        header.column.getIsSorted();

                      const canSort =
                        header.column.getCanSort();

                      return (
                        <th
                          key={header.id}
                          style={{
                            width:
                              header.getSize(),
                            minWidth:
                              header.getSize(),
                          }}
                          className={`border-b border-r border-[#D9D9D9] px-6 text-left text-[15px] font-medium text-[#202020] whitespace-nowrap ${
                            header.column.getIsPinned() ===
                            'right'
                              ? 'sticky right-0 z-20 border-l bg-[#F7F7F7]'
                              : ''
                          }`}
                        >
                          {header.isPlaceholder
                            ? null
                            : (
                                <div
                                  className={`flex items-center gap-2 ${
                                    canSort
                                      ? 'cursor-pointer select-none'
                                      : ''
                                  }`}
                                  onClick={header.column.getToggleSortingHandler()}
                                >
                                  {flexRender(
                                    header.column
                                      .columnDef
                                      .header,
                                    header.getContext(),
                                  )}

                                  {canSort && (
                                    <span>
                                      {sorted ===
                                      'asc' ? (
                                        <ArrowUp
                                          size={
                                            14
                                          }
                                        />
                                      ) : sorted ===
                                        'desc' ? (
                                        <ArrowDown
                                          size={
                                            14
                                          }
                                        />
                                      ) : (
                                        <ArrowUpDown
                                          size={
                                            14
                                          }
                                        />
                                      )}
                                    </span>
                                  )}
                                </div>
                              )}
                        </th>
                      );
                    },
                  )}
                </tr>
              ))}
          </thead>

          <tbody>
            {table
              .getRowModel()
              .rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`h-[60px] hover:bg-[#F9F9F9] ${
                    index % 2 === 0
                      ? 'bg-white'
                      : 'bg-[#F3F3F3]'
                  }`}
                >
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <td
                        key={cell.id}
                        style={{
                          width:
                            cell.column.getSize(),
                          minWidth:
                            cell.column.getSize(),
                          maxWidth:
                            cell.column.getSize(),
                          overflow:
                            'hidden',
                          textOverflow:
                            'ellipsis',
                          whiteSpace:
                            'nowrap',
                        }}
                        className={`border-b border-r border-[#D9D9D9] px-6 align-middle text-[15px] text-[#2F2F2F] ${
                          cell.column.getIsPinned() ===
                          'right'
                            ? `sticky right-0 z-10 border-l ${
                                index % 2 === 0
                                  ? 'bg-white'
                                  : 'bg-[#F3F3F3]'
                              }`
                            : ''
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef
                            .cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#D8D8D8] px-6 py-4">
        <div className="text-sm text-[#666]">
          Showing {startRow} to {endRow} of{' '}
          {data.length} entries
        </div>

        <div className="flex items-center gap-4">
          <select
            value={pageSize}
            onChange={(e) =>
              table.setPageSize(
                Number(e.target.value),
              )
            }
            className="rounded border border-[#D8D8D8] px-3 py-2 text-sm cursor-pointer"
          >
            {[10, 25, 50, 100].map(
              (size) => (
                <option
                  key={size}
                  value={size}
                >
                  {size} per page
                </option>
              ),
            )}
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onPageChange(page - 1)
              }
              disabled={
                page === 1
              }
              className="rounded border border-[#D8D8D8] p-2 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex h-9 min-w-9 items-center justify-center rounded bg-black px-3 text-white">
              {page}
            </div>

            <button
              onClick={() =>
                onPageChange(page + 1)
              }
              disabled={
                !table.getCanNextPage()
              }
              className="rounded border border-[#D8D8D8] p-2 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}