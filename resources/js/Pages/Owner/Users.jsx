import React from 'react';
import OwnerLayout from '@/Layouts/OwnerLayout';
import { Link, usePage } from '@inertiajs/react';

export default function Users() {
  const { users } = usePage().props;

  const getLicenseStatus = (user) => {
    if (!user.license) return '—';
    switch (user.license.status) {
      case 'approved':
        return '✅ Approved';
      case 'pending':
        return '⏳ Pending';
      case 'rejected':
        return '❌ Rejected';
      default:
        return '—';
    }
  };

  return (
    <OwnerLayout>
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">License Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">{getLicenseStatus(user)}</td>
                <td className="px-4 py-2">
                  <Link
                    href={`/owner/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OwnerLayout>
  );
}
