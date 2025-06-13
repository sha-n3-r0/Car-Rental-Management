import React from 'react';

export default function BasicInformationForm({ data, setData }) {
  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <h3>Basic Information</h3>
      {['name', 'email', 'phone_number', 'date_of_birth'].map(field => (
        <div key={field} style={{ marginBottom: '1rem' }}>
          <label>{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</label><br />
          <input
            type={field === 'email' ? 'email' : field === 'date_of_birth' ? 'date' : 'text'}
            value={data[field]}
            onChange={e => update(field, e.target.value)}
            required={field !== 'phone_number'}
          />
        </div>
      ))}
      <div style={{ marginBottom: '1rem' }}>
        <label>Address:</label><br />
          <textarea
            rows="3"
            value={data.basic_address}
            onChange={e => update('basic_address', e.target.value)}
          />
      </div>
    </>
  );
}
