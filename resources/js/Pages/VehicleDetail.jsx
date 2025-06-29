import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header'; // Importing the Header component

export default function VehicleDetail({ vehicle }) {
  return (
    <>
      <Head title={`${vehicle.make} ${vehicle.model}`} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
        {/* Header */}
        <Header />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900 drop-shadow-sm">
            {vehicle.make} {vehicle.model}
          </h1>

          {/* Vehicle card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-100">
            {/* Vehicle image */}
            <div className="relative w-full h-64 sm:h-80 overflow-hidden">
              <img
                src={vehicle.image_url || '/images/default-vehicle.jpg'}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover transform transition-transform hover:scale-105"
              />
              {/* Status badge */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${
                  vehicle.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {vehicle.status}
              </span>
            </div>

            {/* Vehicle details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                <Detail label="License Plate" value={vehicle.license_plate} />
                <Detail label="Odometer" value={`${vehicle.odometer} km`} />
                <Detail label="Rate" value={`$${vehicle.rental_rate_per_day}/day`} />
              </div>
              <div className="pt-4 border-t border-blue-100 text-center">
                <button
                  className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-full shadow hover:bg-blue-700 transition-colors"
                >
                  Book This Vehicle
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// Detail component for reusability
function Detail({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-blue-800 font-medium">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}
