import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../component/Navbar';
import logout from '../../regestration/logoutPage';
import { fetchReports } from '../../../utilitis/api_request';
import './StudentDashboard.css';

export default function StudentDashboard({ user }) {
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Fetch attendance report for the logged-in student
  useEffect(() => {
    fetchReports()
      .then((data) => {
        const report = data.find((report) => report.student === user.id);
        if (report) {
          setAttendanceStatus(report.attendance_status);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching reports:', error);
        setLoading(false);
      });
  }, [user.id]);

  // Show loading spinner
  if (loading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Main dashboard layout
  return (
    <>
      <Navbar />
      <main className="student-dashboard">
        <header className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome, <strong>{user.username}</strong>!</p>
        </header>

        <section className="attendance-section">
          <h3>Today's Attendance Status:</h3>
          <p className={`status-message ${attendanceStatus === 'Present' ? 'present' : 'absent'}`}>
            {attendanceStatus === 'Present'
              ? 'You are marked as Present today.'
              : 'You are marked as Absent today.'}
          </p>
          <p className="status-note">
            {attendanceStatus === 'Present'
              ? 'Great job! Keep up the great attendance! 👏'
              : 'Please submit a valid excuse to the administrator within two days.'}
          </p>
        </section>

        <section className="dashboard-actions">
          <button onClick={() => navigate('/logout')} className="btn logout">
            Logout
          </button>
        </section>
      </main>
    </>
  );
}
