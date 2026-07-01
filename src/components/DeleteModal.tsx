import { AlertCircle } from 'lucide-react';

type DeleteModalProps = {
  title: string;
  message?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function DeleteModal({
  title,
  message = 'Are you sure you want to delete this item?',
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[440px] rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-7 w-7 text-red-500" strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        <p className="mt-2 text-base text-slate-500">{message}</p>

        <div className="mt-8 flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-slate-500 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-lg bg-[#DC3545] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#c62828]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}