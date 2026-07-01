import type { ColumnDef } from '@tanstack/react-table';
import type { Voucher } from './type';
import VoucherActionCell from './VoucherActionCell';

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
export function getVoucherColumns(
  onPatch: (id: string) => void
): ColumnDef<Voucher>[] {
  return [
  {
      accessorKey: 'id',

      header: 'ID',

      enableSorting: false,

      cell: ({ getValue }) => {
        const id = getValue() as string;

        return (
          <span>
            {id}
          </span>
        );
      },
    },

    {
      accessorKey: 'code',

      header: 'Code',

      cell: ({ getValue }) => (
        <span className="block truncate font-medium">
          {getValue() as string}
        </span>
      ),
    },

    {
      accessorKey: 'status',

      header: 'Status',

      cell: ({ getValue }) => {
        const status = getValue() as string;

        return (
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                status === 'active'
                  ? 'bg-[#63B32E]'
                  : 'bg-[#E53935]'
              }`}
            />

            <span className="capitalize">
              {status}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: 'startDate',

      header: 'Start Date',

      cell: ({ getValue }) =>
        formatDate(getValue() as string),
    },

    {
      accessorKey: 'endDate',

      header: 'End Date',

      cell: ({ getValue }) =>
        formatDate(getValue() as string),
    },

    {
      id: 'numOfUsed',

      accessorKey: 'numOfUsed',

      header: 'Number Of Use',

      cell: ({ row }) => (
        <span>
          {row.original.numOfUsed}/
          {row.original.quantityUse}
        </span>
      ),
    },

    {
      id: 'action',

      size: 90,

      minSize: 90,

      maxSize: 90,

      header: 'Action',

      enableSorting: false,

      cell: ({ row }) => <VoucherActionCell voucherId={row.original.id} onPatch={onPatch} />
      },
  ];
}
