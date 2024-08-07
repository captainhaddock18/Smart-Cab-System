import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect to the login page or home page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
