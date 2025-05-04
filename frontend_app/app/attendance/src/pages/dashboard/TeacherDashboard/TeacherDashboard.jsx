import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ProtectedRoute from '../../../component/ProtectedRoute';
import Navbar from '../../../component/Navbar';
import Loading from '../../../component/Loading';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <ProtectedRoute role="teacher">
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
    </ProtectedRoute>
  );
}
