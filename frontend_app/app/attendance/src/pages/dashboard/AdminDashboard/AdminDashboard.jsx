import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ProtectedRoute from '../../../component/ProtectedRoute';
import Navbar from '../../../component/Navbar';
import Loading from '../../../component/Loading';
// import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <ProtectedRoute role="admin">
      <Navbar />
      <div className="admin-dashboard">
        <header>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout} className="btn logout">
            Logout
          </button>
        </header>

        <section className="actions">
          <button onClick={() => navigate('/manage-users')} className="btn">
            Manage Users
          </button>
          <button onClick={() => navigate('/reports')} className="btn">
            View Reports
          </button>
        </section>
      </div>
    </ProtectedRoute>
  );
}
