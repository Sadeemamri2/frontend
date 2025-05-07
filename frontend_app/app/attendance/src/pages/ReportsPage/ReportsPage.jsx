import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchReports, deleteReport, editReport } from '../../utilitis/api_request';
import './style.css'

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({}); // لتخزين حالة إظهار التفاصيل لكل تقرير
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports()
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load reports: ' + err.message);
        setLoading(false);
      });
  }, []);

  const handleEditReport = (reportId, updatedReport) => {
    editReport(reportId, updatedReport)
      .then(updatedData => {
        setReports(reports.map(report => report.id === reportId ? updatedData : report));
      })
      .catch(err => {
        console.error("Error updating report:", err);
      });
  };

  const handleDeleteReport = (id) => {
    setLoading(true);
    deleteReport(id)
      .then(() => {
        setReports(reports.filter((report) => report.id !== id)); // تحديث القائمة بعد الحذف
        setError(null);
      })
      .catch(() => setError('Failed to delete report'))
      .finally(() => setLoading(false));
  };


  // التبديل بين عرض / إخفاء تفاصيل الحضور
  const toggleDetails = (reportId) => {
    setShowDetails(prevState => ({
      ...prevState,
      [reportId]: !prevState[reportId]
    }));
  };

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading Reports...</h2>
      </div>
    );
  }

  return (
    <div className="page-container-report">
      <button onClick={() => navigate('/dashboard')} className="btn">
        Return to Dashboard
      </button>

      <h1>Reports</h1>

      {error && <p className="error">{error}</p>}

      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul className="reports-list">
          {reports.map(r => (
            <li key={r.id} className="report-item">
              <h2>{r.title}</h2>
              <p className="report-date">{new Date(r.created_at).toLocaleDateString()}</p>
              <p>{r.content}</p>

              {/* زر للتبديل بين عرض التفاصيل */}
              <button onClick={() => toggleDetails(r.id)} className="btn toggle-details-btn">
                {showDetails[r.id] ? 'Hide Attendance Details' : 'Show Attendance Details'}
              </button>

              {showDetails[r.id] && (
                <div className="attendance-details">
                  <h4>Attendance Details:</h4>
                  <ul>
                    {r.attendances.map((a, idx) => (
                      <li key={idx}>
                        👤 {a.student_name} - {a.status} {a.note && `(Note: ${a.note})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* أزرار تعديل وحذف */}
              <div className="action-buttons">
                <button onClick={() => handleEditReport(r.id, { title: 'Updated Title', content: 'Updated content' })} className="btn edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDeleteReport(r.id)} className="btn delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
