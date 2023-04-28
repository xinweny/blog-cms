import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>Sign Out</button>
  )
}

export default LogoutButton;