# Smart Cab System

Welcome to the Smart Cab System! 🚖✨

The Smart Cab System is a modern, feature-rich application designed to streamline the process of booking and managing cab rides. It provides an intuitive interface for both users and drivers, leveraging real-time data to enhance the overall experience.

## Features

### For Users:
- **Register & Login:** Securely register and log in to your account.
- **Create & Manage Trips:** Easily create new trips by specifying origin, destination, and time. View and manage your trip details.
- **Available Trips:** Browse and select from available trips posted by drivers.

### For Drivers:
- **Login:** Access your driver account with secure login credentials.
- **Available Rides:** View a list of available rides you can accept.
- **Manage Rides:** Accept or cancel rides, and keep track of your current bookings.

## Technology Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **API Calls:** Axios

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (for database)
- Git

### Clone the Repository
git clone https://github.com/yourusername/Smart-Cab-System.git
cd Smart-Cab-System

## Accessing the Application

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the Smart Cab System.

## API Endpoints

### Users
- `POST /register` - Register a new user
- `POST /login` - Log in and receive a JWT token
- `POST /trips` - Create a new trip
- `GET /trips` - Fetch all trips created by the user

### Drivers
- `POST /drivers/login` - Driver login
- `GET /drivers/bookings` - Fetch all bookings for the driver
- `PUT /trips/:tripId/assign` - Assign a trip to the driver
- `PUT /trips/:tripId/cancel` - Cancel a trip

