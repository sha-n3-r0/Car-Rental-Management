import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Fleet({ vehicles, auth }) {
  return (
    <>
      <Head title="Fleet" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-black flex flex-col">
        {/* Pass auth to Header */}
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
                {/* Vehicle image */}
                <img
                  src={vehicle.image_url || '/images/default-vehicle.jpg'}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-48 object-cover"
                />

                {/* Vehicle info */}
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-gray-500 text-sm">Plate: {vehicle.license_plate}</p>
                  <p className="text-gray-500 text-sm">Odometer: {vehicle.odometer} km</p>
                  <p className="text-gray-700 font-medium mt-1">
                    ${vehicle.rental_rate_per_day}
                    <span className="text-sm text-gray-400"> / day</span>
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      vehicle.status === 'available'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {vehicle.status}
                  </span>
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
