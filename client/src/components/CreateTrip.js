import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleCreateTrip = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/trips',
        {
          username,
          time,
          origin,
          destination
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      navigate('/trips');
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 font-['Roboto'] text-white flex items-center justify-center">
      <div className="p-8 bg-gray-900 bg-opacity-80 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-6">
          Create Trip
        </h2>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-2 p-3 border border-gray-700 rounded w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter origin"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-2 p-3 border border-gray-700 rounded w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter destination"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-lg">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2 p-3 border border-gray-700 rounded w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          onClick={handleCreateTrip}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
        >
          Create Trip
        </button>
      </div>
    </div>
  );
}

export default CreateTrip;
