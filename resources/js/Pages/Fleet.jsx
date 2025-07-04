import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Fleet({ vehicles, auth }) {
  return (
    <>
      <Head title="Fleet" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-black flex flex-col">
        {/* Header with auth */}
        <Header auth={auth} />

        {/* Main Content */}
        <main className="px-8 py-12 max-w-7xl mx-auto flex-grow">
          <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight">
            <span className="text-black">OUR </span>
            <span className="text-orange-500">PREMIUM FLEET</span>
          </h1>
          <p className="text-center text-lg text-gray-500 mb-10">
            Explore a hand-picked selection of high-quality vehicles for your journey.
          </p>

          {/* Fleet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <a
                key={vehicle.id}
                href={vehicle.show_url}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-200 group"
              >
                {/* Vehicle Image with Error Fallback */}
                <img
                  src={vehicle.image_url}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/default-vehicle.jpg';
                  }}
                  className="w-full h-48 object-cover"
                />

                {/* Vehicle Info */}
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-gray-500 text-sm">Plate: {vehicle.license_plate}</p>
                  <p className="text-gray-500 text-sm">Odometer: {vehicle.odometer.toLocaleString()} km</p>

                  {/* Extra Info */}
                  <div className="flex gap-3 text-sm text-gray-600 mt-2">
                    <span>🚗 {vehicle.seats} seats</span>
                    <span>⚙️ {vehicle.transmission}</span>
                    <span>⛽ {vehicle.fuel_type}</span>
                  </div>

                  {/* Price + Status */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-orange-500">
                      ₱{vehicle.rental_rate_per_day.toLocaleString()}
                      <span className="text-sm text-gray-500"> / day</span>
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vehicle.status === 'available'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
