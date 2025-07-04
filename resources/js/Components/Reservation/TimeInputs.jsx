import React from 'react';

export default function TimeInputs({ pickupTime, setPickupTime, dropoffTime, setDropoffTime }) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="pickupTime" className="block text-lg font-medium mb-2">Pick-up Time</label>
          <input
            id="pickupTime"
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="HH:mm"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="dropoffTime" className="block text-lg font-medium mb-2">Drop-off Time</label>
          <input
            id="dropoffTime"
            type="time"
            value={dropoffTime}
            onChange={(e) => setDropoffTime(e.target.value)}
            className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="HH:mm"
          />
        </div>
      </div>

      {/* Helper text */}
      <div className="text-sm text-gray-500 mt-2">
        Please enter the time in <strong>HH:mm</strong> format.
      </div>
    </div>
  );
}
