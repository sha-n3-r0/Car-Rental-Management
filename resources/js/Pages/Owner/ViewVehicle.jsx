import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import OwnerLayout from '@/Layouts/OwnerLayout';
import { route } from 'ziggy-js';

export default function ViewVehicle() {
  const { vehicle } = usePage().props;

  const { data, setData, post, put, processing, errors } = useForm({
    license_plate: vehicle.license_plate || '',
    vin: vehicle.vin || '',
    make: vehicle.make || '',
    model: vehicle.model || '',
    year: vehicle.year || '',
    color: vehicle.color || '',
    seats: vehicle.seats || '',
    vehicle_type: vehicle.vehicle_type || '',
    transmission: vehicle.transmission || '',
    fuel_type: vehicle.fuel_type || '',
    odometer: vehicle.odometer || '',
    rental_rate_per_day: vehicle.rental_rate_per_day || '',
    late_fee_per_day: vehicle.late_fee_per_day || '',
    last_service_date: vehicle.last_service_date ? vehicle.last_service_date.slice(0, 10) : '',
    insurance_expiry_date: vehicle.insurance_expiry_date ? vehicle.insurance_expiry_date.slice(0, 10) : '',
    image: null, // ← changed from image_url to file input
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('owner.vehicles.update', vehicle.id)); // Make sure you have this route
  };

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold mb-6">View & Edit Vehicle</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">License Plate</label>
              <input
                type="text"
                className="input w-full"
                value={data.license_plate}
                onChange={e => setData('license_plate', e.target.value)}
              />
              {errors.license_plate && <div className="text-red-500">{errors.license_plate}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">VIN (optional)</label>
              <input
                type="text"
                className="input w-full"
                value={data.vin}
                onChange={e => setData('vin', e.target.value)}
              />
              {errors.vin && <div className="text-red-500">{errors.vin}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Make</label>
              <input
                type="text"
                className="input w-full"
                value={data.make}
                onChange={e => setData('make', e.target.value)}
              />
              {errors.make && <div className="text-red-500">{errors.make}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Model</label>
              <input
                type="text"
                className="input w-full"
                value={data.model}
                onChange={e => setData('model', e.target.value)}
              />
              {errors.model && <div className="text-red-500">{errors.model}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Year</label>
              <input
                type="number"
                className="input w-full"
                value={data.year}
                onChange={e => setData('year', e.target.value)}
              />
              {errors.year && <div className="text-red-500">{errors.year}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Color</label>
              <input
                type="text"
                className="input w-full"
                value={data.color}
                onChange={e => setData('color', e.target.value)}
              />
              {errors.color && <div className="text-red-500">{errors.color}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Seats</label>
              <input
                type="number"
                className="input w-full"
                value={data.seats}
                onChange={e => setData('seats', e.target.value)}
              />
              {errors.seats && <div className="text-red-500">{errors.seats}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Vehicle Type</label>
              <input
                type="text"
                className="input w-full"
                value={data.vehicle_type}
                onChange={e => setData('vehicle_type', e.target.value)}
              />
              {errors.vehicle_type && <div className="text-red-500">{errors.vehicle_type}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Transmission</label>
              <input
                type="text"
                className="input w-full"
                value={data.transmission}
                onChange={e => setData('transmission', e.target.value)}
              />
              {errors.transmission && <div className="text-red-500">{errors.transmission}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Fuel Type</label>
              <input
                type="text"
                className="input w-full"
                value={data.fuel_type}
                onChange={e => setData('fuel_type', e.target.value)}
              />
              {errors.fuel_type && <div className="text-red-500">{errors.fuel_type}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Odometer</label>
              <input
                type="number"
                className="input w-full"
                value={data.odometer}
                onChange={e => setData('odometer', e.target.value)}
              />
              {errors.odometer && <div className="text-red-500">{errors.odometer}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Rental Rate (per day)</label>
              <input
                type="number"
                className="input w-full"
                value={data.rental_rate_per_day}
                onChange={e => setData('rental_rate_per_day', e.target.value)}
              />
              {errors.rental_rate_per_day && <div className="text-red-500">{errors.rental_rate_per_day}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Late Fee (per day)</label>
              <input
                type="number"
                className="input w-full"
                value={data.late_fee_per_day}
                onChange={e => setData('late_fee_per_day', e.target.value)}
              />
              {errors.late_fee_per_day && <div className="text-red-500">{errors.late_fee_per_day}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Last Service Date</label>
              <input
                type="date"
                className="input w-full"
                value={data.last_service_date}
                onChange={e => setData('last_service_date', e.target.value)}
              />
              {errors.last_service_date && <div className="text-red-500">{errors.last_service_date}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Insurance Expiry Date</label>
              <input
                type="date"
                className="input w-full"
                value={data.insurance_expiry_date}
                onChange={e => setData('insurance_expiry_date', e.target.value)}
              />
              {errors.insurance_expiry_date && <div className="text-red-500">{errors.insurance_expiry_date}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Image Upload</label>
              <input
                type="file"
                accept="image/*"
                className="input w-full"
                onChange={e => setData('image', e.target.files[0])}
              />
              {errors.image && <div className="text-red-500">{errors.image}</div>}
            </div>

            {data.image ? (
              <div className="md:col-span-2 mt-4">
                <img
                  src={URL.createObjectURL(data.image)}
                  alt="Preview"
                  className="max-w-xs rounded shadow"
                />
              </div>
            ) : vehicle.image_url ? (
              <div className="md:col-span-2 mt-4">
                <img
                  src={vehicle.image_url}
                  alt="Vehicle"
                  className="max-w-xs rounded shadow"
                />
              </div>
            ) : null}
          </div>

        </section>

        <div>
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {processing ? 'Saving...' : 'Update Vehicle'}
          </button>
        </div>
      </form>
    </OwnerLayout>
  );
}
