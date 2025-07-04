// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\VehicleDetails.jsx
import React from 'react';

export default function VehicleDetails({ vehicle, estimatedCost, loyaltyPoints }) {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-100 mb-6">
      <div className="relative w-full h-64 sm:h-80 overflow-hidden">
        <img
          src={vehicle.image_url || '/images/default-vehicle.jpg'}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="w-full h-full object-cover transform transition-transform hover:scale-105"
        />
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${
            vehicle.status === 'available' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {vehicle.status}
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
          <Detail label="License Plate" value={vehicle.license_plate} />
          <Detail label="Odometer" value={`${vehicle.odometer} km`} />
          <Detail label="Rate" value={`₱${vehicle.rental_rate_per_day}/day`} />
        </div>

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
          <p><strong>Rate:</strong> ₱{vehicle.rental_rate_per_day}/day</p>
          <p><strong>Estimated Total:</strong> ₱{estimatedCost}</p>
          <p><strong>Loyalty Points:</strong> {loyaltyPoints}</p>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="p-4 bg-gray-100 rounded">
      <p><strong>{label}:</strong> {value}</p>
    </div>
  );
}
