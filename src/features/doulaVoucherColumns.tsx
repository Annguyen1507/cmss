import type { ColumnDef } from '@tanstack/react-table';
import type { DoulaVoucher } from './voucher/type';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export const doulaVoucherColumns: ColumnDef<DoulaVoucher>[] = [
  {
    id: 'takeBy',
    accessorKey: 'doulaUser.fullName',
    header: 'Take by',
    size: 400,
    cell: ({ row }) => row.original.doulaUser?.fullName || '-',
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: 'Date',
    size: 400,
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];