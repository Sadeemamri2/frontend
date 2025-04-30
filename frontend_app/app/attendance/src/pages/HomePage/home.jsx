import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <img src="/logo.png" alt="Logo" className="home-logo" />
      <h1 className="home-title">Hudoor</h1>
      <p className="home-tagline">Smart Attendance Tracking System</p>
      <p className="home-description">
        Hudoor is a digital platform for managing attendance in educational institutions. It helps students, teachers, and administration track attendance efficiently and in real-time.
      </p>
      <div className="home-roles">
        <p>🎓 Students</p>
        <p>👩‍🏫 Teachers</p>
        <p>🏢 Administration</p>
      </div>
    </div>
  );
}
