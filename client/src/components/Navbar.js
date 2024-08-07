import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType'); // Assume 'userType' is stored in localStorage

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['Poppins']">
          <Link to="/">Smart Cab System</Link>  
        </div>
        <div className="">

        </div>
        <div className="space-x-4">

          {userType === 'user' && (
            <>
              <Link to="/trips" className="text-white hover:text-gray-400">Your Trips</Link>
              <button
                onClick={() => navigate('/create-trip')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create New Trip
              </button>
            </>
          )}
          {userType === 'driver' && (
            <>
              <Link to="/available-trips" className="text-white hover:text-gray-400">Available Trips</Link>
              <Link to="/driver-rides" className="text-white hover:text-gray-400">Driver Rides</Link>
            </>
          )}
          {(userType === 'user' || userType === 'driver') && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Log Out
            </button>
          )}
                    {(userType !== 'user' && userType !== 'driver') && (
                    <>
                    <Link to="/login" className="text-white hover:text-gray-400">User Login</Link>
                    <Link to="/driver-login" className="text-white hover:text-gray-400">Driver Login</Link>
                    </>

          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
