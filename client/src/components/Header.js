import React from 'react';
import './Header.css';

function Header() {
  return (
    <header>
      <div className="logo">Dashboard</div>
      <button className="user-button">Account Profile</button>
    </header>
  );
}

export default Header;