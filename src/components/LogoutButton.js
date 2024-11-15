import React, { useState, useRef, useEffect } from 'react';
import './LogoutButton.css';

function LogoutButton({ onLogout, username }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="account-menu" ref={menuRef}>
      <button className="account-button" onClick={handleMenuClick}>
        <div className="account-initial">{username.charAt(0).toUpperCase()}</div>
      </button>
      
      {showMenu && (
        <div className="menu-dropdown">
          <div className="menu-header">
            <div className="menu-initial">{username.charAt(0).toUpperCase()}</div>
            <div className="menu-username">{username}</div>
          </div>
          <button className="menu-item logout-item" onClick={onLogout}>
            <span className="logout-icon">⇥</span>
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}

export default LogoutButton;
