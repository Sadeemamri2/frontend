// src/pages/LogoutPage/LogoutPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

export default function LogoutPage({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUser?.(null); // only if setUser is passed
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate, setUser]);

  return (
    <div className="logout-page">
      <p>Logging out...</p>
    </div>
  );
}
