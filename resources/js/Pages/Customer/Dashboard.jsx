import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';

const Dashboard = ({ message, auth, reservations }) => {
  return (
    <>
      <Head title="Customer Dashboard" />

      {/* Header with logout & profile */}
      <Header auth={auth} />

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{message}</h1>

        {auth?.user && (
          <p className="mb-6">
            Welcome back, <strong>{auth.user.name}</strong>!
          </p>
        )}

        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id} className="mb-6 p-4 border rounded shadow-sm">
              <p><strong>Reservation ID:</strong> {reservation.id}</p>
              <p>
                <strong>Vehicle:</strong>{' '}
                {reservation.vehicle
                  ? `${reservation.vehicle.make} ${reservation.vehicle.model}`
                  : 'N/A'}
              </p>
              <p><strong>From:</strong> {new Date(reservation.start_date).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(reservation.end_date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {reservation.status}</p>
              <p><strong>Pickup Time:</strong> {reservation.pickup_time}</p>
              <p><strong>Dropoff Time:</strong> {reservation.dropoff_time}</p>
              <p><strong>Pickup Location:</strong> {reservation.pickup_location}</p>
              <p><strong>Dropoff Location:</strong> {reservation.dropoff_location}</p>
              <p><strong>Total Cost:</strong> ${reservation.total_cost}</p>
            </div>
          ))
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
