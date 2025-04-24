import React, { useState } from "react";
import "./BasicDetails.css";

function ExperienceForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    employeeId: "",
    startDate: "",
    endDate: "",
    location: "",
    responsibilities: "",
    skillsUsed: "",
    referenceContact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Experience Data:", formData);
    alert("Experience Saved Successfully!");
  };

  return (
    <div className="basic-details-form">
      <h2>Professional Experience</h2>
      <form onSubmit={handleSubmit}>
        <label>Company Name:</label>
        <input name="companyName" value={formData.companyName} onChange={handleChange} required />

        <label>Job Title:</label>
        <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />

        <label>Employee ID:</label>
        <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

        <label>Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} />

        <label>Responsibilities:</label>
        <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows={4} />

        <label>Skills Used:</label>
        <input name="skillsUsed" value={formData.skillsUsed} onChange={handleChange} />

        <label>Reference Contact (Optional):</label>
        <input name="referenceContact" value={formData.referenceContact} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ExperienceForm;

