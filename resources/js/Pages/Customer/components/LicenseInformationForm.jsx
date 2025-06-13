import React from 'react';

export default function LicenseInformationForm({ data, setData, setLicenseImage, setLicenseImageBack }) {
  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <hr />
      <h3>Driver’s License Information</h3>

      <div style={{ marginBottom: '1rem' }}>
        <label>License Number:</label><br />
        <input type="text" value={data.license_number} onChange={e => update('license_number', e.target.value)} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>License Type:</label><br />
        <select value={data.license_type} onChange={e => update('license_type', e.target.value)} required>
          <option value="">Select...</option>
          <option value="Non-Professional">Non-Professional</option>
          <option value="Professional">Professional</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>License Class:</label><br />
        <input type="text" value={data.license_class} onChange={e => update('license_class', e.target.value)} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Issued Date:</label><br />
        <input type="date" value={data.issued_date} onChange={e => update('issued_date', e.target.value)} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Expiry Date:</label><br />
        <input type="date" value={data.expiry_date} onChange={e => update('expiry_date', e.target.value)} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Name on License:</label><br />
        <input type="text" value={data.name_on_license} onChange={e => update('name_on_license', e.target.value)} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Birth Date (on License):</label><br />
        <input type="date" value={data.birth_date} onChange={e => update('birth_date', e.target.value)} required />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>License Address:</label><br />
          <textarea
            rows="2"
            value={data.license_address}
            onChange={e => update('license_address', e.target.value)}
          />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>License Front Image:</label><br />
        <input type="file" accept="image/*,application/pdf" onChange={e => setLicenseImage(e.target.files[0])} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>License Back Image (Optional):</label><br />
        <input type="file" accept="image/*,application/pdf" onChange={e => setLicenseImageBack(e.target.files[0])} />
      </div>
    </>
  );
}
