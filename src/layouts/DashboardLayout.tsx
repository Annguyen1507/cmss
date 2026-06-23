import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex flex-1 flex-col bg-[#F7F7F7] overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}