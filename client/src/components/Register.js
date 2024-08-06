import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  const { username, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', { username, email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder='Username' name="username" value={username} onChange={onChange} />
      <input type="email" placeholder='Email' name="email" value={email} onChange={onChange} />
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
