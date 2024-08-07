import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Trips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/trips', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleCancelTrip = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3002/trips/${tripId}`, 
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update the local state to reflect the cancellation
      setTrips(trips.map(trip =>
        trip._id === tripId ? { ...trip, status: 'cancelled' } : trip
      ));
    } catch (error) {
      console.error('Error canceling trip:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 font-['Roboto'] text-white">
      <div className="max-w-6xl mx-auto p-6 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Your Trips</h2>
          <button
            onClick={() => navigate('/create-trip')} // Navigate to the create-trip page
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-transform transform hover:scale-105"
          >
            Create New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Origin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {trips.map(trip => (
                <tr key={trip._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{trip.origin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trip.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${trip.cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trip.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{trip.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trip.status === 'pending' && (
                      <button
                        onClick={() => handleCancelTrip(trip._id)}
                        className="text-red-400 hover:text-red-600 font-semibold transition-transform transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Trips;
