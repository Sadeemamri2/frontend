import React, { useState } from 'react';
import './Home.css';
import logo from '../../assets/images/logo.png';

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div>
      <div className={`intro-container ${showContent ? 'move-up' : ''}`}>
        <img
          src={logo}
          alt="Logo"
          className="intro-logo"
          onClick={() => setShowContent(true)}
        />
      </div>

      {showContent && (
        <div className="home-content">
          <div className="home-info">
            <h1 className="home-title">ATTENDANCE</h1>
            <p className="home-tagline">Smart Attendance Tracking System</p>
            <p className="home-description">
              Hudoor is a digital platform for managing attendance in educational institutions. It helps students, teachers, and administration track attendance efficiently and in real-time.
            </p>
          </div>

          <div className="home-roles">
            <p>Hudoor includes three main user roles for smart attendance management:</p>
            <p>🎓 Students</p>
            <p>👩‍🏫 Teachers</p>
            <p>👩🏻‍💻 Attendance Officer</p>
          </div>
          <button className="back-button" onClick={() => setShowContent(false)}>
            ⬆ Back to Logo
          </button>
        </div>
      )}
    </div>
  );
}
