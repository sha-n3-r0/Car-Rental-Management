// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\ReserveButton.jsx
import React from 'react';

export default function ReserveButton({ handleSubmit }) {
  return (
    <div className="text-center">
      <button onClick={handleSubmit} className="px-6 py-3 bg-blue-600 text-white rounded-full shadow">
        Reserve Vehicle
      </button>
    </div>
  );
}
