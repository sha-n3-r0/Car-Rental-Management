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

  // Function to handle the deletion of a user
  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // Call the Inertia DELETE request to delete the user
      // Replace `/owner/users/${userId}` with the appropriate route for deleting users
      // You would likely need to create a DELETE route in your Laravel routes
      axios
        .delete(`/owner/users/${userId}`)
        .then((response) => {
          // Handle the success response (e.g., remove the user from the UI)
          window.location.reload(); // This is one way to update the list after deletion
        })
        .catch((error) => {
          // Handle any errors that may occur
          console.error('There was an error deleting the user:', error);
        });
    }
  };

  return (
    <OwnerLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        {/* Add New User Button */}
        <Link
          href="/owner/users/create" // Update this URL based on your actual "Add User" route
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New User
        </Link>
      </div>

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
                <td className="px-4 py-2 flex space-x-2">
                  {/* View Profile */}
                  <Link
                    href={`/owner/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </Link>
                  {/* Delete User */}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OwnerLayout>
  );
}
