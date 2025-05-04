import React, { useState } from 'react';
import { login, getProfile } from '../../utilitis/api_request.js';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function LoginPage({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login({ username, password });
      const profile = await getProfile();
      setUser(profile);  // Set user state
      localStorage.setItem('user', JSON.stringify(profile));  // Store profile in localStorage

      const role = profile.role;
      console.log('console log for profile.role:', role);
      navigate(`/dashboard`); // Redirect based on role
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="btn btn--primary">Login</button>
        <button className="btn btn--primary" onClick={handleSignUp}>Sign up</button>
      </form>

    </div>
  );
}
