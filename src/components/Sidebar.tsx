import {
  Menu,
  ChevronDown,
  Ellipsis,
} from 'lucide-react';

import { sidebarItems } from '../constants/sidebar';

export default function Sidebar() {
  return (
    <aside
      className="flexh-screen w-[280px] flex-col border-r border-gray-200 bg-white"
    >
      <div
        className="flex h-[68px] items-center justify-between bg-[#4B00A7] px-6 text-white"
      >
        <span className="font-medium">
          NurtureWave
        </span>

        <Menu size={20} />
      </div>

      <div className="flex-1 py-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.label === 'Voucher';

          return (
            <button
              key={item.label}
              className={`mx-2 mb-1 flex h-10 w-[calc(100%-16px)] items-center gap-4 rounded-md px-4 transition

                ${
                  isActive
                    ? 'border border-gray-300 bg-gray-50 text-[#4B00A7]'
                    : 'text-slate-500 hover:bg-gray-50'
                }
              `}
            >
              <Icon size={22} />

              <span className="text-[15px]">
                {item.label}
              </span>

              {item.label === 'Accounts' && (
                <ChevronDown
                  size={18}
                  className="ml-auto"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        className="
          flex
          h-[72px]
          items-center
          justify-between
          border-t
          bg-[#EAE2F8]
          px-4
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-gray-300
              text-white
            "
          >
            A
          </div>

          <span className="font-medium">
            Super Admin
          </span>
        </div>

        <Ellipsis size={20} />
      </div>
    </aside>
  );
}