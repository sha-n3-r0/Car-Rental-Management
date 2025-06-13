import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

import ProfilePictureDisplay from './components/ProfilePictureDisplay';
import BasicInformationForm from './components/BasicInformationForm';
import PasswordUpdateForm from './components/PasswordUpdateForm';

export default function StaffProfile() {
  const { staff, profile_picture_url, has_password } = usePage().props;

  const [profilePicture, setProfilePicture] = useState(null);

  const [basicInfo, setBasicInfo] = useState({
    name: staff.name || '',
    email: staff.email || '',
    phone_number: staff.phone_number || '',
    date_of_birth: staff.date_of_birth || '',
    address: staff.address || '',
  });

  const [passwordInfo, setPasswordInfo] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(basicInfo).forEach(([key, value]) => formData.append(key, value));

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

    Inertia.post('/staff/profile/update', formData, {
      forceFormData: true,
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Edit Staff Profile</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ProfilePictureDisplay url={profile_picture_url} setPicture={setProfilePicture} />

        <BasicInformationForm data={basicInfo} setData={setBasicInfo} />

        <hr style={{ margin: '2rem 0' }} />
        <h3>Change Password (optional)</h3>

        <PasswordUpdateForm data={passwordInfo} setData={setPasswordInfo} hasPassword={has_password} />

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Update Profile
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/staff/dashboard">
          <button type="button" style={{ padding: '0.5rem 1rem' }}>
            ← Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}
