import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3002/login', null, {
        params: { username, password },
      });
      localStorage.setItem('token', response.data);
      localStorage.setItem('username', username);
      localStorage.setItem('userType', 'user');
      navigate('/trips');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 font-['Roboto']">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['Poppins']">
          Login
        </h2>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-3 border border-gray-600 rounded w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-3 border border-gray-600 rounded w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Login
        </button>
        <div className="mt-6 text-center">
          <p className="text-gray-300">New to our service?</p>
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-600 font-semibold"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
