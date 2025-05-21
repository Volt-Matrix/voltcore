// src/components/TopBar.jsx
import React, { useEffect, useState } from 'react';
import './TopBar.css';
import { FaCog, FaBell, FaUserCircle } from 'react-icons/fa';
import cvmlogo from '../../public/cvmlogo.png';
import { useAuth } from '../CustomHook/useAuth';
function TopBar() {
  const [active, setActive] = useState('');
  const [userName, setUserName] = useState('');
  const auth = useAuth();
  const handleClick = (item) => {
    setActive(active === item ? '' : item);
  };
  useEffect(() => {
    console.log(localStorage.getItem('userName'));
    setUserName(localStorage.getItem('userName'));
  }, []);
  console.log(name);
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="cvm-brand">
          <img src={cvmlogo} alt="core-volt-matrix logo" />
        </div>
        <h2>Core volt matrix</h2>
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
          {active === 'profile' && <span className="topbar-text">{userName}</span>}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
