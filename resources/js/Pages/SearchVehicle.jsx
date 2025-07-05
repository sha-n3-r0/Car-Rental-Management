import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function SearchVehicle({ vehicles, start_date, end_date, auth }) {
  return (
    <>
      <Head title="Search Results" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-black flex flex-col">
        <Header auth={auth} />

        <main className="px-8 py-12 max-w-7xl mx-auto flex-grow">
          <h1 className="text-3xl font-extrabold text-center mb-2 text-orange-500">Available Vehicles</h1>
          <p className="text-center text-sm text-gray-500 mb-10">
            From <strong>{start_date}</strong> to <strong>{end_date}</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.length === 0 ? (
              <p className="text-center text-gray-600 col-span-full">No vehicles available.</p>
            ) : (
              vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-200 group"
                >
                  <img
                    src={vehicle.image_url || '/images/default-vehicle.jpg'}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    onError={(e) => (e.target.src = '/images/default-vehicle.jpg')}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 space-y-2">
                    <h3 className="text-2xl font-semibold text-blue-800 group-hover:text-blue-600 transition">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-gray-500 text-sm">Plate: {vehicle.license_plate}</p>
                    <p className="text-gray-500 text-sm">₱{vehicle.rental_rate_per_day.toLocaleString()} / day</p>
                    
                    {/* Book Now Button */}
                    <a
                      href={`/reserve?vehicle_id=${vehicle.id}&start_date=${start_date}&end_date=${end_date}`}
                      className="mt-4 inline-block px-6 py-3 bg-[#F86808] text-white rounded-md hover:bg-[#d95b06] text-center"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
