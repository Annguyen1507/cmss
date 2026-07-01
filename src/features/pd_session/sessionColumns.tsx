import type { ColumnDef } from '@tanstack/react-table';
import type { Session } from './type';
import ActionCell from '../../components/ActionCell';

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getSessionColumns(
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
): ColumnDef<Session>[] {
  return [
    {
      accessorKey: 'id',

      header: 'ID',

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
      accessorKey: 'title',

      header: 'Title',
    },

    {
      accessorKey: 'author',

      header: 'Author',
    },

    {
      accessorKey: 'category',

      header: 'Category',

      cell: ({ row }) => (
        <span>
          {row.original.category?.name ?? '-'}
        </span>
      ),
    },

    {
      accessorKey: 'createdAt',

      header: 'Created Date',

      cell: ({ getValue }) =>
        formatDate(getValue() as string),
    },

    {
      accessorKey: 'status',

      header: 'Status',

      cell: ({ getValue }) => {
        const status = getValue() as string;

        const color =
          status === 'published'
            ? 'bg-[#63B32E]'
            : status === 'draft'
              ? 'bg-[#F4C430]'
              : 'bg-[#8C97A8]';

        return (
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${color}`} />

            <span className="capitalize">
              {status}
            </span>
          </div>
        );
      },
    },

    {
      id: 'action',

      size: 90,

      minSize: 90,

      maxSize: 90,

      header: 'Action',

      enableSorting: false,

      cell: ({ row }) => (
        <ActionCell
          articleId={row.original.id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ),
    },
  ];
}