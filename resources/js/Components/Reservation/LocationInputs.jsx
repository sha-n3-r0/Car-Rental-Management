import React from 'react';

export default function LocationInputs({ pickupLocation, setPickupLocation, dropoffLocation, setDropoffLocation }) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="pickupLocation" className="block text-lg font-medium mb-2">Pick-up Location</label>
          <input
            id="pickupLocation"
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Pick-up Location"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="dropoffLocation" className="block text-lg font-medium mb-2">Drop-off Location</label>
          <input
            id="dropoffLocation"
            type="text"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
            className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Drop-off Location"
          />
        </div>
      </div>

      {/* Helper text */}
      <div className="text-sm text-gray-500 mt-2">
        Please provide the pick-up and drop-off locations for your reservation.
      </div>
    </div>
  );
}
