import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import ApplyLeaveForm from "./ApplyLeave";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";
import leaveRequestsData from "./LeaveData";
import "./LeaveDashboard.css";

const totalLeaves = {
  "Sick Leave": 6,
  "Casual Leave": 18,
  "Earned Leave": 12
};

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function LeaveDashboard() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [filterType, setFilterType] = useState("All");

  const usedLeaves = {
    "Sick Leave": leaveRequestsData.filter(leave => leave.leaveType.includes("Sick")).length,
    "Casual Leave": leaveRequestsData.filter(leave => leave.leaveType.includes("Casual")).length,
    "Earned Leave": leaveRequestsData.filter(leave => leave.leaveType.includes("Earned")).length
  };

  const remainingLeaves = {
    "Sick Leave": totalLeaves["Sick Leave"] - usedLeaves["Sick Leave"],
    "Casual Leave": totalLeaves["Casual Leave"] - usedLeaves["Casual Leave"],
    "Earned Leave": totalLeaves["Earned Leave"] - usedLeaves["Earned Leave"],
    "Total":
      (totalLeaves["Sick Leave"] + totalLeaves["Casual Leave"] + totalLeaves["Earned Leave"]) -
      (usedLeaves["Sick Leave"] + usedLeaves["Casual Leave"] + usedLeaves["Earned Leave"])
  };

  const yearlyLeaveData = months.map((month, index) => {
    const monthLeaves = leaveRequestsData.filter((leave) => {
      const leaveMonth = new Date(leave.startDate).getMonth();
      return leaveMonth === index;
    });
    return {
      month,
      Sick: monthLeaves.filter(l => l.leaveType.includes("Sick")).length,
      Casual: monthLeaves.filter(l => l.leaveType.includes("Casual")).length,
      Earned: monthLeaves.filter(l => l.leaveType.includes("Earned")).length
    };
  });

  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <span className="badge badge-approved">✔️ Approved</span>;
      case "rejected":
        return <span className="badge badge-rejected">❌ Rejected</span>;
      case "pending":
        return <span className="badge badge-pending">⏳ Pending</span>;
      default:
        return status;
    }
  };

  const cardClass = (remaining) => {
    return remaining === 0 ? "card card-zero" : "card";
  };

  const filteredLeaves = filterType === "All"
    ? leaveRequestsData
    : leaveRequestsData.filter(leave => leave.leaveType.includes(filterType));

  return (
    <div className="leave-dashboard">

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => setShowApplyModal(false)}>×</button>
            <ApplyLeaveForm onSuccess={() => setShowApplyModal(false)} />
          </div>
        </div>
      )}

      {/* Top Cards */}
      <div className="top-bar">
        <div className="leave-cards">
          <div className={cardClass(remainingLeaves["Sick Leave"])}>
            <div className="leave-icon">🩺</div>
            <h4>Sick Leave</h4>
            <p>{remainingLeaves["Sick Leave"]} Leaves Remaining</p>
          </div>
          <div className={cardClass(remainingLeaves["Casual Leave"])}>
            <div className="leave-icon">🏖️</div>
            <h4>Casual Leave</h4>
            <p>{remainingLeaves["Casual Leave"]} Leaves Remaining</p>
          </div>
          <div className={cardClass(remainingLeaves["Earned Leave"])}>
            <div className="leave-icon">📚</div>
            <h4>Earned Leave</h4>
            <p>{remainingLeaves["Earned Leave"]} Leaves Remaining</p>
          </div>
          <div className={cardClass(remainingLeaves["Total"])}>
            <div className="leave-icon">🗓️</div>
            <h4>Total Leaves</h4>
            <p>{remainingLeaves["Total"]} Leaves Remaining</p>
          </div>
        </div>

        <div className="leave-buttons">
          <button className="apply-button" onClick={() => setShowApplyModal(true)}>Apply Leave</button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="last-updated">
        Last Updated: {todayDate}
      </div>

      {/* Yearly Leave Graph */}
      <div className="middle-section">
        <div className="graph-container">
          <h3>Yearly Leave Graph</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={yearlyLeaveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sick" stackId="a" fill="#82ca9d">
                <LabelList dataKey="Sick" position="top" formatter={(v) => v > 0 ? `${v}` : ""} />
              </Bar>
              <Bar dataKey="Casual" stackId="a" fill="#8884d8">
                <LabelList dataKey="Casual" position="top" formatter={(v) => v > 0 ? `${v}` : ""} />
              </Bar>
              <Bar dataKey="Earned" stackId="a" fill="#ffc658">
                <LabelList dataKey="Earned" position="top" formatter={(v) => v > 0 ? `${v}` : ""} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leave History Table */}
      <div className="history-table">
        <h3>Leave History Table</h3>

        <label htmlFor="type-filter">Filter by Leave Type:</label>
        <select
          id="type-filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Sick">Sick Leave</option>
          <option value="Casual">Casual Leave</option>
          <option value="Earned">Earned Leave</option>
        </select>

        <table className='table-style1'>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves
              .filter(leave => ["Sick", "Casual", "Earned"].some(type => leave.leaveType.includes(type)))
              .map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leaveType}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{getStatusBadge(leave.status)}</td>
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
