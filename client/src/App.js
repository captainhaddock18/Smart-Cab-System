import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Register from './components/Register';
// import Login from './components/auth/Login';
// import Dashboard from './components/Dashboard';
// import UsernameCheck from './components/UsernameCheck';
import Login from './components/Login';
import Trips from './components/Trips';
import CreateTrip from './components/CreateTrip';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import DriverRegister from './components/DriverRegister';
import DriverLogin from './components/DriverLogin';
import DriverRides from './components/DriverRides';
import AvailableTrips from './components/AvailableTrips';

const App = () => (
  <BrowserRouter>
      {/* <div className="container mx-auto p-4"> */}
      <Navbar/>
    <Routes>
    <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/driver-register" element={<DriverRegister />} />
          <Route path="/driver-login" element={<DriverLogin />} />
          <Route path="/driver-rides" element={<DriverRides />} />
          <Route path="/available-trips" element={<AvailableTrips />} />
    </Routes>
    {/* </div> */}
  </BrowserRouter>
);

export default App;
