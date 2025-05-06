
import { Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../../../component/ProtectedRoute';
import Navbar from '../../../component/Navbar';
import Loading from '../../../component/Loading';
import logout from '../../regestration/logoutPage';
import './style.css';

export default function AdminDashboard({ user }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <header>
          <h1>Admin Dashboard</h1>
          <p>Welcome, {user.username}!</p>
          <button onClick={() => navigate('/logout')} className="btn logout">
            Logout
          </button>
        </header>

        <section className="actions">
          
          <button onClick={() => navigate('/reports')} className="btn">
            View Reports
          </button>
          <button onClick={() => navigate('/attendance-process')} className="btn">
            Manage Attendance
          </button>
        </section>
      </div>
    </>
  );
}
