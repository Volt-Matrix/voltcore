import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./documents.css";

const Experience = () => {
  const [experiences, setExperiences] = useState([
    { jobTitle: '', company: '', fromDate: '', toDate: '', description: '' },
  ]);
  const navigate = useNavigate(); 

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updated = [...experiences];
    updated[index][name] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { jobTitle: '', company: '', fromDate: '', toDate: '', description: '' },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated.length ? updated : [{ jobTitle: '', company: '', fromDate: '', toDate: '', description: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Experience Details:', experiences);
    // 🔁 Redirect to bank details page
    navigate('/bank');
  };

  return (
    <div className="edu-documents-form">
      <div className="navbar">
        <Link to="profile/basic-details" className="nav-link">Profile</Link>
        <Link to="/education" className="nav-link">Educational Documents</Link>
        <Link to="/experience" className="nav-link active">Experience</Link>
        <Link to="/bank" className="nav-link">Bank Details</Link>
      </div>

      <h2>Experience Details</h2>

      <form onSubmit={handleSubmit}>
        {experiences.map((exp, index) => (
          <div key={index} className="document-section">
            <div className="form-header">
              <h4>Experience {index + 1}</h4>
              {experiences.length > 1 && (
                <button
                  type="button"
                  className="delete-doc-btn"
                  onClick={() => removeExperience(index)}
                >
                  🗑️ Delete
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={exp.jobTitle}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                value={exp.fromDate}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                name="toDate"
                value={exp.toDate}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={(e) => handleChange(index, e)}
                placeholder="Describe your role and responsibilities"
                rows={3}
                required
              />
            </div>
          </div>
        ))}

        <div className="buttons">
          <button type="button" className="add-btn" onClick={addExperience}>
            + Add More
          </button>
          <button type="submit" className="submit-btn">
            Submit Experience
          </button>
        </div>
      </form>
    </div>
  );
};

export default Experience;
