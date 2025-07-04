import React from 'react';
import OwnerLayout from '@/Layouts/OwnerLayout';
import { Link, usePage } from '@inertiajs/react';

export default function Bookings() {
  const { reservations } = usePage().props;

  // Group reservations by status including completed
  const grouped = {
    pending: [],
    approved: [],
    completed: [],
    cancelled: [],
  };

  reservations.forEach((res) => {
    if (grouped[res.status]) {
      grouped[res.status].push(res);
    }
  });

  // Define the order to display statuses including completed
  const statusOrder = ['pending', 'approved', 'completed', 'cancelled'];

  return (
    <OwnerLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Reservations</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Dates</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            {statusOrder.map((status) => (
              <tbody key={status}>
                {grouped[status].length > 0 && (
                  <tr>
                    <td colSpan="5" className="bg-gray-50 text-lg font-semibold px-4 py-2">
                      {status.charAt(0).toUpperCase() + status.slice(1)} Bookings
                    </td>
                  </tr>
                )}

                {grouped[status].map((reservation) => (
                  <tr key={reservation.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{reservation.user?.name || '—'}</td>
                    <td className="px-4 py-2">
                      {reservation.vehicle?.make} {reservation.vehicle?.model}
                    </td>
                    <td className="px-4 py-2">
                      {reservation.start_date} → {reservation.end_date}
                    </td>
                    <td className="px-4 py-2 capitalize">{reservation.status}</td>
                    <td className="px-4 py-2">
                      <Link
                        href={route('owner.reservations.show', reservation.id)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </OwnerLayout>
  );
}
