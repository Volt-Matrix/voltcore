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
  Network,
} from 'lucide-react';
import './Sidebar.css';
import { useAuth } from '../CustomHook/useAuth';
function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const auth = useAuth()
  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };
  // Need Change: We can have single component do all the redering by using map method by passing list name and icon as props
  return (
    <div className="sidebar">
      <div className="sidebar-scroll">
        <div className="icon-button rpr">
          <div className="navbtns">
            <NavLink to="/home" className="navbtns">
              <Home size={32} />
              <span>Home</span>
            </NavLink>
          </div>
        </div>

        {/* Profile */}
        <div className="icon-button rpr" onClick={() => toggleMenu('profile')}>
          <div className="navbtns">
            <User size={32} />
            <span>Profile</span>
          </div>
          {
            <div className={`submenu ${openMenu === 'profile' ? 'open' : ''}`}>
              <div className="submenu__content ">
                <NavLink to="/profile/basic-details" className="submenu-link">
                  Basic Details
                </NavLink>
                <NavLink to="/profile/ProfileList" className="submenu-link">
                  ProfileList
                </NavLink>
                {/* <NavLink to="/profile/experience" className="submenu-link">
                  Experience
                </NavLink> */}
                {/* <NavLink to="/profile/contracts" className="submenu-link">
                  Contracts
                </NavLink>
                <NavLink to="/profile/documents" className="submenu-link">
                  Documents
                </NavLink>
                <NavLink to="/profile/reporting" className="submenu-link">
                  Reporting
                </NavLink> */}
                <NavLink to="/teams/teamhierarchy" className="submenu-link">
                  {' '}
                  Team Hierarchy
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Assets */}
        <div className="icon-button" onClick={() => toggleMenu('assets')}>
          <div className="navbtns">
            <BarChart />
            <span>Assets</span>
          </div>
          {
            <div className={`submenu ${openMenu === 'assets' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/assets" className="submenu-link">
                  My Assets
                </NavLink>
                <NavLink to="/assets/dashboard" className="submenu-link">
                  Assets Category
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Organization */}
        <div className="icon-button rpr" onClick={() => toggleMenu('organization')}>
          <div className="navbtns">
            <Building size={32} />
            <span>Org</span>
          </div>
          {
            <div className={`submenu ${openMenu === 'organization' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/organization/chart" className="submenu-link">
                  Org Chart
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Attendance */}
        <div className="icon-button rpr" onClick={() => toggleMenu('attendance')}>
          <div className="navbtns">
            <CalendarDays size={32} />
            <span>Attendance</span>
          </div>
          {
            <div className={`submenu ${openMenu === 'attendance' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/attendance/daily" className="submenu-link">
                  Daily Log
                </NavLink>
                <NavLink to="/Attendance/AttendanceHistory" className="submenu-link">
                  Attendance History
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Payroll */}
        <div className="icon-button rpr" onClick={() => toggleMenu('payroll')}>
          <div className="navbtns">
            <Wallet size={32} />
            <span>Payroll</span>
          </div>
          {
            <div className={`submenu ${openMenu === 'payroll' ? 'open' : ''}`}>
              <div className="submenu__content">
                <NavLink to="/payroll/emp/payslips" className="submenu-link">
                  My Payslips
                </NavLink>
                <NavLink to="/payroll/hr/payslips" className="submenu-link">
                  HR Admin Payslips
                </NavLink>
              </div>
            </div>
          }
        </div>

        {/* Leaves */}
        <div className="icon-button rpr" onClick={() => toggleMenu('leaves')}>
          <div className="navbtns">
            <Plane />
            <span>Leaves</span>
          </div>

          <div className={`submenu ${openMenu === 'leaves' ? 'open' : ''}`}>
            <div className="submenu__content">
              <NavLink to="/leaves/dashboard" className="submenu-link">
                Leave Dashboard
              </NavLink>
              <NavLink to="/leavemanagement/leavemanagement" className="submenu-link">
                Leave Management
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="sidebar-logout">
        <NavLink to="#" className="icon-button rpr" onClick={()=>{auth.logout()}}>
          <LogOut size={32} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
