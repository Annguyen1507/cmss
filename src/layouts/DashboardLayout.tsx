import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-[#F7F7F7]">
        <Outlet />
      </main>
    </div>
  );
}