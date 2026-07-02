import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type DetailDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  page: number;
  pageSize: number;
  totalRows: number;
  sorting: SortingState;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (sorting: SortingState) => void;
};

export default function DetailDataTable<T>({
  data,
  columns,
  page,
  pageSize,
  totalRows,
  sorting,
  loading,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
}: DetailDataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageSize: pageSize,
        pageIndex: page - 1,
      },
    },
    onPaginationChange: (updater) => {
      const current = {
        pageIndex: page - 1,
        pageSize,
      };
      const next =
        typeof updater === 'function'
          ? updater(current)
          : updater;
      if (next.pageSize !== pageSize) {
        onPageSizeChange(next.pageSize);
        onPageChange(1);
        return;
      }
      onPageChange(next.pageIndex + 1);
    },
    onSortingChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater(sorting)
          : updater;

      onSortingChange(next);
      onPageChange(1);
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount: totalRows,
  });

  const startRow = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
  const endRow = Math.min(page * pageSize, totalRows);

  return (
    <div className="flex h-[400px] flex-col overflow-hidden rounded-sm border border-[#D8D8D8] bg-white">
      <div className="overflow-auto">
        <table className="w-full border-separate border-spacing-0 text-[15px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-[64px] bg-[#F7F7F7]">
                {headerGroup.headers.map((header) => {
                  const isActiveSort = sorting[0]?.id === header.column.id;
                  const canSort = header.column.getCanSort();

                  return (
                    <th
                      key={header.id}
                      className="border-b border-r border-[#D9D9D9] px-6 text-left text-[15px] font-medium text-[#202020] whitespace-nowrap last:border-r-0"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-2 ${canSort ? 'cursor-pointer select-none' : ''
                            }`}
                          onClick={() => {
                            if (!canSort) return;

                            if (isActiveSort) {
                              onSortingChange([]);
                            } else {
                              onSortingChange([
                                { id: header.column.id, desc: false },
                              ]);
                            }

                            onPageChange(1);
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {canSort && (
                            <span>
                              {isActiveSort ? (
                                <ArrowUp size={14} />
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
            {loading ? (
              Array.from({ length: pageSize > 10 ? 10 : pageSize }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`} className="h-[60px]">
                  {columns.map((_, colIndex) => (
                    <td
                      key={`skeleton-cell-${colIndex}`}
                      className="border-b border-r border-[#D9D9D9] px-6 align-middle last:border-r-0"
                    >
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length} className="p-0">
                  <div className="flex h-[336px] items-center justify-center text-[15px] text-[#999]">
                    No data available
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`h-[60px] hover:bg-[#F9F9F9] ${index % 2 === 0 ? 'bg-white' : 'bg-[#F3F3F3]'
                    }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b border-r border-[#D9D9D9] px-6 align-middle text-[15px] text-[#2F2F2F] last:border-r-0"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-auto shrink-0 flex items-center justify-between border-t border-[#D8D8D8] px-6 py-4">
        <div className="text-sm text-[#666]">
          Showing {startRow} to {endRow} of {totalRows} entries
        </div>

        <div className="flex items-center gap-4">
          <select
            value={pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded border border-[#D8D8D8] px-3 py-2 text-sm cursor-pointer"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={page === 1}
              className="rounded border border-[#D8D8D8] p-2 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex h-9 min-w-9 items-center justify-center rounded bg-black px-3 text-white">
              {page}
            </div>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
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