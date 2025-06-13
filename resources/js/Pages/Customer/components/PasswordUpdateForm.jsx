export default function PasswordUpdateForm({ data, setData, hasPassword }) {
  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

  return (
    <>
      <hr />
      <h3>Change Password (Optional)</h3>
      {hasPassword && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Current Password:</label><br />
          <input type="password" value={data.current} onChange={e => update('current', e.target.value)} />
        </div>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <label>New Password:</label><br />
        <input type="password" value={data.new} onChange={e => update('new', e.target.value)} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Confirm Password:</label><br />
        <input type="password" value={data.confirm} onChange={e => update('confirm', e.target.value)} />
      </div>
    </>
  );
}
