import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Leave.css";

function ApplyLeaveForm({ onSuccess, editingLeave, onClose }) {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    contactDuringLeave: "",
    attachment: null,
  });
  const [csrfToken, setCsrfToken] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/csrf/", { withCredentials: true })
      .then(res => setCsrfToken(res.data.csrftoken))
      .catch(err => console.error("Failed to fetch CSRF token", err));
  }, []);

  useEffect(() => {
    if (editingLeave) {
      setFormData({
        leaveType: editingLeave.leaveType,
        fromDate: editingLeave.startDate,
        toDate: editingLeave.endDate,
        reason: editingLeave.reason,
        contactDuringLeave: editingLeave.contactDuringLeave || "",
        attachment: null,
      });
    }
  }, [editingLeave]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, attachment: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.leaveType) newErrors.leaveType = "Select a Leave Type";
    if (!formData.fromDate) newErrors.fromDate = "Start date is required";
    if (!formData.toDate) newErrors.toDate = "End date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const form = new FormData();
    form.append("leaveType", formData.leaveType);
    form.append("startDate", formData.fromDate);
    form.append("endDate", formData.toDate);
    form.append("reason", formData.reason);
    form.append("contactDuringLeave", formData.contactDuringLeave);
    if (formData.attachment) form.append("attachment", formData.attachment);

    const headers = {
      "Content-Type": "multipart/form-data",
      "X-CSRFToken": csrfToken,
    };

    try {
      if (editingLeave) {
        await axios.patch(
          `http://localhost:8000/leave/${editingLeave.id}/`,
          form,
          { headers, withCredentials: true }
        );
        toast.success("Leave updated successfully!");
      } else {
        form.append("status", "Pending");
        await axios.post("http://localhost:8000/leave/", form, {
          headers,
          withCredentials: true,
        });
        toast.success("Leave applied successfully!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Submission error:", error.response || error);
      toast.error("Failed to submit leave application.");
    }
  };

  return (
    <div className="leave-form">
      <h2>{editingLeave ? "Edit Leave" : "Apply for Leave"}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Leave Type:</label>
        <select name="leaveType" value={formData.leaveType} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
          <option value="Earned">Earned</option>
        </select>
        {errors.leaveType && <small className="error-text">{errors.leaveType}</small>}

        <label>From Date:</label>
        <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
        {errors.fromDate && <small className="error-text">{errors.fromDate}</small>}

        <label>To Date:</label>
        <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
        {errors.toDate && <small className="error-text">{errors.toDate}</small>}

        <label>Reason:</label>
        <textarea name="reason" rows={3} value={formData.reason} onChange={handleChange} required />
        {errors.reason && <small className="error-text">{errors.reason}</small>}

        <label>Contact During Leave (Optional):</label>
        <input name="contactDuringLeave" value={formData.contactDuringLeave} onChange={handleChange} />

        <label>Attachment (Optional):</label>
        <input type="file" name="attachment" onChange={handleChange} accept=".pdf,.jpg,.png" />

        <div className="form-buttons">
          <button type="submit">{editingLeave ? "Update" : "Apply"}</button>
          {onClose && <button type="button" onClick={onClose}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default ApplyLeaveForm;
