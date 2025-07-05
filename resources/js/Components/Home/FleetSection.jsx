import React from 'react';
import { Link } from '@inertiajs/react';

export default function FleetSection({ vehicles }) {
  // Limit to first 6 vehicles
  const vehiclesToShow = Array.isArray(vehicles) ? vehicles.slice(0, 6) : [];

  return (
    <section className="bg-white py-16 px-4 md:px-20">
      <h2 className="text-center text-3xl font-bold mb-4">
        OUR <span className="text-[#F86808]">FLEET</span>
      </h2>
      <p className="text-center text-gray-600 mb-10">
        A wide selection of reliable, well-maintained vehicles for every journey.
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {vehiclesToShow.length > 0 ? (
          vehiclesToShow.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => {
                // Navigate to vehicle detail page using Inertia Link
                // This will keep SPA navigation smooth
                window.location.href = `/vehicles/${vehicle.id}`;
              }}
              className="cursor-pointer bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow relative"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.location.href = `/vehicles/${vehicle.id}`;
                }
              }}
            >
              <img
                src={vehicle.image_url || '/images/default-vehicle.jpg'}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="font-bold text-lg">{vehicle.make} {vehicle.model}</h3>
              <p className="text-sm text-gray-600">License Plate: {vehicle.license_plate}</p>
              <div className="flex justify-center gap-4 mt-3 text-sm text-gray-700">
                <span>👥 {vehicle.seats} Seats</span>
                <span>🚗 {vehicle.doors} Doors</span>
              </div>
              <div className="flex justify-center gap-4 text-sm text-gray-700 mt-2">
                <span>🏷️ ${vehicle.price_per_day} / Day</span>
              </div>

              {/* Book Now button */}
              <Link
                href={`/reserve?vehicle_id=${vehicle.id}`}
                onClick={e => e.stopPropagation()} // Prevent card click event
                className="mt-4 inline-block px-6 py-3 bg-[#F86808] text-white rounded-md hover:bg-[#d95b06]"
              >
                Book Now
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">No vehicles available.</div>
        )}
      </div>
    </section>
  );
}
