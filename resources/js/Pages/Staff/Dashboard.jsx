import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Dashboard = ({ message }) => {
  // Handle logout
  const handleLogout = () => {
    Inertia.post('/logout');
  };

  return (
    <div>
      <h1>{message}</h1>
      <p>Welcome to your staff dashboard!</p>
      <p>Here, you can see your account details, order history, and more.</p>
      
      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
