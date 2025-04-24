import React, { useState } from "react";
import "./Leave.css";

function LeaveBalanceForm() {
  const [formData, setFormData] = useState({
    employeeId: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checking Leave Balance:", formData);
    alert("Leave Balance Checked!");
  };

  return (
    <div className="leave-form">
      <h2>Check Leave Balance</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee ID:</label>
        <input
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        />

        <label>Department (Optional):</label>
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
        />

        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default LeaveBalanceForm;
