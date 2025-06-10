import React from 'react';
import { Head } from '@inertiajs/react';
import StaffLayout from '@/Layouts/StaffLayout'; 
import { Inertia } from '@inertiajs/inertia';

const Dashboard = ({ message, auth }) => {
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <>
      <Head title="Staff Dashboard" />
      <StaffLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{message || 'Staff Dashboard'}</h1>

          {auth?.user && (
            <p className="mb-4">
              Welcome back, <strong>{auth.user.name}</strong>!
            </p>
          )}

          <p className="mb-6">
            Here you can manage your staff profile and internal tasks.
          </p>

          <div className="mb-4">
            <a
              href={route('staff.profile')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go to Profile
            </a>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </StaffLayout>
    </>
  );
};

export default Dashboard;
