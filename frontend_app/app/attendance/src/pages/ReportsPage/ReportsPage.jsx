import React, { useEffect, useState } from 'react';
import { fetchReports } from '../../utilitis/api_request';
import './ReportsPage.css';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading Reports...</h2>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Reports</h1>

      {error && <p className="error">{error}</p>}

      {reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        <ul className="reports-list">
          {reports.map(r => (
            <li key={r.id} className="report-item">
              <h2>{r.title}</h2>
              <p className="report-date">
                {new Date(r.created_at).toLocaleDateString()}
              </p>
              <p>{r.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
