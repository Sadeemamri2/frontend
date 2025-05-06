// src/pages/HomePage/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/images/logo.png';

export default function Home() {
  return (
    <div className="main-container">
      <div className="home-card">
        <img src={logo} alt="Hudoor Logo" className="intro-logo" />
        <h1 className="home-title">ATTENDANCE</h1>
        <p className="home-tagline">Smart Attendance Tracking System</p>

        <section className="home-description-section">
          <p className="home-description">
            Hudoor is a digital platform for managing attendance in educational institutions.
            It helps students, teachers, and administration track attendance efficiently and in real-time.
          </p>
        </section>

        <section className="home-roles">
          <h2 className="roles-header">Three main user roles:</h2>
          <ul className="roles-list">
            <li>🎓 Student</li>
            <li>👩‍🏫 Teacher</li>
            <li>👩🏻‍💻 Attendance Officer</li>
          </ul>
        </section>

        <section className="auth-buttons">
          <Link to="/signup">
            <button className="btn btn--primary">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn btn--secondary">Login</button>
          </Link>
        </section>
      </div>
    </div>
  );
}
