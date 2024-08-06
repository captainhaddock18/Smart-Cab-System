import React from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Register from './components/Register';
// import Login from './components/auth/Login';
// import Dashboard from './components/Dashboard';
import UsernameCheck from './components/UsernameCheck';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/register" element={<Register/>} />
      <Route exact path="/login" element={<UsernameCheck/>} />
      {/* <Route exact path="/dashboard" element={<Dashboard/>} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
