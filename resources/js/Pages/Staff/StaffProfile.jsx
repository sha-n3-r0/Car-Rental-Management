import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

export default function StaffProfile() {
  const { staff, profile_picture_url, has_password } = usePage().props;

  const [name, setName] = useState(staff.name || '');
  const [email, setEmail] = useState(staff.email || '');
  const [phoneNumber, setPhoneNumber] = useState(staff.phone_number || '');
  const [dateOfBirth, setDateOfBirth] = useState(staff.date_of_birth || '');
  const [address, setAddress] = useState(staff.address || '');
  const [profilePicture, setProfilePicture] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('address', address);

    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    if (newPassword) {
      if (has_password) {
        formData.append('current_password', currentPassword);
      }
      formData.append('new_password', newPassword);
      formData.append('new_password_confirmation', confirmPassword);
    }

    Inertia.post('/staff/profile/update', formData, {
      forceFormData: true,
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Edit Staff Profile</h1>

      {profile_picture_url && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Current Profile Picture:</label><br />
          <img
            src={profile_picture_url}
            alt="Profile"
            style={{ maxWidth: '150px', borderRadius: '8px', marginTop: '0.5rem' }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Phone Number:</label><br />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Date of Birth:</label><br />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Address:</label><br />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Profile Picture:</label><br />
          <input
            type="file"
            name="profile_picture"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <hr style={{ margin: '2rem 0' }} />
        <h3>Change Password (optional)</h3>

        {has_password && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Current Password:</label><br />
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label>New Password:</label><br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Confirm New Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Update Profile</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/staff/dashboard">
          <button type="button" style={{ padding: '0.5rem 1rem' }}>← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
