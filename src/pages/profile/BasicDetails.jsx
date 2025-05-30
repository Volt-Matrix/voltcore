import React, { useState } from 'react';
import "./BasicDetails.css";
import ProfileNavbar from '../../components/Profile/ProfileNavbar';

const BasicDetails = ({ profileData = null, onSaveSuccess }) => {
  const defaultProfileData = {
    full_name: '',
    employee_id: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    alt_phone: '',
    current_address: '',
    permanent_address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
  };

  const [personalInfo, setPersonalInfo] = useState(profileData || defaultProfileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { id, profile_picture, ...payload } = personalInfo;

      const response = await fetch('http://127.0.0.1:8000/profiles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const savedProfile = await response.json();
        alert(`Profile saved successfully! ID: ${savedProfile.id}`);
        setPersonalInfo(defaultProfileData); 
        if (onSaveSuccess) onSaveSuccess(savedProfile);
      } else {
        const errorData = await response.json();
        alert('Error saving profile: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="employee-profile">
      <ProfileNavbar />

      <div className="profile-header">
        <img
          src={"https://placehold.co/100x100"}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <div className="name-and-upload">
            <h2 className="employee-name">
              {personalInfo.full_name || 'New Employee'} {personalInfo.id && `(ID: ${personalInfo.id})`}
            </h2>
          
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
                name="full_name"
                value={personalInfo.full_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Employee ID</strong></label>
              <input
                type="text"
                name="employee_id"
                value={personalInfo.employee_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Date of Birth</strong></label>
              <input
                type="date"
                name="date_of_birth"
                value={personalInfo.date_of_birth}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Gender</strong></label>
              <select name="gender" value={personalInfo.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
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
                name="alt_phone"
                value={personalInfo.alt_phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Current Address</strong></label>
              <input
                type="text"
                name="current_address"
                value={personalInfo.current_address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label><strong>Permanent Address</strong></label>
              <input
                type="text"
                name="permanent_address"
                value={personalInfo.permanent_address}
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
              <label><strong>Zip Code</strong></label>
              <input
                type="text"
                name="zip_code"
                value={personalInfo.zip_code}
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
