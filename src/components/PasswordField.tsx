// import { useState } from 'react';
// import type { InputHTMLAttributes } from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// type PasswordFieldProps = {
//   error?: string;
// } & InputHTMLAttributes<HTMLInputElement>;

// export default function PasswordField({
//   error,
//   className,
//   ...props
// }: PasswordFieldProps) {
//   const [showPassword, setShowPassword] =
//     useState(false);

//   return (
//     <div className="w-full">
//       <label
//         className={`mb-[5px] block text-[14px] font-normal leading-[100%]
//           ${
//             error
//             ? 'text-[#d32f2f]'
//             : 'text-black'
//           }
//           `}
//       >
//         Password
//       </label>

//       <div className="relative">
//         <input
//           {...props}
//           type={
//             showPassword
//               ? 'text'
//               : 'password'
//           }
//           className={`h-12 w-full rounded-[5px] border px-[15px] pr-12 text-[14px] outline-none placeholder:text-[#B6B6B6] focus:border-[#4B00A7]
//             ${
//               error
//                 ? 'border-red-500 focus:border-red-500'
//                 : 'border-[#B6B6B6] focus:border-[#07bc0c]'
//             }
//             ${className ?? ''}
//           `}
//         />

//         <button
//           type="button"
//           onClick={() =>
//             setShowPassword(
//               !showPassword
//             )
//           }
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#808080] cursor-pointer"
//         >
//           {showPassword ? (
//             <Eye size={24} />
//           ) : (
//             <EyeOff size={24} />
//           )}
//         </button>
//       </div>

//       {error && (
//         <p className="mt-1 text-xs text-[#e83939]">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }