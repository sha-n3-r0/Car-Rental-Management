import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function VehicleDetail({ vehicle }) {
  return (
    <>
      <Head title={`${vehicle.make} ${vehicle.model}`} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
        <Header />

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-900 drop-shadow-sm">
            {vehicle.make} {vehicle.model}
          </h1>

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-blue-100">
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
                <Detail label="Rate" value={`$${vehicle.rental_rate_per_day}/day`} />
              </div>

              <BookingForm vehicle={vehicle} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-blue-800 font-medium">{label}:</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}

function BookingForm({ vehicle }) {
  const { auth } = usePage().props;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [available, setAvailable] = useState(null);
  const [message, setMessage] = useState('');

  const checkAvailability = async () => {
    setAvailable(null);
    setMessage('');
    try {
      const { data } = await axios.get(`/vehicles/${vehicle.id}/availability`, {
        params: {
          start_date: startDate?.toISOString().split('T')[0],
          end_date: endDate?.toISOString().split('T')[0],
        },
      });
      setAvailable(data.available);
    } catch (error) {
      setMessage('Failed to check availability.');
    }
  };

  const goToReserveForm = () => {
    const params = new URLSearchParams({
      vehicle_id: vehicle.id,
      start_date: startDate?.toISOString().split('T')[0],
      end_date: endDate?.toISOString().split('T')[0],
    }).toString();

    router.visit(`/reserve?${params}`);
  };

  return (
    <div className="mt-8 p-4 border rounded bg-gray-50 shadow">
      <h2 className="text-lg font-bold mb-2">Reserve This Vehicle</h2>

      <div className="flex gap-4 flex-wrap mb-4">
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Start Date"
          className="border px-3 py-2 rounded"
          minDate={new Date()}
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          placeholderText="End Date"
          className="border px-3 py-2 rounded"
          minDate={startDate || new Date()}
        />
      </div>

      <button
        onClick={checkAvailability}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Availability
      </button>

      {available !== null && (
        <div className="mt-4">
          {available ? (
            <>
              <p className="text-green-600">✅ Vehicle is available!</p>
              <button
                onClick={goToReserveForm}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Reserve Now
              </button>
            </>
          ) : (
            <p className="text-red-600">❌ Not available for selected dates.</p>
          )}
        </div>
      )}

      {message && <p className="mt-4 text-blue-700">{message}</p>}
    </div>
  );
}
