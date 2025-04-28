// src/components/TopBar.jsx
import React, { useState } from 'react';
import './TopBar.css';
import { FaCog, FaBell, FaUserCircle } from 'react-icons/fa';

function TopBar() {
  const [active, setActive] = useState('');

  const handleClick = (item) => {
    setActive(active === item ? '' : item);
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h2>VoltMatrix HRMS</h2>
      </div>
      <div className="topbar-right">
        <div className="topbar-icon" onClick={() => handleClick('settings')}>
          <FaCog />
          {active === 'settings' && <span className="topbar-text">Settings</span>}
        </div>
        <div className="topbar-icon" onClick={() => handleClick('notifications')}>
          <FaBell />
          {active === 'notifications' && <span className="topbar-text">Notifications</span>}
        </div>
        <div className="topbar-icon" onClick={() => handleClick('profile')}>
          <FaUserCircle />
          {active === 'profile' && <span className="topbar-text">Profile</span>}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
