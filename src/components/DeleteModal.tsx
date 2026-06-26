type DeleteModalProps = {
  title: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export default function DeleteModal({
  title,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="border-b border-gray-200 bg-[#EAE2F8] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#4B00A7]">
            Confirm Delete
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-[15px] text-slate-600">
            Are you sure you want to delete{' '}
            <span className="font-medium text-slate-900">
              "{title}"
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-slate-400">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="cursor-pointer rounded-md bg-[#E53935] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#c62828]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}