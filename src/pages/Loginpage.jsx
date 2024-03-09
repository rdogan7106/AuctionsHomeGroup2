/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../context/Context.jsx';
import { useNavigate } from 'react-router-dom';

function Loginpage() {
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login(username, password);
    if (loginSuccess) {
      console.log('Login successful');
      navigate('/');
    } else {
      alert('Login failed');
    }
  };

  return (
    <>
      <div className="bg"></div>

      <div className="form-signin">
        <h1 className="h3">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="..."
              required
            />
            <label htmlFor="floatingInput">Username:</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                value="1"
                name="remember_me"
                id="rememberMeSwitch"
              />
              <label className="form-check-label" htmlFor="rememberMeSwitch">
                Remember me
              </label>
            </div>
          </div>
          <button className="w-100 btn btn-lg" type="submit">
            Login
          </button>
        </form>
        <p className="copyright">&copy; 2021</p>
      </div>
    </>
  );
}

export default Loginpage;
