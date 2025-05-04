import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ProtectedRoute from '../../../component/ProtectedRoute';
import Navbar from '../../../component/Navbar';
import Loading from '../../../component/Loading';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("student dashboard", user);
  if (loading) return <Loading />;
  // if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <ProtectedRoute role="student">
      <Navbar />
      <div className="student-dashboard">
        <header>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout} className="btn logout">
            Logout
          </button>
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
    </ProtectedRoute>
  );
}
