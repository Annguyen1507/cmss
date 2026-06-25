import { Search } from 'lucide-react';

type HeaderProps = {
    title: string;
    buttonText?: string;
    search: string;
    onSearchChange: (value: string) => void;
};

export default function Header({
    title,
    buttonText,
    search,
    onSearchChange,
}: HeaderProps) {
    return (
        <div
            className="flex h-[68px] items-center border-b border-gray-200 bg-white px-6"
        >
            <div className="w-[200px]">
                <span
                    className="text-[16px] font-normal text-[#5A5A5A]"
                >
                    {title}
                </span>
            </div>

            <div
                className="flex flex-1 justify-center"
            >
                <div className="relative">
                    <input
                        placeholder="Search"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-10 w-[350px] rounded-md border border-gray-300 pl-4 pr-10 text-sm outline-none focus:border-[#4B00A7] bg-gray-50"
                    />

                    <Search
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                    />
                </div>
            </div>

            <div
                className="flex w-[200px] justify-end"
            >
                {buttonText && (
                    <button
                        className="h-10 rounded-md bg-[#4B00A7] px-5 text-sm font-medium text-white transition-colors hover:bg-[#3D0088] cursor-pointer"
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
}