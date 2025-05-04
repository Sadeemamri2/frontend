// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f4ff' }}>
      <h2>Hudoor System</h2>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/teacher-dashboard">Teacher Dashboard</Link></li>
        <li><Link to="/student-dashboard">Student Dashboard</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>
  );
}
