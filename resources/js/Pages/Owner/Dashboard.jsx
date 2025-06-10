import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/react';

const Dashboard = ({ message, auth }) => {
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <>
      <Head title="Owner Dashboard" />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{message}</h1>

        {auth?.user && (
          <p className="mb-4">
            Welcome back, <strong>{auth.user.name}</strong>!
          </p>
        )}

        <p className="mb-6">
          Here, you can manage your properties, view reports, and update your profile.
        </p>

        <div className="mb-4">
          <Link
            href={route('owner.profile')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Go to Profile
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
