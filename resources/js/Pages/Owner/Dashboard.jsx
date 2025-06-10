import React from 'react';
import { Head } from '@inertiajs/react';
import OwnerLayout from '@/Layouts/OwnerLayout';

const Dashboard = ({ message, auth }) => {
  return (
    <>
      <Head title="Owner Dashboard" />
      <OwnerLayout>
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{message || 'Owner Dashboard'}</h1>

          {auth?.user && (
            <p className="mb-4">
              Welcome back, <strong>{auth.user.name}</strong>!
            </p>
          )}

          <p className="mb-6">
            Here, you can manage your properties, view reports, and update your profile.
          </p>

          <div className="mb-4">
            <a
              href={route('owner.profile')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go to Profile
            </a>
          </div>
        </div>
      </OwnerLayout>
    </>
  );
};

export default Dashboard;
