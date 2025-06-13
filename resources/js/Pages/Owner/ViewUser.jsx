// resources/js/Pages/Owner/ViewUser.jsx

import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import OwnerLayout from '@/Layouts/OwnerLayout';

export default function ViewUser() {
  const { user } = usePage().props;

  // Form for user details
  const { data, setData, put, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    phone_number: user.phone_number || '',
    address: user.address || '',
    date_of_birth: user.date_of_birth || '',
    role: user.role || '',
    // License status comes from user.license.status or fallback
    license_status: user.license?.status || '',
  });

  // Update handler
  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('owner.users.update', user.id));
  };

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold mb-6">View & Edit User Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* User Details Section */}
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">User Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                className="input w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
              {errors.name && <div className="text-red-500">{errors.name}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="input w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="text"
                className="input w-full"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
              />
              {errors.phone_number && <div className="text-red-500">{errors.phone_number}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                className="input w-full"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
              />
              {errors.address && <div className="text-red-500">{errors.address}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                className="input w-full"
                value={data.date_of_birth}
                onChange={(e) => setData('date_of_birth', e.target.value)}
              />
              {errors.date_of_birth && <div className="text-red-500">{errors.date_of_birth}</div>}
            </div>

            <div>
              <label className="block font-medium mb-1">Role</label>
              <select
                className="input w-full"
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </section>

        {/* License Details Section */}
        <section className="border rounded p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">License Details</h2>

          {!user.license ? (
            <p className="italic text-gray-600">No license information available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">License Number</label>
                <input
                  type="text"
                  className="input w-full"
                  value={user.license.license_number || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">License Type</label>
                <input
                  type="text"
                  className="input w-full"
                  value={user.license.license_type || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">License Class</label>
                <input
                  type="text"
                  className="input w-full"
                  value={user.license.license_class || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Issued Date</label>
                <input
                  type="date"
                  className="input w-full"
                  value={user.license.issued_date?.slice(0, 10) || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Expiry Date</label>
                <input
                  type="date"
                  className="input w-full"
                  value={user.license.expiry_date?.slice(0, 10) || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Name on License</label>
                <input
                  type="text"
                  className="input w-full"
                  value={user.license.name_on_license || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Birth Date</label>
                <input
                  type="date"
                  className="input w-full"
                  value={user.license.birth_date?.slice(0, 10) || ''}
                  disabled
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Address on License</label>
                <textarea
                  className="input w-full"
                  value={user.license.address || ''}
                  disabled
                />
              </div>

                <div>
                <label className="block font-medium mb-1">License Image</label>
                {user.license.license_image ? (
                    <img
                    src={`/storage/${user.license.license_image}`}
                    alt="License Front"
                    className="max-w-xs border rounded"
                    />
                ) : (
                    <p>No image uploaded</p>
                )}
                </div>

                {/* License Image Back */}
                <div>
                <label className="block font-medium mb-1">License Image Back</label>
                {user.license.license_image_back ? (
                    <img
                    src={`/storage/${user.license.license_image_back}`}
                    alt="License Back"
                    className="max-w-xs border rounded"
                    />
                ) : (
                    <p>No back image uploaded</p>
                )}
                </div>

              {/* License Status - editable */}
              <div className="md:col-span-2">
                <label className="block font-medium mb-1">License Status</label>
                <select
                  className="input w-full"
                  value={data.license_status}
                  onChange={(e) => setData('license_status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">⏳ Pending</option>
                  <option value="approved">✅ Approved</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
                {errors.license_status && (
                  <div className="text-red-500">{errors.license_status}</div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={processing}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {processing ? 'Saving...' : 'Update User & License'}
          </button>
        </div>
      </form>
    </OwnerLayout>
  );
}
