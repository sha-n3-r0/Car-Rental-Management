// /resources/js/components/BasicInformationForm.jsx
import React from 'react';

export default function BasicInformationForm({ data, setData }) {
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <label>Name:</label><br />
        <input
          type="text"
          value={data.name}
          onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Email:</label><br />
        <input
          type="email"
          value={data.email}
          onChange={e => setData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Phone Number:</label><br />
        <input
          type="text"
          value={data.phone_number}
          onChange={e => setData(prev => ({ ...prev, phone_number: e.target.value }))}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Date of Birth:</label><br />
        <input
          type="date"
          value={data.date_of_birth}
          onChange={e => setData(prev => ({ ...prev, date_of_birth: e.target.value }))}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Address:</label><br />
        <textarea
          value={data.address}
          onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
          rows="3"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
}
