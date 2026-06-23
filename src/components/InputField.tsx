import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type InputFieldProps = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  error,
  type = 'text',
  className,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword =
    type === 'password';

  return (
    <div className="w-full">
      <label
        className={`mb-[5px] block text-[14px] font-normal leading-[100%]
          ${
            error
              ? 'text-[#d32f2f]'
              : 'text-black'
          }
        `}
      >
        {label}
      </label>

      <div
        className={
          isPassword
            ? 'relative'
            : ''
        }
      >
        <input
          {...props}
          type={
            isPassword
              ? (
                  showPassword
                    ? 'text'
                    : 'password'
                )
              : type
          }
          className={`h-12 w-full rounded-[5px] border px-[15px] text-[14px] outline-none placeholder:text-[#B6B6B6]
            ${
              isPassword
                ? 'pr-12'
                : ''
            }
            ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-[#B6B6B6] focus:border-[#07bc0c]'
            }
            ${className ?? ''}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#808080]"
          >
            {showPassword ? (
              <Eye size={24} />
            ) : (
              <EyeOff size={24} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-[#e83939]">
          {error}
        </p>
      )}
    </div>
  );
}