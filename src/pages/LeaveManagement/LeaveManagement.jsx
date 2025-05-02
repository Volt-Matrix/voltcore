import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./LeaveManagement.css";

Modal.setAppElement("#root");

function LeaveManagement() {
  const [stats] = useState({ onLeave: 12, wfh: 8, present: 75 });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDept, setSelectedDept] = useState("All");
  const [modalData, setModalData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, name: "Aarav Mehta", department: "HR", type: "Annual", from: "2025-05-01", to: "2025-05-03", status: "Pending" },
    { id: 2, name: "Saanvi Sharma", department: "Engineering", type: "Sick", from: "2025-05-02", to: "2025-05-02", status: "Pending" },
    { id: 3, name: "Rohan Patel", department: "Finance", type: "Casual", from: "2025-05-03", to: "2025-05-05", status: "Approved" },
    { id: 4, name: "Neha Verma", department: "Sales", type: "Annual", from: "2025-05-06", to: "2025-05-08", status: "Rejected" },
    { id: 5, name: "Yash Kumar", department: "Marketing", type: "WFH", from: "2025-05-02", to: "2025-05-02", status: "Approved" },
    { id: 6, name: "Ishita Rao", department: "IT", type: "Sick", from: "2025-05-07", to: "2025-05-09", status: "Pending" },
    { id: 7, name: "Karan Singh", department: "Operations", type: "Annual", from: "2025-05-01", to: "2025-05-01", status: "Approved" }
  ]);

  const departments = [...new Set(leaveRequests.map(req => req.department || "General"))];

  const isWithinDateRange = (req) => {
    if (!startDate || !endDate) return true;
    return req.from >= startDate && req.to <= endDate;
  };

  const filteredRequests = leaveRequests.filter(req =>
    (selectedDept === "All" || req.department === selectedDept) &&
    isWithinDateRange(req)
  );

  const leaveInfo = {
    "2025-05-01": ["Aarav Mehta (Leave)", "Karan Singh (Leave)"],
    "2025-05-02": ["Saanvi Sharma (Leave)", "Yash Kumar (WFH)"],
    "2025-05-03": ["Rohan Patel (Leave)"],
    "2025-05-06": ["Neha Verma (Leave)"],
    "2025-05-07": ["Ishita Rao (Leave)"]
  };

  const leaveDates = Object.keys(leaveInfo).filter(date =>
    leaveInfo[date].some(info => info.includes("Leave"))
  );
  const wfhDates = Object.keys(leaveInfo).filter(date =>
    leaveInfo[date].some(info => info.includes("WFH"))
  );

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const d = date.toISOString().split("T")[0];
      if (wfhDates.includes(d)) return "wfh-day";
      if (leaveDates.includes(d)) return "leave-day";
    }
    return null;
  };

  const handleDecision = (id, newStatus) => {
    setLeaveRequests(prev =>
      prev.map(req =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const exportToCSV = (data, filename) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const attendanceData = [
    { day: 'Mon', Present: 70, Absent: 10, WFH: 5 },
    { day: 'Tue', Present: 72, Absent: 8, WFH: 6 },
    { day: 'Wed', Present: 65, Absent: 12, WFH: 10 },
    { day: 'Thu', Present: 80, Absent: 5, WFH: 2 },
    { day: 'Fri', Present: 75, Absent: 8, WFH: 3 }
  ];

  return (
    <div className="leave-management-container">
      <h1>Organization Leave Dashboard</h1>

      <div className="stats-cards">
        <div className="card">Employees on Leave: {stats.onLeave}</div>
        <div className="card">Employees WFH: {stats.wfh}</div>
        <div className="card">Total Employees Present: {stats.present}</div>
      </div>

      <div className="section filter-bar">
        <h2>Filter Records</h2>
        <label>Department:</label>
        <select value={selectedDept} onChange={e => setSelectedDept(e.target.value)}>
          <option value="All">All</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <label>Date From:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <label>To:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>

      <div className="section">
        <h2>Employee Leave Requests</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => (
                <tr key={req.id}>
                  <td><button className="link-button" onClick={() => setModalData(req)}>{req.name}</button></td>
                  <td>{req.department}</td>
                  <td>{req.type}</td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === "Pending" ? (
                      <>
                        <button onClick={() => handleDecision(req.id, "Approved")}>Approve</button>
                        <button onClick={() => handleDecision(req.id, "Rejected")}>Reject</button>
                      </>
                    ) : <span>{req.status}</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7">No leave requests found for selected filters.</td></tr>
            )}
          </tbody>
        </table>
        <button className="export-btn" onClick={() => exportToCSV(filteredRequests, "leave-requests.csv")}>Export Leave Requests</button>
      </div>

      <div className="section calendar-chart-section">
        <div className="calendar-box">
          <h2>Organization Calendar Overview</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={tileClassName}
          />
          <div className="calendar-tooltip">
            <strong>{selectedDate.toISOString().split("T")[0]}</strong><br />
            {leaveInfo[selectedDate.toISOString().split("T")[0]]?.join(", ") || "No entries"}
          </div>
          <div className="calendar-legend">
            <div><span className="legend-box leave"></span> On Leave (Red)</div>
            <div><span className="legend-box wfh"></span> Work From Home (Blue)</div>
          </div>
        </div>

        <div className="chart-box">
          <h2>Weekly Attendance Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" fill="#4caf50" />
              <Bar dataKey="Absent" fill="#f44336" />
              <Bar dataKey="WFH" fill="#2196f3" />
            </BarChart>
          </ResponsiveContainer>
          <button className="export-btn" onClick={() => exportToCSV(attendanceData, "attendance-summary.csv")}>Export Attendance Data</button>
        </div>
      </div>

      <Modal isOpen={!!modalData} onRequestClose={() => setModalData(null)} contentLabel="Leave Detail" className="leave-modal">
        <h2>Leave Request Details</h2>
        {modalData && (
          <div className="modal-content">
            <p><strong>Name:</strong> {modalData.name}</p>
            <p><strong>Department:</strong> {modalData.department}</p>
            <p><strong>Type:</strong> {modalData.type}</p>
            <p><strong>From:</strong> {modalData.from}</p>
            <p><strong>To:</strong> {modalData.to}</p>
            <p><strong>Status:</strong> {modalData.status}</p>
          </div>
        )}
        <button onClick={() => setModalData(null)} className="modal-close-btn">Close</button>
      </Modal>
    </div>
  );
}

export default LeaveManagement;
