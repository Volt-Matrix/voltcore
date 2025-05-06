// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // optional: for styling

const ProfileNavbar = () => {
  const location = useLocation();

  const navItems = [
    { to: '/basic-details', label: 'Profile' },
    { to: '/education', label: 'Educational Documents' },
    { to: '/experiences', label: 'Experience' },
    { to: '/bank', label: 'Bank Details' },
    { to: '/on-board', label: 'Onboard' },
    { to: '/onboard-task', label: 'OnBoarding-Tasks' },
  ];

  return (
    <div className="navbar">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default ProfileNavbar;
