import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

export default function OwnerProfile() {
  const { owner, profile_picture_url } = usePage().props;

  const [name, setName] = useState(owner.name || '');
  const [email, setEmail] = useState(owner.email || '');
  const [phoneNumber, setPhoneNumber] = useState(owner.phone_number || '');
  const [dateOfBirth, setDateOfBirth] = useState(owner.date_of_birth || '');
  const [address, setAddress] = useState(owner.address || '');
  const [profilePicture, setProfilePicture] = useState(null);

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

    Inertia.post('/owner/profile/update', formData, {
      forceFormData: true,
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Edit Owner Profile</h1>

      {profile_picture_url && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Current Profile Picture:</label>
          <br />
          <img
            src={profile_picture_url}
            alt="Profile"
            style={{ maxWidth: '150px', borderRadius: '8px', marginTop: '0.5rem' }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Phone Number:</label>
          <br />
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Date of Birth:</label>
          <br />
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Address:</label>
          <br />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Profile Picture:</label>
          <br />
          <input type="file" name="profile_picture" onChange={handleFileChange} accept="image/*" />
        </div>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Update Profile
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/owner/dashboard">
          <button type="button" style={{ padding: '0.5rem 1rem' }}>
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
