import React from 'react';

export default function PasswordUpdateForm({ data, setData, hasPassword }) {
  return (
    <>
      {hasPassword && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Current Password:</label><br />
          <input
            type="password"
            value={data.current}
            onChange={e => setData(prev => ({ ...prev, current: e.target.value }))}
            placeholder="Enter current password"
          />
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <label>New Password:</label><br />
        <input
          type="password"
          value={data.new}
          onChange={e => setData(prev => ({ ...prev, new: e.target.value }))}
          placeholder="Enter new password"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Confirm New Password:</label><br />
        <input
          type="password"
          value={data.confirm}
          onChange={e => setData(prev => ({ ...prev, confirm: e.target.value }))}
          placeholder="Confirm new password"
        />
      </div>
    </>
  );
}
