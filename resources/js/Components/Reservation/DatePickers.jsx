import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickers({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-lg font-medium mb-2">Start Date</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholderText="yyyy/MM/dd"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="endDate" className="block text-lg font-medium mb-2">End Date</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            className="p-3 border rounded-lg w-full bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholderText="yyyy/MM/dd"
          />
        </div>
      </div>

      {/* Helper text */}
      <div className="text-sm text-gray-500 mt-2">
        Please select the reservation dates in the format <strong>yyyy/MM/dd</strong>.
      </div>
    </div>
  );
}
