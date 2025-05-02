import React, { useState } from "react";
import "./Leave.css"; // Keep your updated Leave.css

function ApplyLeaveForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    contactDuringLeave: '',
    attachment: null,
  });

  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'attachment') {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeId.trim()) newErrors.employeeId = "Employee ID is required";
    if (!formData.leaveType) newErrors.leaveType = "Select a Leave Type";
    if (!formData.fromDate) newErrors.fromDate = "Start date is required";
    if (!formData.toDate) newErrors.toDate = "End date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Leave Application:", formData);
      setShowSuccessModal(true);
      setFormData({
        employeeId: "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
        contactDuringLeave: "",
        attachment: null,
      });
      setErrors({});
      if (onSuccess) onSuccess();
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="leave-form">
        <h2>Apply for Leave</h2>
        <form onSubmit={handleSubmit}>
          <label>Employee ID:</label>
          <input
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className={errors.employeeId ? "error-input" : ""}
            required
          />
          {errors.employeeId && <small className="error-text">{errors.employeeId}</small>}

          <label>Leave Type:</label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className={errors.leaveType ? "error-input" : ""}
            required
          >
            <option value="">Select</option>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Earned">Earned</option>
          </select>
          {errors.leaveType && <small className="error-text">{errors.leaveType}</small>}

          <label>From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            className={errors.fromDate ? "error-input" : ""}
            required
          />
          {errors.fromDate && <small className="error-text">{errors.fromDate}</small>}

          <label>To Date:</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            className={errors.toDate ? "error-input" : ""}
            required
          />
          {errors.toDate && <small className="error-text">{errors.toDate}</small>}

          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className={errors.reason ? "error-input" : ""}
            required
          />
          {errors.reason && <small className="error-text">{errors.reason}</small>}

          <label>Contact During Leave (Optional):</label>
          <input
            name="contactDuringLeave"
            value={formData.contactDuringLeave}
            onChange={handleChange}
          />

          <label>Attachment (Optional):</label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            accept=".pdf,.jpg,.png"
          />

          <button type="submit">Apply</button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>🎉 Leave Applied Successfully!</h3>
            <div className="confirm-buttons">
              <button className="confirm-stay" onClick={closeSuccessModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApplyLeaveForm;
