import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  User,
  Inbox,
  Users,
  Building,
  BarChart,
  CalendarDays,
  Wallet,
  Plane,
  LogOut,
  Network,
  BarChart2,
} from "lucide-react";
import "./Sidebar.css";


function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-scroll">
        <NavLink to="/home" className="icon-button">
          <Home size={32} />
          <span>Home</span>
        </NavLink>

        {/* Profile */}
        <div className="icon-button" onClick={() => toggleMenu("profile")}>
          <User size={32} />
          <span>Profile</span>
          {openMenu === "profile" && (
            <div className="submenu">
              <NavLink to="/profile/basic-details" className="submenu-link">Basic Details</NavLink>
              <NavLink to="/profile/ProfileList" className="submenu-link">ProfileList</NavLink>
              <NavLink to="/profile/experience" className="submenu-link">Experience</NavLink>
              <NavLink to="/profile/contracts" className="submenu-link">Contracts</NavLink>
              <NavLink to="/profile/documents" className="submenu-link">Documents</NavLink>
              <NavLink to="/profile/reporting" className="submenu-link">Reporting</NavLink>
            </div>
          )}
        </div>

        {/* Inbox */}
        <div className="icon-button" onClick={() => toggleMenu("inbox")}>
          <Inbox size={32} />
          <span>Inbox</span>
          {openMenu === "inbox" && (
            <div className="submenu">
              <NavLink to="/inbox/messages" className="submenu-link">Messages</NavLink>
              <NavLink to="/inbox/notifications" className="submenu-link">Notifications</NavLink>
              <NavLink to="/inbox/announcements" className="submenu-link">Announcements</NavLink>
            </div>
          )}
        </div>

        {/* Teams */}
        <div className="icon-button" onClick={() => toggleMenu("teams")}>
          <Users size={32} />
          <span>Teams</span>
          {openMenu === "teams" && (
            <div className="submenu">
              <NavLink to="/teams/myteam" className="submenu-link">My Team</NavLink>
              <NavLink to="/teams/teamrequest" className="submenu-link">Team Requests</NavLink>
              <NavLink to="/teams/teamperformance" className="submenu-link">Team Performance</NavLink>
              <NavLink to="/teams/teamhierarchy" className="submenu-link"> Team Hierarchy</NavLink>

            </div>
          )}
        </div>

        
        {/* Assets */}
        <div className="icon-button" onClick={() => toggleMenu("assets")}>
          <BarChart size={32} />
          <span>Assets</span>
          {openMenu === "assets" && (
            <div className="submenu">
              <NavLink to="/assets" className="submenu-link">Assets</NavLink>
            </div>
          )}
        </div>


        {/* Attendance */}
        <div className="icon-button" onClick={() => toggleMenu("Attendance")}>
          <BarChart2 size={32} />
          <span>Attendance History</span>
          {openMenu === "Attendance" && (
            <div className="submenu">
              <NavLink to="/Attendance/AttendanceHistory" className="submenu-link">Attendance History</NavLink>
            </div>
          )}
        </div>

        {/* Payroll */}
        <div className="icon-button" onClick={() => toggleMenu("payroll")}>
          <Wallet size={32} />
          <span>Payroll</span>
          {openMenu === "payroll" && (
            <div className="submenu">
              <NavLink to="/payroll/payslips" className="submenu-link">Payslips</NavLink>
              <NavLink to="/payroll/statements" className="submenu-link">Salary Statements</NavLink>
              <NavLink to="/payroll/benefits" className="submenu-link">Benefits</NavLink>
            </div>
          )}
        </div>

        {/* Leaves */}
        <div className="icon-button" onClick={() => toggleMenu("leaves")}>
          <Plane size={32} />
          <span>Leaves</span>
          {openMenu === "leaves" && (
            <div className="submenu">
              <NavLink to="/leaves/apply" className="submenu-link">Apply Leave</NavLink>
              <NavLink to="/leaves/list" className="submenu-link">Leave List</NavLink>
              <NavLink to="/leaves/dashboard" className="submenu-link">Leave Dashboard</NavLink>
            </div>
          )}
        </div>
        {/* LeaveManagement */}
        <div className="icon-button" onClick={() => toggleMenu("leavemanagement")}>
          <Plane size={32} />
          <span>LeaveManagement</span>
          {openMenu === "leavemanagement" && (
            <div className="submenu">
              <NavLink to="/leavemanagement/leavemanagement" className="submenu-link">Leave Management</NavLink>
            </div>
          )}
        </div>
        {/* Organization */}
        <div className="icon-button" onClick={() => toggleMenu("Organization")}>
          <Network size={32} />
          <span>Organization Hierarchy</span>
          {openMenu === "Organization" && (
            <div className="submenu">
              <NavLink to="/Organization/OrganizationHierarchy" className="submenu-link">OrganizationHierarchy</NavLink>
            </div>
          )}
        </div>
        
      </div>
      
      {/* Logout */}
      <div className="sidebar-logout">
        <NavLink to="/logout" className="icon-button">
          <LogOut size={32} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
