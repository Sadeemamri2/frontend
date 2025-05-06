// src/pages/SignupPage/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, login } from '../../utilitis/api_request'; // أضف login هنا
import './style.css';

export default function SignupPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      // 1. سجل المستخدم
      const user = await signup({
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      // 2. سجل الدخول مباشرة
      const loginData = await login({
        username: form.username,
        password: form.password,
      });

      // 3. خزّن التوكن في localStorage
      localStorage.setItem('token', loginData.access);
      localStorage.setItem('user', JSON.stringify(user));  // Store profile in localStorage

      // 4. وجه المستخدم للداشبورد
      navigate(`/dashboard`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <p className="error">{error}</p>}

        <input
          name="username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Attendance Officer</option>
        </select>

        <button type="submit" className="btn btn--primary">Sign Up</button>
        <button type="button" onClick={() => navigate('/')} className="btn btn--secondary">
          Back to Home
        </button>
      </form>
    </div>
  );
}
