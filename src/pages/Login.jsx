import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '123456') {
      // localStorage.setItem('isLoggedIn', 'true'); // ✅ set login flag
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="title">Rapid HRMS</h2>
        <div className="login-form">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
