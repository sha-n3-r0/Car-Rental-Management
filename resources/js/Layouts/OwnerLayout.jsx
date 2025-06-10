import React from 'react';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const OwnerLayout = ({ children }) => {
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">CL Carhub Rental</h2>
        
        <ul className="space-y-4">
            <li>
                <Link href={route('owner.dashboard')} className="hover:underline">
                Dashboard
                </Link>
            </li>
            <li>
                <Link href={route('owner.bookings')} className="hover:underline">
                Booking Management
                </Link>
            </li>
            <li>
                <Link href={route('owner.users')} className="hover:underline">
                User Management
                </Link>
            </li>
            <li>
                <Link href={route('owner.vehicles')} className="hover:underline">
                Vehicle Management
                </Link>
            </li>
            <li>
                <Link href={route('owner.fleet')} className="hover:underline">
                Fleet Tracking & Maintenance
                </Link>
            </li>
            <li>
                <Link href={route('owner.reports')} className="hover:underline">
                Reports & Analytics
                </Link>
            </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
};

export default OwnerLayout;
