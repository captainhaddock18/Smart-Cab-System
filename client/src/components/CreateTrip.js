import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState(''); // State for time
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
      }
      , {
        headers: { Authorization: `Bearer ${token}` } // Ensure 'Bearer' is included
      });
      navigate('/trips');
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Create Trip</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Origin</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Time</label>
        <input
          type="time" // Use 'time' input type
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <button
        onClick={handleCreateTrip}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Create Trip
      </button>
    </div>
  );
}

export default CreateTrip;
