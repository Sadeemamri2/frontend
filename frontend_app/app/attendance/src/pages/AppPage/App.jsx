import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../HomePage/home';
import SignupPage from '../regestration/signupPage';
import LoginPage from '../regestration/loginPage';
import AdminDashboard from '../dashboard/AdminDashboard/AdminDashboard';
import TeacherDashboard from '../dashboard/TeacherDashboard/TeacherDashboard';
import StudentDashboard from '../dashboard/StudentDashboard/StudentDashboard';
import ReportsPage from '../ReportsPage/ReportsPage';
import AttendanceProcess from '../AttendancePage/AttendanceProcess';
import './App.css'; 

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state to handle user data check

  // Check user data from localStorage when app is loaded
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user from localStorage
    }
    setLoading(false); // Once the check is complete, stop loading
  }, []);

  // ProtectedRoute to handle role-based access
  const ProtectedRoute = ({ element, role }) => {
    if (loading) {
      return <div>Loading...</div>; // Loading indicator while user data is being checked
    }
    // return user ? (user.role === role ? element : <Navigate to="/" />) : <Navigate to="/login" />;
    return element ; // Allow access to all routes for now
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      
      {/* Protected Routes based on user roles */}
      <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard user={user} />} role="admin" />} />
      <Route path="/teacher-dashboard" element={<ProtectedRoute element={<TeacherDashboard user={user} />} role="teacher" />} />
      <Route path="/student-dashboard" element={<ProtectedRoute element={<StudentDashboard user={user} />} role="student" />} />
      
      <Route path="/attendance-process" element={<AttendanceProcess user={user} />} />
      <Route path="/reports" element={<ReportsPage user={user} />} />
    </Routes>
  );
}
