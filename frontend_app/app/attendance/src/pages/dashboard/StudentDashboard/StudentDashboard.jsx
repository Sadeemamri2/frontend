// import React, { useContext } from 'react';
import {useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../../context/AuthContext';
import ProtectedRoute from '../../../component/ProtectedRoute';
import Navbar from '../../../component/Navbar';
// import Loading from '../../../component/Loading';
import './StudentDashboard.css';

export default function StudentDashboard({user}) {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="student-dashboard">
        <header>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user.username}!</p>
        </header>

        <section className="actions">
          <button onClick={() => navigate('/attendance')} className="btn">
            View Attendance
          </button>
          <button onClick={() => navigate('/activities')} className="btn">
            View Activities
          </button>
        </section>
      </div>
    </>
  );
}
