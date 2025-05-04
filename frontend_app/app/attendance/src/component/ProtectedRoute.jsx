// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute يحمي المسارات بناءً على وجود توكن وفي اختياري الدور
 * @param {{ children:JSX.Element, role?:string }} props 
 */
export default function ProtectedRoute({ children, role }) {
  // نتحقق من وجود التوكن اللي خزّنّاه بعد تسجيل الدخول
  const token = localStorage.getItem('token') || localStorage.getItem('access_token');
  if (!token) {
    // إذا ما في توكن، نوجّهه لصفحة الدخول
    return <Navigate to="/login" replace />;
  }

  // لو مرّرت دور، نتحقق من دور المستخدم المخزون في localStorage
  if (role) {
    const storedUser = localStorage.getItem('user');
    let userRole = null;
    try {
      userRole = storedUser ? JSON.parse(storedUser).role?.name : null;
    } catch {
      userRole = null;
    }
    if (userRole !== role) {
      // إذا الدور مختلف، نرجع للصفحة الرئيسية
      return <Navigate to="/" replace />;
    }
  }

  // وإلا نعرض المحتوى المحمي
  return children;
}
