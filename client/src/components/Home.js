import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white">
      <div className="text-center p-8 bg-white bg-opacity-10 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-6 animate-bounce">Welcome to the Smart Cab System</h1>
        <p className="text-2xl mb-8">Manage your trips efficiently and easily.</p>
        <div className="flex space-x-6 justify-center">
          <a href="/register" className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition transform hover:scale-105">
            Register
          </a>
          <a href="/login" className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-900 transition transform hover:scale-105">
            Login
          </a>
        </div>
      </div>

      <div className="mt-16 p-8 bg-white bg-opacity-10 rounded-lg shadow-lg text-center max-w-4xl">
        <h2 className="text-4xl font-semibold mb-4">How Smart Cab System Helps You</h2>
        <p className="text-lg mb-4">
          Our system is designed to make your daily commute as seamless and stress-free as possible. Here’s how:
        </p>
        <ul className="text-left list-disc list-inside">
          <li className="mb-2">
            <strong>Efficient Booking:</strong> Easily book a cab with just a few clicks.
          </li>
          <li className="mb-2">
            <strong>Real-Time Tracking:</strong> Track your cab in real-time to know exactly when it will arrive.
          </li>
          <li className="mb-2">
            <strong>Transparent Pricing:</strong> Get clear and upfront pricing for your trips.
          </li>
          <li className="mb-2">
            <strong>Safety First:</strong> All our drivers are thoroughly vetted to ensure your safety.
          </li>
          <li className="mb-2">
            <strong>24/7 Support:</strong> Our support team is always here to help you with any issues or questions.
          </li>
        </ul>
        <p className="text-lg mt-4">
          Experience the ease and convenience of a smart cab system tailored to meet your daily needs.
        </p>
      </div>

      <div className="mt-16 p-8 bg-white bg-opacity-10 rounded-lg shadow-lg text-center max-w-4xl">
        <h2 className="text-4xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2">Easy Navigation</h3>
            <p>Our intuitive interface makes it simple to navigate and manage your trips.</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2">Multiple Payment Options</h3>
            <p>Pay with your preferred method, including credit cards, debit cards, and digital wallets.</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2">Instant Notifications</h3>
            <p>Receive instant updates about your trip status, driver details, and more.</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2">Reliable Drivers</h3>
            <p>Our drivers are trained and reliable, ensuring a safe and comfortable ride.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
