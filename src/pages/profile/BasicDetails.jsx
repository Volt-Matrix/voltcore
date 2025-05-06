import React, { useState } from 'react';
import "./BasicDetails.css";
import ProfileNavbar from '../../components/Profile/ProfileNavbar';


const BasicDetails = ({ profileData, onSave }) => {
  const defaultProfileData = {
    fullName: '',
    employeeId: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    altPhone: '',
    currentAddress: '',
    permanentAddress: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    profilePic: 'https://placehold.co/100x100',
  };

  const profile = profileData || defaultProfileData;

  const [profileImage, setProfileImage] = useState(profile.profilePic);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: profile.fullName,
    employeeId: profile.employeeId,
    dob: profile.dob,
    gender: profile.gender,
    email: profile.email,
    phone: profile.phone,
    altPhone: profile.altPhone,
    currentAddress: profile.currentAddress,
    permanentAddress: profile.permanentAddress,
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
    country: profile.country,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleSave = () => {
    onSave(personalInfo);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="employee-profile">
      <ProfileNavbar />
      
      <div className="profile-header">
  <img src={profileImage} alt="Profile" className="profile-image" />
  <div className="profile-info">
    <div className="name-and-upload">
      <h2 className="employee-name">{personalInfo.fullName}</h2>
      <label htmlFor="upload-input" className="upload-btns">
        Upload
      </label>
      <input
        type="file"
        id="upload-input"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleUploadImage}
      />
    </div>
  </div>
</div>


      <div className="profile-details">
        <div className="personal-info">
          <div className="personal-info-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            <div>
              <label><strong>Full Name</strong></label>
              <input
                type="text"
                name="fullName"
                value={personalInfo.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Employee ID</strong></label>
              <input
                type="text"
                name="employeeId"
                value={personalInfo.employeeId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Date of Birth</strong></label>
              <input
                type="date"
                name="dob"
                value={personalInfo.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Email</strong></label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Phone</strong></label>
              <input
                type="text"
                name="phone"
                value={personalInfo.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Alt Phone</strong></label>
              <input
                type="text"
                name="altPhone"
                value={personalInfo.altPhone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Current Address</strong></label>
              <input
                type="text"
                name="currentAddress"
                value={personalInfo.currentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Permanent Address</strong></label>
              <input
                type="text"
                name="permanentAddress"
                value={personalInfo.permanentAddress}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>City</strong></label>
              <input
                type="text"
                name="city"
                value={personalInfo.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>State</strong></label>
              <input
                type="text"
                name="state"
                value={personalInfo.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Zip</strong></label>
              <input
                type="text"
                name="zip"
                value={personalInfo.zip}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Country</strong></label>
              <input
                type="text"
                name="country"
                value={personalInfo.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="save-btn-container">
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
