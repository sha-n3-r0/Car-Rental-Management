// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\PromoCodeInput.jsx
import React from 'react';

export default function PromoCodeInput({ promoCode, setPromoCode }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Promo Code (Optional)"
      />
    </div>
  );
}
