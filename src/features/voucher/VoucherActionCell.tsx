import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type VoucherActionCellProps = {
  voucherId: string;
};


export default function VoucherActionCell({ voucherId}: VoucherActionCellProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      <button
        className="cursor-pointer text-[#EC4899] transition-colors hover:text-[#4B00A7]"
        onClick={() => navigate(`/voucher/${voucherId}`)}
      >
        <Eye size={18} />
      </button>

      <button
        className="cursor-pointer text-[#6E6E6E] transition-colors hover:text-[#E53935]"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}