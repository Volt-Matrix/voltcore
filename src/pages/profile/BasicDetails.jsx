import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployee } from '../../components/Profile/EmployeeContext';
import ProfileNavbar from '../../components/Profile/ProfileNavbar';
import './BasicDetails.css';

const defaultProfileData = {
  id: null,
  employee_id: '',
  full_name: '',
  birthday: '',
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

const BasicDetails = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useEmployee();
  const [personalInfo, setPersonalInfo] = useState(defaultProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch('http://localhost:8000/my-employee/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include' 
        });

        if (response.ok) {
          const data = await response.json();
          setPersonalInfo(data);
          setProfile(data);
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Network error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [setProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8000/employees/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify(personalInfo),
      });

      if (response.ok) {
        const updated = await response.json();
        alert('Profile updated successfully');
        setPersonalInfo(updated);
        setProfile(updated);
      } else {
        const errorData = await response.json();
        alert('Error updating profile: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  if (loading) return <p>Loading employee profile...</p>;

  return (
    <div className="employee-profile">
      <ProfileNavbar />
      <div className="profile-header">
        <img
          src="https://placehold.co/100x100"
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h2 className="employee-name">
            {personalInfo.full_name || 'New Employee'}{' '}
            {personalInfo.id && `(ID: ${personalInfo.id})`}
          </h2>
          <p>Employee ID: {personalInfo.employee_id || 'N/A'}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="personal-info">
          <div className="personal-info-header">
            <h3>Personal Information</h3>
          </div>

          <div className="info-grid">
            {[ 
              { label: "Full Name", name: "full_name" },
              { label: "Employee ID", name: "employee_id" },
              { label: "Date of Birth", name: "birthday", type: "date" },
              { label: "Gender", name: "gender", type: "select", options: ["M", "F", "O"] },
              { label: "Email", name: "email" },
              { label: "Phone", name: "phone" },
              { label: "Alt Phone", name: "alt_phone" },
              { label: "Current Address", name: "current_address" },
              { label: "Permanent Address", name: "permanent_address" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "Zip Code", name: "zip_code" },
              { label: "Country", name: "country" },
            ].map(({ label, name, type = "text", options }) => (
              <div key={name} className="info-field">
                <label><strong>{label}</strong></label>
                {type === "select" ? (
                  <select name={name} value={personalInfo[name]} onChange={handleChange}>
                    <option value="">Select</option>
                    {options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={personalInfo[name]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
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
