import React, { useState } from 'react';
import './Register.css';
import { registerUser } from '../../api/services';

function Register() {
  const [registerData, setRegisterData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
  });

  const handleInput = (e) => {
    console.log('Register-->', e.target.name, e.target.value);
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegitserUser = () => {
    registerUser(registerData);
  };

  return (
    <div className="regis-container">
      <div className="left-content">
        <div className="branding">
          <h1 className="logo">COREVOLTMATRIX</h1>
          <h2>Welcomes You!</h2>
          <p>CoreVoltMatrix is a digital transformation partner helping businesses thrive through smart technology. Starting with Salesforce, we've grown to offer end-to-end digital solutions across industries. Our team of certified experts and innovators turns complex challenges into scalable results. With a mission to accelerate growth, we blend technical excellence and industry insight to transform how our clients work, compete, and succeed.

.</p>
        </div>
      </div>

      <div className="register-rest">
        <form className="reges-form">
          <legend>Register User</legend>
          <label htmlFor="first_name">First Name</label>
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            required
            maxLength={30}
            id="first_name"
            name="first_name"
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            required
            maxLength={30}
            id="last_name"
            name="last_name"
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            required
            maxLength={30}
            id="email"
            name="email"
          />
          <label htmlFor="phone">Phone</label>
          <input
            onChange={(e) => handleInput(e)}
            type="tel"
            required
            id="phone"
            name="phone"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            required
            id="password"
            name="password"
          />
          <label htmlFor="password2">Confirm Password</label>
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            required
            id="password2"
            name="password2"
          />
          <button
            type="submit"
            className="button-50"
            onClick={(e) => {
              e.preventDefault();
              handleRegitserUser();
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
