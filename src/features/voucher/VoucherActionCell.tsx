import { Eye, Trash2 } from 'lucide-react';

type VoucherActionCellProps = {
  voucherId: string;
  onDelete: (id: string) => void;
};

export default function VoucherActionCell({
  voucherId,
  onDelete,
}: VoucherActionCellProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        className="cursor-pointer text-[#EC4899] transition-colors hover:text-[#4B00A7]"
      >
        <Eye size={18} />
      </button>

      <button
        onClick={() => onDelete(voucherId)}
        className="cursor-pointer text-[#6E6E6E] transition-colors hover:text-[#E53935]"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}