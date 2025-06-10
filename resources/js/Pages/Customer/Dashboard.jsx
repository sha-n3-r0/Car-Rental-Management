import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

const Dashboard = ({ message, auth }) => {
  return (
    <>
      <Head title="Customer Dashboard" />

      {/* Header with logout & profile */}
      <Header auth={auth} />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{message}</h1>

        {auth?.user && (
          <p className="mb-4">
            Welcome back, <strong>{auth.user.name}</strong>!
          </p>
        )}

        <p className="mb-6">Here, you can see your account details, order history, and more.</p>
      </div>
    </>
  );
};

export default Dashboard;
