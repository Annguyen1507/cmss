import type { InputHTMLAttributes } from "react";

type InputFieldProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label
        className={`mb-[5px] block text-[14px] font-normal
          ${
            error 
            ? 'text-[#d32f2f]'
            : 'text-black'
          }
          `}
      >
        {label}
      </label>

      <input
        {...props}
        className={`h-12 w-full rounded-[5px] border px-[15px] text-[14px] outline-none placeholder:text-[#B6B6B6] 
          ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-[#B6B6B6] focus:border-[#07bc0c]'
          }
        `}
      />

      {error && (
        <p className="mt-1 text-xs text-[#e83939]">
          {error}
        </p>
      )}
    </div>
  );
}