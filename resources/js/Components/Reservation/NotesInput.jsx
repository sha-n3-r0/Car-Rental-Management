// C:\xampp\htdocs\project\car-rental-system\resources\js\Components\Reservation\NotesInput.jsx
import React from 'react';

export default function NotesInput({ notes, setNotes }) {
  return (
    <div className="mb-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="p-2 border rounded w-full"
        placeholder="Additional Notes (Optional)"
      />
    </div>
  );
}
