import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header'; // Importing the Header component

export default function VehicleDetail({ vehicle }) {
  return (
    <>
      <Head title={`${vehicle.make} ${vehicle.model}`} />
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <Header />

        <main className="p-8">
          <h1 className="text-3xl font-bold mb-4">{vehicle.make} {vehicle.model}</h1>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image display */}
            <img
              src={vehicle.image_url ? vehicle.image_url : '/images/default-vehicle.jpg'}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">License Plate: {vehicle.license_plate}</p>
              <p className="text-gray-500">Odometer: {vehicle.odometer} km</p>
              <p className="text-gray-500">Rate: ${vehicle.rental_rate_per_day} per day</p>
              <p className="text-sm text-gray-500 capitalize">Status: {vehicle.status}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
