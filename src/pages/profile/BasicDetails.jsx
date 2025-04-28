import React, { useState, useEffect } from "react";
import "./BasicDetails.css";

function BasicDetails({ profileData, onSave }) {
  const [formData, setFormData] = useState(profileData || {
    fullName: "",
    employeeId: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    altPhone: "",
    profilePic: null,
    currentAddress: "",
    permanentAddress: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  useEffect(() => {
    if (profileData) setFormData(profileData);
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profilePic" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    onSave(formData);
  };

  const profilePicPreview = formData.profilePic
    ? URL.createObjectURL(formData.profilePic)
    : null;

  return (
    <div className="basic-details-form">
      <h2>Basic Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Employee ID</label>
            <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Alternate Phone</label>
            <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" name="profilePic" onChange={handleChange} accept="image/*" />
            {profilePicPreview && (
              <img src={profilePicPreview} alt="Preview" className="profile-pic-preview" />
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current Address</label>
            <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Permanent Address</label>
            <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>City</label>
            <input name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>State</label>
            <input name="state" value={formData.state} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Zip Code</label>
            <input name="zip" value={formData.zip} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input name="country" value={formData.country} onChange={handleChange} required />
          </div>
        </div>

        {/* Bank Details Section */}
        <h3>Bank Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Bank Name</label>
            <input name="bankName" value={formData.bankName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Account Number</label>
            <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>IFSC Code</label>
            <input name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
          </div>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default BasicDetails;