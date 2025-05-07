import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../HomePage/home';
import SignupPage from '../regestration/signupPage';
import LoginPage from '../regestration/loginPage';
import ReportsPage from '../ReportsPage/ReportsPage';
import AttendanceProcess from '../AttendancePage/AttendanceProcess';
import Dashboard from '../dashboard/Dashboard';
import Loading from '../../component/Loading';
import ManageStudents from '../../ManageStudents/ManageStudents';
import LogoutPage from '../regestration/logoutPage'
import LessonsPage from '../../component/lessons/LessonsPage'

//image


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

  
  const ProtectedRoute = ({ element}) => {
    if (loading) return <Loading />;
    return element ; 
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/logout" element={<LogoutPage setUser={setUser} />} />
      <Route path="/dashboard" element={<Dashboard user={user}/>}/>
      <Route path="/attendance-process" element={<AttendanceProcess user={user} />} />
      <Route path="/reports" element={<ReportsPage user={user} />} />
      <Route path="/lessons" element={<LessonsPage />} />
    </Routes>
  );
}
