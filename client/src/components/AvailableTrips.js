import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AvailableTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/trips/available', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter out trips with missing origin, destination, or time
        const validTrips = response.data.filter(trip =>
          trip.origin && trip.destination && trip.time
        );

        setTrips(validTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleAcceptTrip = async (tripId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3002/trips/${tripId}/assign`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the local state to reflect the assignment
      setTrips(trips.filter(trip => trip._id !== tripId));
    } catch (error) {
      console.error('Error accepting trip:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white flex items-center justify-center">
      <div className="p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-8 text-center">
          Available Trips
        </h2>
        <ul className="space-y-6">
          {trips.length > 0 ? (
            trips.map(trip => (
              <li key={trip._id} className="bg-gray-700 p-6 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <p className="text-lg mb-1"><strong>Origin:</strong> {trip.origin}</p>
                  <p className="text-lg mb-1"><strong>Destination:</strong> {trip.destination}</p>
                  <p className="text-lg mb-1"><strong>Time:</strong> {trip.time}</p>
                  <p className="text-lg mb-1"><strong>Cost:</strong> ${trip.cost}</p>
                </div>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                  onClick={() => handleAcceptTrip(trip._id)}
                >
                  Accept
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-lg text-gray-400">No available trips</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AvailableTrips;
