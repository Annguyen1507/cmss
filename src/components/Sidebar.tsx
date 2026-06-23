  import { Menu, ChevronDown, Ellipsis, LogOut } from 'lucide-react';
  import { useState } from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { sidebarItems } from '../constants/sidebar';

  export default function Sidebar() {
    const [showMenu, setShowMenu] =
    useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
      localStorage.removeItem(
        'accessToken'
      );
      localStorage.removeItem(
        'refreshToken'
      );
      localStorage.removeItem(
        'admin'
      );
      navigate('/login');
    };

    return (
      <aside
        className="flex h-full w-[280px] flex-col border-r border-gray-200 bg-white"
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
              location.pathname === item.path;

            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`mx-2 mb-2 flex h-11 w-[calc(100%-16px)] items-center gap-4 rounded-md px-4 transition cursor-pointer

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

        <div className="relative">
    {showMenu && (
      <div
        className="absolute bottom-[80px] right-3 w-[140px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 text-[14px] text-slate-600 transition hover:bg-gray-50 cursor-pointer">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    )}

    <div
      className="flex h-[72px] items-center justify-between border-t bg-[#EAE2F8] px-4"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white"
        >
          A
        </div>

        <span className="font-medium">
          Super Admin
        </span>
      </div>

      <button
        onClick={() =>
          setShowMenu(
            !showMenu
          )
        }
        className="rounded p-1 transition hover:bg-black/5 cursor-pointer"
      >
        <Ellipsis size={20} />
      </button>
    </div>
  </div>
      </aside>
    );
  }