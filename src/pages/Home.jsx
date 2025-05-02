import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import ApplyLeave from "../pages/leaves/ApplyLeave";
import InboxNotifications from "../pages/Inbox/InboxNotifications";
import AddTaskForm from "../pages/Teams/AddTaskForm";
import Calendar from "react-calendar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "react-calendar/dist/Calendar.css";
import "./Home.css";

function Home() {
  const [time, setTime] = useState(new Date());
  const username = localStorage.getItem("username") || "User";
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("birthday");
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const moodDates = [
    { label: "Tue 22", emoji: "😊" },
    { label: "Wed 23", emoji: "😐" },
    { label: "Thu 24", emoji: "😄" },
    { label: "Fri 25", emoji: "😁" },
    { label: "Sat 26", emoji: "😴" }
  ];

  const holidayDates = [
    { date: new Date(2025, 0, 1), label: "New Year's Day" },
    { date: new Date(2025, 4, 1), label: "Labour Day" },
    { date: new Date(2025, 11, 25), label: "Christmas Day" }
  ];

  const birthdayList = [
    { name: "Anika Sharma", date: "April 25" },
    { name: "Rahul Verma", date: "May 1" }
  ];

  const anniversaryList = [
    { name: "Meera Iyer", date: "April 25" },
    { name: "Vikram Patel", date: "May 3" }
  ];

  const data = [
    { name: "Jan", Leaves: 20 },
    { name: "Feb", Leaves: 12 },
    { name: "Mar", Leaves: 18 },
    { name: "Apr", Leaves: 25 },
    { name: "May", Leaves: 10 }
  ];

  const taskProgress = 70;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getTileClassName = ({ date }) => {
    const isHoliday = holidayDates.some(
      (holiday) =>
        date.getDate() === holiday.date.getDate() &&
        date.getMonth() === holiday.date.getMonth() &&
        date.getFullYear() === holiday.date.getFullYear()
    );
    return isHoliday ? "custom-holiday-highlight" : null;
  };

  const getTileContent = ({ date }) => {
    const holiday = holidayDates.find(
      (holiday) =>
        date.getDate() === holiday.date.getDate() &&
        date.getMonth() === holiday.date.getMonth() &&
        date.getFullYear() === holiday.date.getFullYear()
    );
    return holiday ? (
      <div className="calendar-tooltip">
        <span className="holiday-dot" title={holiday.label}></span>
      </div>
    ) : null;
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + 3 < moodDates.length) setStartIndex(startIndex + 1);
  };

  return (
    <>
      <TopBar />
      <div className="home-container">
        <Sidebar />
        <div className="main-content">
          <div className="greeting-section">
            <h2>Hello, {username} 👋</h2>
            <p>Welcome back to VoltMatrix HR</p>
            <p className="clock">{time.toLocaleTimeString()}</p>
          </div>

          <div className="dashboard-box-row">
            <div className="grid-box">
              <h3>📊 Leave Trend</h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Leaves" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid-box">
              <h3>📌 Task Completion</h3>
              <div className="progress-bar" style={{ width: `${taskProgress}%` }}>
                {taskProgress}%
              </div>
            </div>

            <div className="grid-box">
              <h3>🔔 Notifications</h3>
              <ul className="notifications">
                <li>📌 HR Policy updated - April 25</li>
                <li>🎉 Employee of the Month: Rahul S</li>
                <li>📣 Townhall on May 3rd - 10:00 AM</li>
              </ul>
            </div>

            <div className="grid-box">
              <h3>⚙️ Quick Actions</h3>
              <div className="action-buttons">
                <button onClick={() => setShowLeaveModal(true)}>Apply Leave</button>
                <button onClick={() => setShowTaskModal(true)}>Add Task</button>
                <button onClick={() => setShowAlertModal(true)}>View Alerts</button>
              </div>
            </div>
          </div>

          <div className="events-leave-section">
            {/* Events Column */}
            <div className="events-column">
              <div className="events-header">
                <h3>Events</h3>
                <a href="#">View All</a>
              </div>
              <div className="tab-buttons">
                <button className={activeTab === "birthday" ? "active-tab" : ""} onClick={() => setActiveTab("birthday")}>
                  Birthday
                </button>
                <button className={activeTab === "anniversary" ? "active-tab" : ""} onClick={() => setActiveTab("anniversary")}>
                  Work Anniversary
                </button>
              </div>
              <ul className="event-list">
                {(activeTab === "birthday" ? birthdayList : anniversaryList).map((event, index) => (
                  <li key={index}>📍 {event.name} - {event.date}</li>
                ))}
              </ul>

              <div className="holiday-preview">
                <div className="holiday-header">
                  <h4>Holidays of 2025</h4>
                  <a href="#">View All</a>
                </div>
                <Calendar
                  onChange={setCalendarDate}
                  value={calendarDate}
                  tileClassName={getTileClassName}
                  tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
                  tileContent={getTileContent}
                />
                <div className="holiday-notes">
                  <p><span className="holiday-dot"></span> Company holiday</p>
                  <p style={{ color: "red" }}>🚫 Weekends are disabled for leave requests.</p>
                </div>
              </div>
            </div>

            {/* Leave Balance Column */}
            <div className="leave-column">
              <div className="leave-header">
                <h3>Leave Balance</h3>
                <button className="apply-leave" onClick={() => setShowLeaveModal(true)}>Apply For Leave</button>
              </div>
              <div className="leave-balance-cards">
                <div className="leave-card"><span>Casual Leave</span><strong>NA/NA</strong></div>
                <div className="leave-card"><span>Sick Leave</span><strong>NA/NA</strong></div>
                <div className="leave-card"><span>Vacation Leave</span><strong>NA/NA</strong></div>
              </div>
            </div>

            {/* Attendance Column */}
            <div className="attendance-column">
              <p>🌈 Every great day starts with a single punch.</p>
              <p><strong>{time.toDateString()}</strong></p>
              <p><small>Shift Timing - (09:30 - 17:30)</small></p>
              <p><strong>Check In</strong><br />{time.toLocaleTimeString()}</p>
              <p><strong>Check Out</strong><br />--:--</p>
              <p><strong>Total Hours</strong><br />00h : 00m</p>
              <button className="check-out-btn">Check Out</button>

              {/* Mood Tracker */}
              <div className="mood-section">
                <h4>How Are You Feeling Today?</h4>
                <div className="mood-days-wrapper">
                  <button className="mood-nav-btn" onClick={handlePrev}>&lt;</button>
                  <div className="mood-days">
                    {moodDates.slice(startIndex, startIndex + 3).map((date, index) => (
                      <div key={index}>
                        <div style={{ fontSize: "20px" }}>{date.emoji}</div>
                        <div>{date.label}</div>
                      </div>
                    ))}
                  </div>
                  <button className="mood-nav-btn" onClick={handleNext}>&gt;</button>
                </div>
              </div>

              <div className="attendance-streak">
                <strong>Attendance Streak</strong>
                <p>Level 1</p>
                <p>You're 20 day(s) away from a 20-day streak!</p>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                </div>
                <p>0/20</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLeaveModal && (
        <div className="modal">
          <div className="modal-content">
            <ApplyLeave />
            <button className="close-btn" onClick={() => setShowLeaveModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <AddTaskForm />
            <button className="close-btn" onClick={() => setShowTaskModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showAlertModal && (
        <div className="modal">
          <div className="modal-content">
            <InboxNotifications />
            <button className="close-btn" onClick={() => setShowAlertModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
