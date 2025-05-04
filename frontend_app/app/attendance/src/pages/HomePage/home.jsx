// src/pages/HomePage/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/images/logo.png';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="home-page">
      <div className={`intro-container ${showContent ? 'intro--moved' : ''}`}>
        <img
          src={logo}
          alt="Hudoor Logo"
          className="intro-logo"
          onClick={() => setShowContent(true)}
        />
      </div>

      {showContent && (
        <div className="home-content">
          <section className="home-info">
            <h1 className="home-title">ATTENDANCE</h1>
            <p className="home-tagline">Smart Attendance Tracking System</p>
            <p className="home-description">
              Hudoor is a digital platform for managing attendance in educational institutions.
              It helps students, teachers, and administration track attendance efficiently
              and in real-time.
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

          <button
            className="btn btn--link back-button"
            onClick={() => setShowContent(false)}
          >
            ⬆ Back to Logo
          </button>
        </div>
      )}
    </div>
);
}
