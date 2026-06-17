type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function InputField({
  label,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="w-full">
      <label className="mb-[5px] block text-[14px]">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[5px] border border-[#B6B6B6] px-[15px] text-[14px] outline-none"
      />
    </div>
  );
}