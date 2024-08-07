import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverRides = () => {
  const [rides, setRides] = useState([]);
  const [cancellingRideId, setCancellingRideId] = useState(null); // Track the ride being cancelled

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/drivers/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRides(response.data);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, []);

  const handleCancelRide = async (rideId) => {
    try {
      const token = localStorage.getItem('token');
      setCancellingRideId(rideId); // Set the ride ID being cancelled
      await axios.put(`http://localhost:3002/drivers/bookings/${rideId}/cancel`, 
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update the local state to reflect the cancellation
      setRides(rides.map(ride =>
        ride._id === rideId ? { ...ride, status: 'cancelled' } : ride
      ));
    } catch (error) {
      console.error('Error canceling ride:', error);
      // Optionally reset cancellingRideId in case of error
    } finally {
      setCancellingRideId(null); // Reset after operation
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white flex items-center justify-center">
      <div className="p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-xl max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 mb-8 text-center">
          Your Rides
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Origin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {rides.length > 0 ? (
                rides.map(ride => (
                  <tr key={ride._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{ride.origin}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ride.destination}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${ride.cost}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{ride.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ride.status === 'assigned' ? (
                        cancellingRideId === ride._id ? (
                          <span className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancelling...</span>
                        ) : (
                          <button
                            onClick={() => handleCancelRide(ride._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                          >
                            Cancel
                          </button>
                        )
                      ) : (
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancelled</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-400">No rides available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverRides;
