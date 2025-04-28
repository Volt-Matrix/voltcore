import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import leaveRequestsData from './LeaveData';
import './LeaveHistory.css';

const COLORS = {
  Approved: '#82ca9d',
  Pending: '#8884d8',
  Rejected: '#ff6b6b',
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function LeaveHistory() {
  const [selectedMonth, setSelectedMonth] = useState('April');

  const getMonthNumber = (monthName) => MONTHS.indexOf(monthName) + 1;

  const filteredLeaves = leaveRequestsData.filter((leave) => {
    const leaveMonth = new Date(leave.startDate).getMonth() + 1;
    return leaveMonth === getMonthNumber(selectedMonth);
  });

  const leaveCounts = filteredLeaves.reduce(
    (acc, leave) => {
      acc[leave.status] = (acc[leave.status] || 0) + 1;
      acc.Total += 1;
      return acc;
    },
    { Total: 0, Approved: 0, Pending: 0, Rejected: 0 }
  );

  const leaveTypeStats = {};
  filteredLeaves.forEach((leave) => {
    const type = leave.leaveType;
    if (!leaveTypeStats[type]) {
      leaveTypeStats[type] = { taken: 0 };
    }
    leaveTypeStats[type].taken += 1;
  });

  const leaveBalances = {
    'Sick Leave': 10,
    'Casual Leave': 12,
    'Earned Leave': 15,
    'Maternity Leave': 180,
  };

  const pieChartData = [
    { name: 'Approved', value: leaveCounts.Approved },
    { name: 'Pending', value: leaveCounts.Pending },
    { name: 'Rejected', value: leaveCounts.Rejected },
  ];

  return (
    <div className="leave-history-wrapper">
      <h2>Leave History Dashboard</h2>

      <div className="month-filter">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          {MONTHS.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="summary-cards">
        <div className="card total">Total Leaves: {leaveCounts.Total}</div>
        <div className="card pending">Pending: {leaveCounts.Pending}</div>
        <div className="card approved">Approved: {leaveCounts.Approved}</div>
        <div className="card rejected">Rejected: {leaveCounts.Rejected}</div>
      </div>

      <h3>Leave Type Summary – {selectedMonth}</h3>
      <table className="type-summary-table">
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Used</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(leaveTypeStats).map((type) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{leaveTypeStats[type].taken}</td>
              <td>
                {leaveBalances[type] !== undefined
                  ? leaveBalances[type] - leaveTypeStats[type].taken
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Status Distribution – {selectedMonth}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LeaveHistory;
