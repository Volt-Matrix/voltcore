import React, { useState } from "react";
import "./BasicDetails.css";

function BasicDetails() {
  // Dummy multiple user data
  const users = {
    EMP001: {
      fullName: "Bhavish Kanna",
      employeeId: "EMP001",
      dob: "1998-07-25",
      gender: "Male",
      email: "bhavish@example.com",
      phone: "9876543210",
      altPhone: "9123456789",
      profilePic: null,
      currentAddress: "123 Bay Street",
      permanentAddress: "456 Queen Street",
      city: "Toronto",
      state: "Ontario",
      zip: "M5J2N8",
      country: "Canada",
    },
    EMP002: {
      fullName: "Aarav Mehta",
      employeeId: "EMP002",
      dob: "1995-05-15",
      gender: "Male",
      email: "aarav@example.com",
      phone: "9871112222",
      altPhone: "9223344556",
      profilePic: null,
      currentAddress: "789 King Street",
      permanentAddress: "100 Spadina Ave",
      city: "Mississauga",
      state: "Ontario",
      zip: "L5B4C2",
      country: "Canada",
    },
    EMP003: {
      fullName: "Sara Thomas",
      employeeId: "EMP003",
      dob: "1990-11-10",
      gender: "Female",
      email: "sara@example.com",
      phone: "9898989898",
      altPhone: "",
      profilePic: null,
      currentAddress: "50 Richmond St",
      permanentAddress: "50 Richmond St",
      city: "Ottawa",
      state: "Ontario",
      zip: "K1A0B1",
      country: "Canada",
    },
  };

  const [selectedUserId, setSelectedUserId] = useState("EMP001");
  const [userProfiles, setUserProfiles] = useState(users);
  const [formData, setFormData] = useState(users[selectedUserId]);
  const [editMode, setEditMode] = useState(false);

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedUserId(id);
    setFormData(userProfiles[id]);
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfiles = { ...userProfiles, [selectedUserId]: formData };
    setUserProfiles(updatedProfiles);
    setEditMode(false);
    alert("Profile updated for " + selectedUserId);
  };

  return (
    <div className="basic-details-form">
      <h2>Basic Information</h2>

      <label>Select Employee:</label>
      <select value={selectedUserId} onChange={handleSelectChange}>
        {Object.keys(userProfiles).map((id) => (
          <option key={id} value={id}>
            {userProfiles[id].fullName} ({id})
          </option>
        ))}
      </select>

      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>Full Name:</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Employee ID:</label>
          <input name="employeeId" value={formData.employeeId} onChange={handleChange} disabled />

          <label>Date of Birth:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label>Email Address:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Alternate Phone:</label>
          <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} />

          <label>Profile Picture:</label>
          <input type="file" name="profilePic" onChange={handleChange} accept="image/*" />

          <h3>Address Details</h3>

          <label>Current Address:</label>
          <textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} required />

          <label>Permanent Address:</label>
          <textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required />

          <label>City:</label>
          <input name="city" value={formData.city} onChange={handleChange} required />

          <label>State:</label>
          <input name="state" value={formData.state} onChange={handleChange} required />

          <label>Zip Code:</label>
          <input name="zip" value={formData.zip} onChange={handleChange} required />

          <label>Country:</label>
          <input name="country" value={formData.country} onChange={handleChange} required />

          <button type="submit">Save</button>
        </form>
      ) : (
        <div style={{ lineHeight: "1.8", marginTop: "20px" }}>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Employee ID:</strong> {formData.employeeId}</p>
          <p><strong>Date of Birth:</strong> {formData.dob}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Alternate Phone:</strong> {formData.altPhone}</p>
          <p><strong>Current Address:</strong> {formData.currentAddress}</p>
          <p><strong>Permanent Address:</strong> {formData.permanentAddress}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>State:</strong> {formData.state}</p>
          <p><strong>Zip:</strong> {formData.zip}</p>
          <p><strong>Country:</strong> {formData.country}</p>

          <button type="button" onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default BasicDetails;
