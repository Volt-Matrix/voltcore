import React, { useState } from "react";
import "./Leave.css";

function LeaveHistoryForm() {
  const [formData, setFormData] = useState({
    employeeId: "",
    year: "",
    filterType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Viewing Leave History:", formData);
    alert("Leave History Retrieved!");
  };

  return (
    <div className="leave-form">
      <h2>Leave History</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee ID:</label>
        <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />

        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="e.g. 2024"
          required
        />

        <label>Filter By Type:</label>
        <select name="filterType" value={formData.filterType} onChange={handleChange}>
          <option value="">All</option>
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
          <option value="Earned">Earned</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default LeaveHistoryForm;
