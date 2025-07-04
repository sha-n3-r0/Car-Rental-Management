import React from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import NotificationBell from '@/Components/NotificationBell';

const StaffLayout = ({ children }) => {
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white border-b shadow">
        <h1 className="text-xl font-bold text-gray-800">Staff Dashboard</h1>
        <NotificationBell />
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
          <h2 className="text-2xl font-bold mb-8">CL Carhub Rental</h2>

          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link href={route('staff.dashboard')} className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={route('staff.bookings')} className="hover:underline">
                  Booking Management
                </Link>
              </li>
              <li>
                <Link href={route('staff.vehicles')} className="hover:underline">
                  Vehicle Management
                </Link>
              </li>
              <li>
                <Link href={route('staff.fleet')} className="hover:underline">
                  Fleet Tracking & Maintenance
                </Link>
              </li>
            </ul>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StaffLayout;
