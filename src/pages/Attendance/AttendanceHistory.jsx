import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AttendanceHistory.css";

// Utility to generate random attendance data
const generateFakeData = () => {
  const names = [
    { name: "Bhavish Saravanan", id: "EMP001", department: "Engineering" },
    { name: "Kavya Iyer", id: "EMP002", department: "Marketing" },
    { name: "Neeraj Singh", id: "EMP003", department: "Finance" },
  ];

  const statuses = ["Present", "Absent", "Leave", "WFH"];
  const modes = ["Web", "Mobile App", "Biometric"];
  const remarks = ["Late Login", "Field Visit", "Early Logout", ""];

  const today = new Date().toISOString().split("T")[0];

  return names.map((person) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const checkIn = status === "Present" ? "09:0" + Math.floor(Math.random() * 5) + " AM" : "-";
    const checkOut = status === "Present" ? "06:0" + Math.floor(Math.random() * 5) + " PM" : "-";
    const workingHours = status === "Present" ? "8h " + Math.floor(Math.random() * 59) + "m" : "0h";

    return {
      ...person,
      date: today,
      checkIn,
      checkOut,
      workingHours,
      status,
      mode: modes[Math.floor(Math.random() * modes.length)],
      remarks: remarks[Math.floor(Math.random() * remarks.length)],
    };
  });
};

const AttendanceHistory = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setAttendanceData(generateFakeData()); // initial load
    const interval = setInterval(() => {
      setAttendanceData(generateFakeData()); // simulate real-time updates
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = attendanceData.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.includes(searchTerm);
    const matchesDept = selectedDept === "All" || entry.department === selectedDept;
    const withinDateRange =
      (!startDate || new Date(entry.date) >= startDate) &&
      (!endDate || new Date(entry.date) <= endDate);
    return matchesSearch && matchesDept && withinDateRange;
  });

  return (
    <div className="attendance-container">
      <h2>Real-Time Attendance History</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
        </select>
        <DatePicker
          placeholderText="Start Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          placeholderText="End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>

      <div className="table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Department</th>
              <th>Date</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Working Hours</th>
              <th>Status</th>
              <th>Mode</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.id}</td>
                  <td>{entry.department}</td>
                  <td>{entry.date}</td>
                  <td>{entry.checkIn}</td>
                  <td>{entry.checkOut}</td>
                  <td>{entry.workingHours}</td>
                  <td className={`status ${entry.status.toLowerCase()}`}>{entry.status}</td>
                  <td>{entry.mode}</td>
                  <td>{entry.remarks || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;
