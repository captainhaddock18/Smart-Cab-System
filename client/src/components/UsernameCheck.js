import React, { useState } from 'react';
import axios from 'axios';

const UsernameCheck = () => {
  const [username, setUsername] = useState('');
  const [exists, setExists] = useState(null);

  const checkUsername = async () => {
    try {
      const res = await axios.get(`/api/check-username/${username}`);
      setExists(res.data.exists);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={checkUsername}>Check Username</button>
      {exists === true && <p>Username exists</p>}
      {exists === false && <p>Username does not exist</p>}
    </div>
  );
};

export default UsernameCheck;
