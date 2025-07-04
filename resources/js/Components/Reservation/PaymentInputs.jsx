// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\PaymentInputs.jsx
import React from 'react';

export default function PaymentInputs({ paymentMethod, setPaymentMethod, transactionRef, setTransactionRef, paymentProof, setPaymentProof }) {
  return (
    <div className="mb-4">
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="p-2 border rounded w-full"
      >
        <option value="">Select Payment Method</option>
        <option value="credit_card">Credit Card</option>
        <option value="bank_transfer">Bank Transfer</option>
        <option value="gcash">GCash</option>
      </select>
      <input
        type="text"
        value={transactionRef}
        onChange={(e) => setTransactionRef(e.target.value)}
        className="p-2 border rounded w-full mt-2"
        placeholder="Transaction Reference Number"
      />
      <input
        type="file"
        onChange={(e) => setPaymentProof(e.target.files[0])}
        className="p-2 border rounded w-full mt-2"
      />
    </div>
  );
}
