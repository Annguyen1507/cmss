import { Circle, CircleCheck } from 'lucide-react';

type Props = {
  met: boolean;
  text: string;
};

export default function PasswordRequirement({
  met,
  text,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {met ? (
        <CircleCheck
          size={10}
          className="text-[#66784C]"
        />
      ) : (
        <Circle
          size={10}
          className="text-[#C7CFDD]"
        />
      )}

      <span className="text-[#7A7A7A]">
        {text}
      </span>
    </div>
  );
}