import React, { useState } from 'react';
import axios from 'axios';

const DriverRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/drivers/register', {
        username,
        password,
        vehicleNumber,
      });
      alert('Driver registered successfully!');
    } catch (error) {
      console.error('Error registering driver:', error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 font-['Roboto']">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full">

      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['Poppins']">Driver Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 text-lg">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-3 border border-gray-600 rounded w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-lg">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-3 border border-gray-600 rounded w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-lg">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="mmt-1 p-3 border border-gray-600 rounded w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>

    </div>
    </div>
  );
};

export default DriverRegister;
