import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../../context/AuthContext';
import ProtectedRoute from '../../../component/ProtectedRoute';
import Navbar from '../../../component/Navbar';
import Loading from '../../../component/Loading';
import './TeacherDashboard.css';

export default function TeacherDashboard({user}) {
  
  const navigate = useNavigate();

  // if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="teacher-dashboard">
        <header>
          <h1>Teacher Dashboard</h1>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout} className="btn logout">
            Logout
          </button>
        </header>

        <section className="actions">
          <button onClick={() => navigate('/lessons')} className="btn">
            Manage Lessons
          </button>
          <button onClick={() => navigate('/student-reports')} className="btn">
            View Student Reports
          </button>
        </section>
      </div>
    </>
  );
}
