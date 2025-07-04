import React from 'react';
import StaffLayout from '@/Layouts/StaffLayout';

export default function Bookings() {
  return (
    <StaffLayout>
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <p>Here you'll see a table of users with actions (approve, cancel, view details).</p>
      {/* Booking table or list component goes here */}
    </StaffLayout>
  );
}