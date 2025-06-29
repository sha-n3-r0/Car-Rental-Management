import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, Link } from '@inertiajs/react';

import ProfilePictureDisplay from './components/ProfilePictureDisplay';

export default function CustomerProfile() {
  const { customer, profile_picture_url, has_password, license } = usePage().props;

  const [profilePicture, setProfilePicture] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [licenseImageBack, setLicenseImageBack] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');

  const [basicInfo, setBasicInfo] = useState({
    name: customer.name || '',
    email: customer.email || '',
    phone_number: customer.phone_number || '',
    date_of_birth: customer.date_of_birth || '',
    basic_address: customer.address || '',
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
    license_address: license?.address || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(basicInfo).forEach(([key, value]) => formData.append(key, value));
    if (profilePicture) formData.append('profile_picture', profilePicture);

    if (passwordInfo.new) {
      if (has_password) formData.append('current_password', passwordInfo.current);
      formData.append('new_password', passwordInfo.new);
      formData.append('new_password_confirmation', passwordInfo.confirm);
    }

    Object.entries(licenseInfo).forEach(([key, value]) => formData.append(key, value));
    if (licenseImage) formData.append('license_image', licenseImage);
    if (licenseImageBack) formData.append('license_image_back', licenseImageBack);

    Inertia.post('/customer/profile/update', formData, {
      forceFormData: true,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Edit Your Profile</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-1/3 bg-white shadow rounded p-6 text-center">
          <ProfilePictureDisplay url={profile_picture_url} setPicture={setProfilePicture} />
          <p className="text-lg font-semibold mt-4">{basicInfo.name}</p>
          <p className="text-sm text-gray-600">{basicInfo.email}</p>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          <div className="bg-white shadow rounded">
            {/* Tabs */}
            <div className="flex space-x-4 border-b">
              {['basic', 'password', 'license'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-semibold ${
                    activeTab === tab
                      ? 'bg-orange-500 text-white rounded-t'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'basic' && 'Basic Information'}
                  {tab === 'password' && 'Change Password'}
                  {tab === 'license' && 'Driving License'}
                </button>
              ))}
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-6 min-h-[400px]">
              {activeTab === 'basic' && (
                <section className="border border-gray-300 rounded">
                  <div className="bg-orange-500 text-white px-4 py-2 font-bold rounded-t">
                    Basic Information
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div>
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={basicInfo.name}
                        onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        value={basicInfo.email}
                        onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Phone Number</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={basicInfo.phone_number}
                        onChange={(e) => setBasicInfo({ ...basicInfo, phone_number: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Date of Birth</label>
                      <input
                        type="date"
                        className="w-full border rounded px-3 py-2"
                        value={basicInfo.date_of_birth}
                        onChange={(e) => setBasicInfo({ ...basicInfo, date_of_birth: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium">Address</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="2"
                        value={basicInfo.basic_address}
                        onChange={(e) => setBasicInfo({ ...basicInfo, basic_address: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'password' && (
                <section className="border border-gray-300 rounded">
                  <div className="bg-orange-500 text-white px-4 py-2 font-bold rounded-t">
                    Change Password
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    {has_password && (
                      <div>
                        <label className="block text-sm font-medium">Current Password</label>
                        <input
                          type="password"
                          className="w-full border rounded px-3 py-2"
                          value={passwordInfo.current}
                          onChange={(e) =>
                            setPasswordInfo({ ...passwordInfo, current: e.target.value })
                          }
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium">New Password</label>
                      <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        value={passwordInfo.new}
                        onChange={(e) =>
                          setPasswordInfo({ ...passwordInfo, new: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        value={passwordInfo.confirm}
                        onChange={(e) =>
                          setPasswordInfo({ ...passwordInfo, confirm: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'license' && (
                <section className="border border-gray-300 rounded">
                  <div className="bg-orange-500 text-white px-4 py-2 font-bold rounded-t">
                    Driving License Information
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div>
                      <label className="block text-sm font-medium">License Number</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.license_number}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, license_number: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">License Type</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.license_type}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, license_type: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">License Class</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.license_class}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, license_class: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Issued Date</label>
                      <input
                        type="date"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.issued_date}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, issued_date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Expiry Date</label>
                      <input
                        type="date"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.expiry_date}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, expiry_date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Name on License</label>
                      <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.name_on_license}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, name_on_license: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Birth Date</label>
                      <input
                        type="date"
                        className="w-full border rounded px-3 py-2"
                        value={licenseInfo.birth_date}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, birth_date: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium">License Address</label>
                      <textarea
                        className="w-full border rounded px-3 py-2"
                        rows="2"
                        value={licenseInfo.license_address}
                        onChange={(e) =>
                          setLicenseInfo({ ...licenseInfo, license_address: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Upload License Front</label>
                      <input
                        type="file"
                        className="w-full border rounded px-3 py-2"
                        onChange={(e) => setLicenseImage(e.target.files[0])}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Upload License Back</label>
                      <input
                        type="file"
                        className="w-full border rounded px-3 py-2"
                        onChange={(e) => setLicenseImageBack(e.target.files[0])}
                      />
                    </div>
                  </div>
                </section>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link href="/customer/dashboard" className="text-orange-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
