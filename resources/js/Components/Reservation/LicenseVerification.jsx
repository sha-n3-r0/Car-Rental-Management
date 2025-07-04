// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\LicenseVerification.jsx
import React from 'react';

export default function LicenseVerification({ licenseStatus }) {
  return (
    <div className="mb-4">
      {licenseStatus.toLowerCase() === 'approved' ? (
        <span className="text-green-600">✅ License Approved</span>
      ) : (
        <a href="/profile/license" className="text-red-600 underline">Verify your license</a>
      )}
    </div>
  );
}
