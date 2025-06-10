import React from 'react';
import OwnerLayout from '@/Layouts/OwnerLayout';

export default function Bookings() {
  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold mb-4">Report & Analytics</h1>
      <p>Here you'll see a table of Report & Analytics with actions (approve, cancel, view details).</p>
      {/* Booking table or list component goes here */}
    </OwnerLayout>
  );
}