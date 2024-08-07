import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-['Roboto']">
      <div className="text-center p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg w-4/5 md:w-3/5">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['Poppins']">
          Welcome to the Smart Cab System
        </h1>
        <p className="text-xl mb-8">Manage your trips efficiently and easily.</p>
      </div>

      <div className="mt-16 p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center max-w-4xl w-full">
        <h2 className="text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600 font-['Poppins']">
          How We Help You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-3xl font-semibold mb-2 font-['Poppins']">For Drivers</h3>
            <ul className="text-left list-disc list-inside font-['Roboto']">
              <li className="mb-2"><strong>Flexible Schedule:</strong> Choose your own working hours and be your own boss.</li>
              <li className="mb-2"><strong>Higher Earnings:</strong> Get competitive rates and bonuses for peak hours.</li>
              <li className="mb-2"><strong>Driver Support:</strong> Access 24/7 support and resources for any help you need.</li>
              <li className="mb-2"><strong>Safety Measures:</strong> Get comprehensive safety features to ensure your well-being.</li>
            </ul>
            <a href="/driver-login" className="block bg-green-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-green-700 transition transform hover:scale-105">
              Driver Login
            </a>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-3xl font-semibold mb-2 font-['Poppins']">For Users</h3>
            <ul className="text-left list-disc list-inside font-['Roboto']">
              <li className="mb-2"><strong>Efficient Booking:</strong> Easily book a cab with just a few clicks.</li>
              <li className="mb-2"><strong>Real-Time Tracking:</strong> Track your cab in real-time to know exactly when it will arrive.</li>
              <li className="mb-2"><strong>Transparent Pricing:</strong> Get clear and upfront pricing for your trips.</li>
              <li className="mb-2"><strong>24/7 Support:</strong> Our support team is always here to help you with any issues or questions.</li>
            </ul>
            <a href="/login" className="block bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
              User Login
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center max-w-4xl w-full">
        <h2 className="text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['Poppins']">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <p className="text-xl mb-4 font-['Roboto']">"Smart Cab System has made my daily commute so much easier. I can book a ride in seconds and track it in real-time. Highly recommend!"</p>
            <p className="text-right font-semibold font-['Poppins']">- User Jane Doe</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <p className="text-xl mb-4 font-['Roboto']">"Being a driver with Smart Cab System has been a game-changer. I get to choose my own hours and earn more during peak times. The support team is also fantastic."</p>
            <p className="text-right font-semibold font-['Poppins']">- Driver John Smith</p>
          </div>
        </div>
      </div>

      <div className="mt-16 p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg text-center max-w-4xl w-full">
        <h2 className="text-4xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 font-['Poppins']">
          FAQs
        </h2>
        <div className="text-left space-y-4">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2 font-['Poppins']">How do I book a ride?</h3>
            <p className="font-['Roboto']">Simply log in to your user account, enter your trip details, and book a ride with a few clicks.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2 font-['Poppins']">How do I become a driver?</h3>
            <p className="font-['Roboto']">Sign up as a driver, complete the verification process, and start accepting rides immediately.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2 font-['Poppins']">Is there customer support available?</h3>
            <p className="font-['Roboto']">Yes, we offer 24/7 customer support for both users and drivers. You can reach out to us anytime for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
