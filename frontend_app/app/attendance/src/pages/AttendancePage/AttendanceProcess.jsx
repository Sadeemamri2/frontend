import React, { useEffect, useState } from 'react';
import { fetchClassrooms, recordAttendance } from '../../utilitis/api_request';
import '../AttendancePage/AttendanceProcess.css';

export default function AttendanceProcess({ user }) {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [students, setStudents] = useState([]); 
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch classrooms when component mounts
  useEffect(() => {
    const getClassrooms = async () => {
      try {
        setLoading(true);
        const classrooms = await fetchClassrooms();
        setClassrooms(classrooms);
      } catch (err) {
        setError('Failed to load classrooms');
      } finally {
        setLoading(false);
      }
    };

    getClassrooms();
  }, []);

  // Fetch students when a classroom is selected
  useEffect(() => {
    if (!selectedClassroom) return;

    const getStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/classrooms/${selectedClassroom}/`);
        const data = await response.json();
        setStudents(data.students || []);
      } catch (err) {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, [selectedClassroom]);

  // Handle status change for a student
  const handleStatusChange = (id, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [id]: { ...prev[id], status },
    }));
  };

  // Handle note change for a student
  const handleNoteChange = (id, note) => {
    setAttendanceData(prev => ({
      ...prev,
      [id]: { ...prev[id], note },
    }));
  };

  // Submit attendance data
  const handleSubmit = async () => {
    try {
      for (const [studentId, { status, note }] of Object.entries(attendanceData)) {
        await recordAttendance({
          date: new Date().toISOString().split('T')[0],
          status,
          note,
          role_id: user.role.id,
          classroom_id: selectedClassroom,
        });
      }
      alert('Attendance recorded successfully!');
    } catch (err) {
      alert('Failed to record attendance');
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => <div>Loading...</div>;

  // Error message component
  const ErrorMessage = () => <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="attendance-container">
      <h2>Attendance Process</h2>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage />}

      <label>Select Classroom:</label>
      <select value={selectedClassroom} onChange={e => setSelectedClassroom(e.target.value)}>
        <option value="">-- Select --</option>
        {classrooms.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <div className="student-list">
        {students.map(s => (
          <div className="student-row" key={s.id}>
            <p>{s.username}</p>
            <select onChange={e => handleStatusChange(s.id, e.target.value)}>
              <option value="">-- Status --</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Excused">Excused</option>
            </select>
            <input
              type="text"
              placeholder="Note"
              onChange={e => handleNoteChange(s.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit Attendance
      </button>
    </div>
  );
}
