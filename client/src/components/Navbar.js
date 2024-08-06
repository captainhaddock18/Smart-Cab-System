import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Smart Cab System</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/trips" className="text-white hover:text-gray-400">Trips</Link>
          <button
          onClick={() => navigate('/create-trip')} // Navigate to the create-trip page
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book New Trip
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
