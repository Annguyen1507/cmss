import { ChevronDown, X } from 'lucide-react';
import { useForm } from 'react-hook-form';

export type VoucherFormValues = {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'expired';
  type: 'fixed' | 'percent';
  amount: number;
  quantityUse: number;
  minPayAmount: number;
  maxDiscountAmount: number;
};

type VoucherFormProps = {
  onClose: () => void;
  onSubmit: (values: VoucherFormValues) => void | Promise<void>;
};

type FormValues = {
  code: string;
  description: string;
  startDate: string;
  endDate: string;
  type: 'fixed' | 'percent' | '';
  amount: string;
  minPayAmount: string;
  maxDiscountAmount: string;
};

export default function VoucherForm({
  onClose,
  onSubmit,
}: VoucherFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      code: '',
      description: '',
      startDate: '',
      endDate: '',
      type: '',
      amount: '',
      minPayAmount: '',
      maxDiscountAmount: '',
    },
  });

  const code = watch('code');
  const selectedType = watch('type');

  async function handleSubmitVoucher(values: FormValues) {
    if (!values.type) return;
    await onSubmit({
      code: values.code,
      description: values.description,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      status: 'active',
      type: values.type,
      amount: Number(values.amount),
      quantityUse: 6767,
      minPayAmount: Number(values.minPayAmount),
      maxDiscountAmount: Number(values.maxDiscountAmount),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <form
        onSubmit={handleSubmit(handleSubmitVoucher)}
        className="flex h-full w-[560px] max-w-[calc(100vw-24px)] flex-col bg-white"
      >
        <div className="flex h-[68px] items-center justify-between border-b border-[#D8D8D8] px-6">
          <h2 className="text-[22px] font-medium text-[#111]">
            Create Voucher
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[#666] transition hover:text-[#4B00A7]"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[16px] text-[#111]">
                Code <span className="text-[#E53935]">*</span>
              </label>

              <div className="relative">
                <input
                  {...register('code', {
                    required: 'Code is required',
                    maxLength: {
                      value: 50,
                      message: 'Code must be 50 characters or less',
                    },
                  })}
                  maxLength={50}
                  placeholder="Code"
                  className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 pr-16 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#777]">
                  {code.length}/50
                </span>
              </div>

              {errors.code && (
                <p className="mt-1 text-sm text-[#E53935]">
                  {errors.code.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-[16px] text-[#111]">
                Description
              </label>

              <textarea
                {...register('description')}
                placeholder="Description"
                className="h-[100px] w-full resize-none rounded-md border border-[#BDBDBD] px-4 py-3 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-[16px] text-[#111]">
                  Start Date
                </label>

                <input
                  {...register('startDate', {
                    required: 'Start date is required',
                  })}
                  type="date"
                  className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none focus:border-[#4B00A7]"
                />

                {errors.startDate && (
                  <p className="mt-1 text-sm text-[#E53935]">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-[16px] text-[#111]">
                  End Date
                </label>

                <input
                  {...register('endDate', {
                    required: 'End date is required',
                  })}
                  type="date"
                  className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none focus:border-[#4B00A7]"
                />

                {errors.endDate && (
                  <p className="mt-1 text-sm text-[#E53935]">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[16px] text-[#111]">
                Type of coupon <span className="text-[#E53935]">*</span>
              </label>

              <div className="relative">
                <select
                  {...register('type', {
                    required: 'Type is required',
                  })}
                  className={`h-[48px] w-full appearance-none rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none focus:border-[#4B00A7] ${selectedType ? 'text-[#111]' : 'text-[#B7B7B7]'}`}
                >
                  <option value="" disabled>Select</option>
                  <option value="fixed">Fixed</option>
                  <option value="percent">Percent</option>
                </select>

                <div className="pointer-events-none absolute right-0 top-1/2 flex h-8 w-12 -translate-y-1/2 items-center justify-center border-l border-[#D8D8D8]">
                  <ChevronDown size={22} className="text-[#B7B7B7]" />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[16px] text-[#111]">
                Amount <span className="text-[#E53935]">*</span>
              </label>

              <div className="relative">
                <input
                  {...register('amount', {
                    required: 'Amount is required',
                  })}
                  type="number"
                  placeholder="Amount"
                  className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 pr-12 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[20px] text-[#111]">
                  $
                </span>
              </div>

              {errors.amount && (
                <p className="mt-1 text-sm text-[#E53935]">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-[16px] text-[#111]">
                Condition <span className="text-[#E53935]">*</span>
              </label>

              <input
                {...register('minPayAmount', {
                  required: 'Condition is required',
                })}
                type="number"
                placeholder="Min of payment"
                className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
              />

              {errors.minPayAmount && (
                <p className="mt-1 text-sm text-[#E53935]">
                  {errors.minPayAmount.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-[16px] text-[#111]">
                Condition max of discount{' '}
                <span className="text-[#E53935]">*</span>
              </label>

              <input
                {...register('maxDiscountAmount', {
                  required: 'Max discount is required',
                })}
                type="number"
                placeholder="Max of discount"
                className="h-[48px] w-full rounded-md border border-[#BDBDBD] px-4 text-[16px] outline-none placeholder:text-[#B7B7B7] focus:border-[#4B00A7]"
              />

              {errors.maxDiscountAmount && (
                <p className="mt-1 text-sm text-[#E53935]">
                  {errors.maxDiscountAmount.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#D8D8D8] bg-white px-3 py-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[44px] w-full cursor-pointer rounded-md bg-[#4B00A7] text-[16px] font-semibold text-white transition hover:bg-[#3d0088] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}