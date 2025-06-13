import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

import ProfilePictureDisplay from './components/ProfilePictureDisplay';
import BasicInformationForm from './components/BasicInformationForm';
import PasswordUpdateForm from './components/PasswordUpdateForm';
import LicenseInformationForm from './components/LicenseInformationForm';

export default function CustomerProfile() {
  const { customer, profile_picture_url, has_password, license } = usePage().props;

  const [profilePicture, setProfilePicture] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [licenseImageBack, setLicenseImageBack] = useState(null);

  const [basicInfo, setBasicInfo] = useState({
    name: customer.name || '',
    email: customer.email || '',
    phone_number: customer.phone_number || '',
    date_of_birth: customer.date_of_birth || '',
    basic_address: customer.address || '', // ✅ Renamed to basic_address
  });

  const [passwordInfo, setPasswordInfo] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [licenseInfo, setLicenseInfo] = useState({
    license_number: license?.license_number || '',
    license_type: license?.license_type || '',
    license_class: license?.license_class || '',
    issued_date: license?.issued_date || '',
    expiry_date: license?.expiry_date || '',
    name_on_license: license?.name_on_license || '',
    birth_date: license?.birth_date || '',
    license_address: license?.address || '', // ✅ Renamed to license_address
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Basic Info
    Object.entries(basicInfo).forEach(([key, value]) => formData.append(key, value));
    if (profilePicture) formData.append('profile_picture', profilePicture);

    // Password
    if (passwordInfo.new) {
      if (has_password) formData.append('current_password', passwordInfo.current);
      formData.append('new_password', passwordInfo.new);
      formData.append('new_password_confirmation', passwordInfo.confirm);
    }

    // License
    Object.entries(licenseInfo).forEach(([key, value]) => formData.append(key, value));
    if (licenseImage) formData.append('license_image', licenseImage);
    if (licenseImageBack) formData.append('license_image_back', licenseImageBack);

    Inertia.post('/customer/profile/update', formData, {
      forceFormData: true,
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ProfilePictureDisplay url={profile_picture_url} setPicture={setProfilePicture} />

        <BasicInformationForm data={basicInfo} setData={setBasicInfo} />

        <PasswordUpdateForm data={passwordInfo} setData={setPasswordInfo} hasPassword={has_password} />

        <LicenseInformationForm
          data={licenseInfo}
          setData={setLicenseInfo}
          setLicenseImage={setLicenseImage}
          setLicenseImageBack={setLicenseImageBack}
        />

        <button type="submit" style={{ marginTop: '1.5rem', padding: '0.5rem 1rem' }}>
          Update Profile
        </button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/customer/dashboard">
          <button type="button">← Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}
