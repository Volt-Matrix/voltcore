import React, { useState } from 'react';
import '../index.css';
import axios from 'axios';

function Login() {
  const [loginData, setLoginIndata] = useState({
    userName: '',
    password: '',
  });

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginIndata((prev) => ({ ...prev, [name]: value }));
  };

  const getCsrfToken = async () => {
    try {
      const res = await axios.get('http://localhost:8000/csrf/', {
        withCredentials: true,
      });
      const data = res.data;
      console.log("CSRF Token:", data.csrftoken);
      return data.csrftoken;
    } catch (error) {
      console.error("Failed to get CSRF token:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const csrf = await getCsrfToken();
      const response = await axios.post('http://localhost:8000/login/', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        withCredentials: true,
      });
      console.log("✅ Login successful:", response.data);
      alert("Login successful!");

      // 🔍 AUTH TEST AFTER LOGIN
      axios.post("http://localhost:8000/test/", {}, {
        withCredentials: true,
      })
      .then(res => console.log("✅ Authenticated as:", res.data))
      .catch(err => console.error("❌ Not authenticated", err.response?.data || err.message));

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Check console for details.");
    }
  };

  const handleTestAuth = async () => {
    try {
      const csrf = await getCsrfToken();
      const response = await axios.post('http://localhost:8000/test/', {}, {
        headers: { 'X-CSRFToken': csrf },
        withCredentials: true,
      });
      console.log("Authenticated response:", response.data);
      alert("Authenticated successfully!");
    } catch (error) {
      console.error("Authentication test failed:", error.response?.data || error.message);
      alert("Not authenticated.");
    }
  };

  const handleLogout = async () => {
    try {
      const csrf = await getCsrfToken();
      await axios.post('http://localhost:8000/logout/', {}, {
        headers: { 'X-CSRFToken': csrf },
        withCredentials: true,
      });
      console.log("Logged out successfully.");
      alert("Logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="title">Rapid HRMS</h2>
        <div className="login-form">
          <label>Username</label>
          <input
            type="text"
            name="userName"
            value={loginData.userName}
            onChange={handleLoginInput}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginInput}
          />

          <button onClick={handleLogin}>Login</button>
          <button onClick={handleTestAuth}>Test</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
