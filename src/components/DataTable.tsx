import { 
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState, } from '@tanstack/react-table';
import {
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  page: number;
  pageSize: number;
  totalRows: number;
  sorting: SortingState;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (sorting: SortingState) => void;
};

export default function DataTable<T>({
  data,
  columns,
  page,
  pageSize,
  totalRows,
  sorting,
  onPageChange,
  onPageSizeChange,
  onSortingChange,

}: DataTableProps<T>) {
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

  

  const startRow =
    totalRows === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const endRow = Math.min((page) * pageSize, data.length);

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-sm border border-[#D8D8D8] bg-white">
      <div className="min-h-0 flex-1 overflow-auto">
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
                      const isActiveSort = sorting[0]?.id === header.column.id;

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
                                onClick={() => {
                                  if (!canSort) return;

                                  if (isActiveSort) {
                                    onSortingChange([]);
                                  } else {
                                    onSortingChange([{ id: header.column.id, desc: false }]);
                                  }

                                  onPageChange(1);
                                }}
                                >
                                  {flexRender(
                                    header.column
                                      .columnDef
                                      .header,
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
                            cell.column.id === 'id' ? 'visible' : 'hidden',
                          textOverflow:
                            cell.column.id === 'id' ? 'clip' : 'ellipsis',
                          whiteSpace:
                            cell.column.id === 'id' ? 'normal' : 'nowrap',
                          wordBreak:
                            cell.column.id === 'id' ? 'break-all' : 'normal',
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

      <div className="shrink-0 flex items-center justify-between border-t border-[#D8D8D8] px-6 py-4">
        <div className="text-sm text-[#666]">
          Showing {startRow} to {endRow} of{' '}
          {totalRows} entries
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
                table.previousPage()
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
                table.nextPage()
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