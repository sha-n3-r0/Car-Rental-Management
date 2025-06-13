import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

import ProfilePictureDisplay from './components/ProfilePictureDisplay'; // You can reuse this from CustomerProfile or create it
import BasicInformationForm from './components/BasicInformationForm'; // Optional: create a smaller component for basic info inputs
import PasswordUpdateForm from './components/PasswordUpdateForm'; // Same here

export default function OwnerProfile() {
  const { owner, profile_picture_url, has_password } = usePage().props;

  // Group basic info into one state object like customer profile
  const [basicInfo, setBasicInfo] = useState({
    name: owner.name || '',
    email: owner.email || '',
    phone_number: owner.phone_number || '',
    date_of_birth: owner.date_of_birth || '',
    address: owner.address || '',
  });

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(null);

  // Password fields grouped as an object
  const [passwordInfo, setPasswordInfo] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append basic info fields
    Object.entries(basicInfo).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    if (passwordInfo.new) {
      if (has_password) {
        formData.append('current_password', passwordInfo.current);
      }
      formData.append('new_password', passwordInfo.new);
      formData.append('new_password_confirmation', passwordInfo.confirm);
    }

    Inertia.post('/owner/profile/update', formData, {
      forceFormData: true,
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Reuse profile picture display component */}
        <ProfilePictureDisplay url={profile_picture_url} setPicture={setProfilePicture} />

        {/* Basic info form can be broken out or inline */}
        <BasicInformationForm data={basicInfo} setData={setBasicInfo} />

        {/* Password update form */}
        <PasswordUpdateForm data={passwordInfo} setData={setPasswordInfo} hasPassword={has_password} />

        <button type="submit" style={{ marginTop: '1.5rem', padding: '0.5rem 1rem' }}>
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
