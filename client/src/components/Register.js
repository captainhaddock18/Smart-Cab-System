import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3002/register', null, {
        params: { username, password },
      });
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 font-['Roboto'] text-white flex items-center justify-center">
      <div className="max-w-md p-8 bg-gray-900 bg-opacity-80 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-teal-400 to-green-500 mb-6">Register</h2>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 p-3 border border-gray-700 rounded w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 p-3 border border-gray-700 rounded w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          onClick={handleRegister}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
