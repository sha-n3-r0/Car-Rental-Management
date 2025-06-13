// /resources/js/components/ProfilePictureDisplay.jsx
import React from 'react';

export default function ProfilePictureDisplay({ url, setPicture }) {
  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {url && (
        <>
          <label>Current Profile Picture:</label><br />
          <img
            src={url}
            alt="Profile"
            style={{ maxWidth: '150px', borderRadius: '8px', marginTop: '0.5rem' }}
          />
        </>
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
