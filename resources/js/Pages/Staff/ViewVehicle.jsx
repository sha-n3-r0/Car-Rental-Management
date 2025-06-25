import React from 'react';
import { usePage } from '@inertiajs/react';
import OwnerLayout from '@/Layouts/OwnerLayout';

export default function ViewVehicle() {
  const { vehicle } = usePage().props;

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold mb-6">View Vehicle</h1>

      <div className="space-y-8 max-w-3xl">
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="License Plate" value={vehicle.license_plate} />
            <Info label="VIN" value={vehicle.vin} />
            <Info label="Make" value={vehicle.make} />
            <Info label="Model" value={vehicle.model} />
            <Info label="Year" value={vehicle.year} />
            <Info label="Color" value={vehicle.color} />
            <Info label="Seats" value={vehicle.seats} />
            <Info label="Vehicle Type" value={vehicle.vehicle_type} />
            <Info label="Transmission" value={vehicle.transmission} />
            <Info label="Fuel Type" value={vehicle.fuel_type} />
            <Info label="Odometer" value={vehicle.odometer} />
            <Info label="Rental Rate (per day)" value={vehicle.rental_rate_per_day} />
            <Info label="Late Fee (per day)" value={vehicle.late_fee_per_day} />
            <Info
              label="Last Service Date"
              value={vehicle.last_service_date?.slice(0, 10) || 'N/A'}
            />
            <Info
              label="Insurance Expiry Date"
              value={vehicle.insurance_expiry_date?.slice(0, 10) || 'N/A'}
            />
            {vehicle.image_url && (
              <div className="md:col-span-2 mt-4">
                <img
                  src={vehicle.image_url}
                  alt="Vehicle"
                  className="max-w-xs rounded shadow"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </OwnerLayout>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <label className="block font-medium mb-1 text-gray-600">{label}</label>
      <div className="border p-2 rounded bg-gray-100">{value || '—'}</div>
    </div>
  );
}
