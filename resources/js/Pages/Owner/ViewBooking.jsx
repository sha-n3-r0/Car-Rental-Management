import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import OwnerLayout from '@/Layouts/OwnerLayout';

export default function ViewBooking() {
  const { reservation } = usePage().props;

  // Form to update booking status (optional)
  const { data, setData, put, processing, errors } = useForm({
    status: reservation.status || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('owner.reservations.update', reservation.id));
  };

  // Helper to safely format currency values
  const formatCurrency = (val) => {
    const num = Number(val);
    return isNaN(num) ? '0.00' : num.toFixed(2);
  };

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold mb-6">View & Edit Booking Details</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Booking Details */}
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Booking ID</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.id}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="input w-full"
                value={reservation.start_date}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                className="input w-full"
                value={reservation.end_date}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Pickup Time</label>
              <input
                type="time"
                className="input w-full"
                value={reservation.pickup_time || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Dropoff Time</label>
              <input
                type="time"
                className="input w-full"
                value={reservation.dropoff_time || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Pickup Location</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.pickup_location || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Dropoff Location</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.dropoff_location || ''}
                disabled
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Status</label>
                <select
                  className="input w-full"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
              {errors.status && (
                <div className="text-red-500">{errors.status}</div>
              )}
            </div>
          </div>
        </section>

        {/* Customer Details */}
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Customer Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.user?.name || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="input w-full"
                value={reservation.user?.email || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.user?.phone_number || ''}
                disabled
              />
            </div>
          </div>
        </section>

        {/* Vehicle Details */}
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Make</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.vehicle?.make || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Model</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.vehicle?.model || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Year</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.vehicle?.year || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">License Plate</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.vehicle?.license_plate || ''}
                disabled
              />
            </div>
          </div>
        </section>

        {/* Payment Details */}
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Payment Method</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.payment_method || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Transaction Reference</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.transaction_reference_no || ''}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Promo Code</label>
              <input
                type="text"
                className="input w-full"
                value={reservation.promo_code || '—'}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Discount</label>
              <input
                type="text"
                className="input w-full"
                value={`₱${formatCurrency(reservation.discount)}`}
                disabled
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Total Cost</label>
              <input
                type="text"
                className="input w-full"
                value={`₱${formatCurrency(reservation.total_cost)}`}
                disabled
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {processing ? 'Saving...' : 'Update Booking'}
          </button>
        </div>
      </form>
    </OwnerLayout>
  );
}
