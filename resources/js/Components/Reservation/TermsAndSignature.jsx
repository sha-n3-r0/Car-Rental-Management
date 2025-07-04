// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\TermsAndSignature.jsx
import React from 'react';

export default function TermsAndSignature({ agreed, setAgreed, signatureName, setSignatureName }) {
  return (
    <>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mr-2"
        />
        <span>I agree to the terms and conditions</span>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={signatureName}
          onChange={(e) => setSignatureName(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Signature (Full Name)"
        />
      </div>
    </>
  );
}
