import { PenLine, Trash2 } from 'lucide-react';

type ActionCellProps = {
  articleId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function ActionCell({
  articleId,
  onDelete,
  onEdit,
}: ActionCellProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onEdit(articleId)}
        className="cursor-pointer text-[#EC4899] transition-colors hover:text-[#4B00A7]"
      >
        <PenLine size={18} />
      </button>

      <button
        onClick={() => onDelete(articleId)}
        className="cursor-pointer text-[#6E6E6E] transition-colors hover:text-[#E53935]"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}