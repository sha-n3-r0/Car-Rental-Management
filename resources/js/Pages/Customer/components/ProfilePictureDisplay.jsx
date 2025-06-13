export default function ProfilePictureDisplay({ url, setPicture }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      {url && (
        <div>
          <label>Current Profile Picture:</label><br />
          <img src={url} alt="Profile" style={{ maxWidth: '150px', borderRadius: '8px', marginTop: '0.5rem' }} />
        </div>
      )}
      <label>Upload New Picture:</label><br />
      <input type="file" onChange={e => setPicture(e.target.files[0])} accept="image/*" />
    </div>
  );
}
