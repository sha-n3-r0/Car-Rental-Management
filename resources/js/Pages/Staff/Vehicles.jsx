import React from 'react';
import StaffLayout from '@/Layouts/StaffLayout';
import { Link, usePage } from '@inertiajs/react';

export default function Vehicles() {
  const { vehicles } = usePage().props;

  return (
    <StaffLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <Link
          href="/staff/vehicles/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Vehicle
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">License Plate</th>
              <th className="px-4 py-2">Make</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Year</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {vehicle.image_url ? (
                      <img
                        src={vehicle.image_url}
                        alt="Vehicle"
                        className="h-16 w-24 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{vehicle.id}</td>
                  <td className="px-4 py-2">{vehicle.license_plate}</td>
                  <td className="px-4 py-2">{vehicle.make}</td>
                  <td className="px-4 py-2">{vehicle.model}</td>
                  <td className="px-4 py-2">{vehicle.year}</td>
                  <td className="px-4 py-2 capitalize">{vehicle.status}</td>
                  <td className="px-4 py-2">
                    <Link
                      href={`/staff/vehicles/${vehicle.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Vehicle
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 text-center" colSpan="8">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StaffLayout>
  );
}
