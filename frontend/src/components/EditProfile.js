// src/components/EditProfile.js
import '../styles/EditProfile.styles.css';

function EditProfile() {
  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
