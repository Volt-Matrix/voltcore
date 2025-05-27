import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ApplyLeaveForm from "./ApplyLeave";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend, LabelList
} from "recharts";
import "./LeaveDashboard.css";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function LeaveDashboard() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFromDate, setFilterFromDate] = useState("");
  const [filterToDate, setFilterToDate] = useState("");
  const [editingLeave, setEditingLeave] = useState(null);
  const [confirmingLeave, setConfirmingLeave] = useState(null);

  const fetchLeaves = () => {
    axios.get("http://localhost:8000/leave/", { withCredentials: true })
      .then(res => setLeaveRequests(res.data))
      .catch(err => console.error("Failed to fetch leaves:", err));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/leave/", { withCredentials: true })
      .then(res => {
        const now = new Date();
        const expiredPendingLeaves = res.data.filter(leave =>
          leave.status === "Pending" && new Date(leave.endDate) < now
        );
        const deletePromises = expiredPendingLeaves.map(leave =>
          axios.delete(`http://localhost:8000/leave/${leave.id}/`, { withCredentials: true })
        );
        Promise.all(deletePromises).then(() => fetchLeaves());
      });
  }, []);

  const openEditModal = (leave) => {
    if (leave.status.toLowerCase() !== "approved") {
      setEditingLeave(leave);
      setShowApplyModal(true);
    }
  };

  const deleteLeave = () => {
    axios.delete(`http://localhost:8000/leave/${confirmingLeave.id}/`, { withCredentials: true })
      .then(() => {
        toast.success("Leave deleted successfully.");
        fetchLeaves();
        setConfirmingLeave(null);
      }).catch(() => toast.error("Failed to delete leave."));
  };

  const countLeaves = (type) => leaveRequests.filter(leave => leave.leaveType === type).length;

  const totalLeaves = { Sick: 6, Casual: 18, Earned: 12 };
  const usedLeaves = {
    Sick: countLeaves("Sick"),
    Casual: countLeaves("Casual"),
    Earned: countLeaves("Earned")
  };
  const remainingLeaves = {
    Sick: totalLeaves.Sick - usedLeaves.Sick,
    Casual: totalLeaves.Casual - usedLeaves.Casual,
    Earned: totalLeaves.Earned - usedLeaves.Earned,
    Total: Object.values(totalLeaves).reduce((a, b) => a + b, 0) -
           Object.values(usedLeaves).reduce((a, b) => a + b, 0)
  };

  const yearlyLeaveData = months.map((month, idx) => {
    const leavesInMonth = leaveRequests.filter(l => {
      const startMonth = new Date(l.startDate).getMonth();
      return startMonth === idx;
    });
    return {
      month,
      Sick: leavesInMonth.filter(l => l.leaveType === "Sick").length,
      Casual: leavesInMonth.filter(l => l.leaveType === "Casual").length,
      Earned: leavesInMonth.filter(l => l.leaveType === "Earned").length
    };
  });

  const filteredLeaves = leaveRequests.filter(l => {
    const matchesType = filterType === "All" || l.leaveType === filterType;
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    const start = new Date(l.startDate);
    const from = filterFromDate ? new Date(filterFromDate) : null;
    const to = filterToDate ? new Date(filterToDate) : null;
    const matchesFromDate = !from || start >= from;
    const matchesToDate = !to || start <= to;
    return matchesType && matchesStatus && matchesFromDate && matchesToDate;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return <span className="badge badge-approved">✔️ Approved</span>;
      case "rejected": return <span className="badge badge-rejected">❌ Rejected</span>;
      case "pending": return <span className="badge badge-pending">⏳ Pending</span>;
      default: return status;
    }
  };

  const cardClass = (remaining) => remaining === 0 ? "card card-zero" : "card";

  return (
    <div className="leave-dashboard">
      {(showApplyModal || editingLeave) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => {
              setShowApplyModal(false);
              setEditingLeave(null);
            }}>×</button>
            <ApplyLeaveForm
              onSuccess={() => {
                fetchLeaves();
                setShowApplyModal(false);
                setEditingLeave(null);
              }}
              editingLeave={editingLeave}
              onClose={() => {
                setShowApplyModal(false);
                setEditingLeave(null);
              }}
            />
          </div>
        </div>
      )}

      {confirmingLeave && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this leave?</h3>
            <p><strong>{confirmingLeave.leaveType}</strong> from <strong>{confirmingLeave.startDate}</strong> to <strong>{confirmingLeave.endDate}</strong></p>
            <div className="modal-buttons">
              <button onClick={deleteLeave} style={{ backgroundColor: 'red' }}>Yes, Delete</button>
              <button onClick={() => setConfirmingLeave(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="top-bar">
        <div className="leave-cards">
          {["Sick", "Casual", "Earned"].map(type => (
            <div key={type} className={cardClass(remainingLeaves[type])}>
              <div className="leave-icon">{type === "Sick" ? "🩺" : type === "Casual" ? "🏖️" : "📚"}</div>
              <h4>{type} Leave</h4>
              <p>{remainingLeaves[type]} Leaves Remaining</p>
            </div>
          ))}
          <div className={cardClass(remainingLeaves.Total)}>
            <div className="leave-icon">🗓️</div>
            <h4>Total Leaves</h4>
            <p>{remainingLeaves.Total} Leaves Remaining</p>
          </div>
        </div>
        <div className="leave-buttons">
          <button className="apply-button" onClick={() => setShowApplyModal(true)}>Apply Leave</button>
        </div>
      </div>

      <div className="middle-section">
        <div className="graph-container">
          <h3>Yearly Leave Graph</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={yearlyLeaveData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sick" stackId="a" fill="#82ca9d">
              </Bar>
              <Bar dataKey="Casual" stackId="a" fill="#8884d8">
              </Bar>
              <Bar dataKey="Earned" stackId="a" fill="#ffc658">
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="history-table">
        <h3>Leave History Table</h3>
        <div className="filters">
          <label>Type:</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="All">All</option>
            <option value="Sick">Sick</option>
            <option value="Casual">Casual</option>
            <option value="Earned">Earned</option>
          </select>
          <label>Status:</label>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <label>From:</label>
          <input type="date" value={filterFromDate} onChange={e => setFilterFromDate(e.target.value)} />
          <label>To:</label>
          <input type="date" value={filterToDate} onChange={e => setFilterToDate(e.target.value)} />
        </div>

        <table className="table-style1">
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.leaveType}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{getStatusBadge(leave.status)}</td>
                <td>
                  {leave.status.toLowerCase() !== "approved" && (
                    <button onClick={() => openEditModal(leave)}>✏️ Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LeaveDashboard;
