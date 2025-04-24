import React, { useState } from "react";
import "./Leave.css"; // 👈 updated import

function ApplyLeaveForm() {
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    contactDuringLeave: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Application:", formData);
    alert("Leave Application Submitted!");
  };

  return (
    <div className="leave-form">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee ID:</label>
        <input name="employeeId" value={formData.employeeId} onChange={handleChange} required />

        <label>Leave Type:</label>
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
          <option value="Earned">Earned</option>
          <option value="Maternity/Paternity">Maternity/Paternity</option>
          <option value="Other">Other</option>
        </select>

        <label>From Date:</label>
        <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />

        <label>To Date:</label>
        <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />

        <label>Reason:</label>
        <textarea name="reason" value={formData.reason} onChange={handleChange} rows={3} required />

        <label>Contact During Leave:</label>
        <input name="contactDuringLeave" value={formData.contactDuringLeave} onChange={handleChange} />

        <label>Attachment (Optional):</label>
        <input type="file" name="attachment" onChange={handleChange} accept=".pdf,.jpg,.png" />

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default ApplyLeaveForm;
