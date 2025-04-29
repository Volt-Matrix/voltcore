import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
} from 'lucide-react';
import './Sidebar.css';

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };
  // Need Change: We can have single component do all the redering by using map method by passing list name and icon as props
  return (
    <div className="sidebar">
      <div className="sidebar-scroll">
        <NavLink to="/home" className="icon-button rpr">
          <Home size={32} />
          <span>Home</span>
        </NavLink>

        {/* Profile */}
        <div className="icon-button rpr" onClick={() => toggleMenu('profile')}>
          <User size={32} />
          <span>Profile</span>
          {
            <div className={`submenu ${openMenu === 'profile' ? 'open' : ''}`}>
              <div className="submenu__content ">
                <NavLink to="/profile/basic-details" className="submenu-link">
                  Basic Details
                </NavLink>
                <NavLink to="/profile/ProfileList" className="submenu-link">
                  ProfileList
                </NavLink>
                <NavLink to="/profile/experience" className="submenu-link">
                  Experience
                </NavLink>
                <NavLink to="/profile/contracts" className="submenu-link">
                  Contracts
                </NavLink>
                <NavLink to="/profile/documents" className="submenu-link">
                  Documents
                </NavLink>
                <NavLink to="/profile/reporting" className="submenu-link">
                  Reporting
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Inbox */}
        <div className="icon-button rpr" onClick={() => toggleMenu('inbox')}>
          <Inbox size={32} />
          <span>Inbox</span>
          {
            <div className={`submenu ${openMenu === 'inbox' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/inbox/messages" className="submenu-link">
                  Messages
                </NavLink>
                <NavLink to="/inbox/notifications" className="submenu-link">
                  Notifications
                </NavLink>
                <NavLink to="/inbox/announcements" className="submenu-link">
                  Announcements
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Teams */}
        <div className="icon-button rpr" onClick={() => toggleMenu('teams')}>
          <Users size={32} />
          <span>Teams</span>

          <div className={`submenu ${openMenu === 'teams' ? 'open' : ''}`}>
            <div className="submenu__content">
              <NavLink to="/teams/myteam" className="submenu-link">
                My Team
              </NavLink>
              <NavLink to="/teams/teamrequest" className="submenu-link">
                Team Requests
              </NavLink>
              <NavLink to="/teams/teamperformance" className="submenu-link">
                Team Performance
              </NavLink>
              <NavLink to="/teams/teamhierarchy" className="submenu-link">
                {' '}
                Team Hierarchy
              </NavLink>
            </div>
          </div>
        </div>

        {/* Organization */}
        <div className="icon-button rpr" onClick={() => toggleMenu('organization')}>
          <Building size={32} />
          <span>Org</span>
          {
            <div className={`submenu ${openMenu === 'organization' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/organization/chart" className="submenu-link">
                  Org Chart
                </NavLink>
                <NavLink to="/organization/units" className="submenu-link">
                  Business Units
                </NavLink>
                <NavLink to="/organization/policies" className="submenu-link">
                  Policies
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Performance */}
        <div className="icon-button rpr" onClick={() => toggleMenu('performance')}>
          <BarChart size={32} />
          <span>Performance</span>
          {
            <div className={`submenu ${openMenu === 'performance' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/performance/reviews" className="submenu-link">
                  Reviews
                </NavLink>
                <NavLink to="/performance/goals" className="submenu-link">
                  Goals
                </NavLink>
                <NavLink to="/performance/feedback" className="submenu-link">
                  Feedback
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Attendance */}
        <div className="icon-button rpr" onClick={() => toggleMenu('attendance')}>
          <CalendarDays size={32} />
          <span>Attendance</span>
          {
            <div className={`submenu ${openMenu === 'attendance' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/attendance/daily" className="submenu-link">
                  Daily Log
                </NavLink>
                <NavLink to="/attendance/summary" className="submenu-link">
                  Monthly Summary
                </NavLink>
                <NavLink to="/attendance/requests" className="submenu-link">
                  Attendance Requests
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Payroll */}
        <div className="icon-button rpr" onClick={() => toggleMenu('payroll')}>
          <Wallet size={32} />
          <span>Payroll</span>
          {
            <div className={`submenu ${openMenu === 'payroll' ? 'open' : ''}`}>
              <div className='submenu__content'>
                <NavLink to="/payroll/payslips" className="submenu-link">
                  Payslips
                </NavLink>
                <NavLink to="/payroll/statements" className="submenu-link">
                  Salary Statements
                </NavLink>
                <NavLink to="/payroll/benefits" className="submenu-link">
                  Benefits
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Leaves */}
        <div className="icon-button rpr" onClick={() => toggleMenu('leaves')}>
          <Plane size={32} />
          <span>Leaves</span>
          <div className={`submenu ${openMenu === 'leaves' ? 'open' : ''}`}>
              <div className='submenu__content'>
              <NavLink to="/leaves/apply" className="submenu-link">
                Apply Leave
              </NavLink>
              <NavLink to="/leaves/history" className="submenu-link">
                Leave History
              </NavLink>
              <NavLink to="/leaves/balance" className="submenu-link">
                Leave Balance
              </NavLink>
              <NavLink to="/leaves/list" className="submenu-link">
                Leave List
              </NavLink>
              <NavLink to="/leaves/data" className="submenu-link">
                Leave Data
              </NavLink>
            </div>
            </div>
          
        </div>
      </div>

      {/* Logout */}
      <div className="sidebar-logout">
        <NavLink to="/logout" className="icon-button rpr">
          <LogOut size={32} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
