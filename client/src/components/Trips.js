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
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Trips</h2>
        <button
          onClick={() => navigate('/create-trip')} // Navigate to the create-trip page
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book New Trip
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th> {/* Added Time header */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trips.map(trip => (
            <tr key={trip._id}>
              <td className="px-6 py-4 whitespace-nowrap">{trip.origin}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.destination}</td>
              <td className="px-6 py-4 whitespace-nowrap">${trip.cost}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trip.time}</td> {/* Display time */}
              <td className="px-6 py-4 whitespace-nowrap">{trip.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {trip.status === 'pending' && (
                  <button
                    onClick={() => handleCancelTrip(trip._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
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
  );
}

export default Trips;
