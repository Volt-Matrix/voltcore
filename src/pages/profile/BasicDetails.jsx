import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./BasicDetails.css";


const BasicDetails = () => {
  const defaultProfileImage = 'https://via.placeholder.com/100'; // Default placeholder image

  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [isEditing, setIsEditing] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    GOVID: '',
    PANNO: '294-38-3535',
    birthDay: '1984-03-17',
    nationality: 'Indian',
    maritalStatus: 'Married',
    joinedDate: '2005-08-03',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(defaultProfileImage);
  };

  return (
    <div className="employee-profile">

      {/* Navigation Bar */}
      <div className="navbar">
        <Link to="profile/basic-details" className="nav-link active">Profile</Link>
        <Link to="/education" className="nav-link">Educational Documents</Link>
        <Link to="/experience" className="nav-link">Experience</Link>
        <Link to="/bank" className="nav-link">Bank Details</Link>
        <Link to="/on-board" className="nav-link">Onboard</Link>
        <Link to="/onboard-task" className="nav-link">OnBoarding-Tasks</Link>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <h2>Employee Name</h2>
          <p className="email">ictehrm-admin@web-stalk.com</p>
          <div className="profile-buttons">
            <label htmlFor="upload-input" className="upload-btn">Upload Profile Image</label>
            <input
              type="file"
              id="upload-input"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleUploadImage}
            />
            <button className="delete-btn" onClick={handleDeleteImage}>Delete Profile Image</button>
          </div>
        </div>
      </div>

      {/* Employee Details */}
      <div className="profile-details">
        <div className="employee-numbers">
          <div><strong>Employee Number:</strong> EMP001</div>
        </div>

        <div className="tabs">
          <button className="tab active">Basic Information</button>
        </div>

        <div className="personal-info">

          {/* Personal Info Title + Edit Button */}
          <div className="personal-info-header">
            <h3>Personal Information</h3>
            <button className="edit-icon-btn" onClick={toggleEdit}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Information Grid */}
          <div className="info-grid">

            {/* Driver's License */}
            <div>
              <label><strong>GOV-ID Number</strong></label>
              {isEditing ? (
                <input
                  type="text"
                  name="govidnumber"
                  value={personalInfo.driversLicense}
                  onChange={handleChange}
                  placeholder="Enter number"
                />
              ) : (
                <p>{personalInfo.driversLicense || '-'}</p>
              )}
            </div>

            {/* Other ID */}
            <div>
              <label><strong>PAN No</strong></label>
              {isEditing ? (
                <input
                  type="text"
                  name="PANNo"
                  value={personalInfo.otherId}
                  onChange={handleChange}
                />
              ) : (
                <p>{personalInfo.otherId}</p>
              )}
            </div>

            {/* Birthday */}
            <div>
              <label><strong>Birth Day</strong></label>
              {isEditing ? (
                <input
                  type="date"
                  name="birthDay"
                  value={personalInfo.birthDay}
                  onChange={handleChange}
                />
              ) : (
                <p>{new Date(personalInfo.birthDay).toDateString()}</p>
              )}
            </div>

            {/* Nationality */}
            <div>
              <label><strong>Nationality</strong></label>
              {isEditing ? (
                <input
                  type="text"
                  name="nationality"
                  value={personalInfo.nationality}
                  onChange={handleChange}
                />
              ) : (
                <p>{personalInfo.nationality}</p>
              )}
            </div>

            {/* Marital Status */}
            <div>
              <label><strong>Marital Status</strong></label>
              {isEditing ? (
                <select
                  name="maritalStatus"
                  value={personalInfo.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                </select>
              ) : (
                <p>{personalInfo.maritalStatus}</p>
              )}
            </div>

            {/* Joined Date */}
            <div>
              <label><strong>Joined Date</strong></label>
              {isEditing ? (
                <input
                  type="date"
                  name="joinedDate"
                  value={personalInfo.joinedDate}
                  onChange={handleChange}
                />
              ) : (
                <p>{new Date(personalInfo.joinedDate).toDateString()}</p>
              )}
            </div>

          </div>

          {/* Save Changes */}
          {isEditing && (
            <div className="save-btn-container">
              <button className="save-btn" onClick={() => setIsEditing(false)}>
                Save Changes
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default BasicDetails;
