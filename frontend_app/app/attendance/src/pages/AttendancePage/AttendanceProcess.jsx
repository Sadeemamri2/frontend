import React, { useEffect, useState } from 'react';
import { fetchClassrooms, sendRequest } from '../../utilitis/api_request';
import '../AttendancePage/AttendanceProcess.css';

export default function AttendanceProcess({ user }) {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await sendRequest('/students/');
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all classrooms
  useEffect(() => {
    const getClassrooms = async () => {
      try {
        setLoading(true);
        const data = await fetchClassrooms();
        setClassrooms(data);
      } catch (err) {
        setError('Failed to load classrooms');
      } finally {
        setLoading(false);
      }
    };
    getClassrooms();
  }, []);

  // Fetch students for the selected classroom
  useEffect(() => {
    const getStudentsByClassroom = async () => {
      if (!selectedClassroom) return;
      try {
        setLoading(true);
        const data = await sendRequest(`/classrooms/${selectedClassroom}/students/`);
        console.log('Fetched students:', data);
        setStudents(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    // getStudentsByClassroom();
    fetchStudents()
  }, [selectedClassroom]);

  // Handle status change for a student
  const handleStatusChange = (id, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [id]: { ...prev[id], status }
    }));
  };

  // Handle note change for a student
  const handleNoteChange = (id, note) => {
    setAttendanceData(prev => ({
      ...prev,
      [id]: { ...prev[id], note }
    }));
  };

  // Submit bulk attendance
  const handleSubmit = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const attendances = students.map(student => {
        const data = attendanceData[student.id] || {};
        return {
          student_id: student.id,
          status: data.status || 'Absent',
          note: data.note || ''
        };
      });

      const payload = {
        classroom_id: parseInt(selectedClassroom),
        date: today,
        attendances: attendances
      };

      await sendRequest('/attendance/', 'POST', payload);
      alert('Attendance recorded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to record attendance');
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Process</h2>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <label>Select Classroom:</label>
      <select value={selectedClassroom} onChange={e => setSelectedClassroom(e.target.value)}>
        <option value="">-- Select --</option>
        {classrooms.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <div className="student-list">
        {students.map(s => (
          <div className="student-row" key={s.id}>
            <p>{s.username}</p>
            <select onChange={e => handleStatusChange(s.id, e.target.value)} defaultValue="">
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

      <button className="submit-btn" onClick={handleSubmit} disabled={!selectedClassroom || students.length === 0}>
        Submit Attendance
      </button>
    </div>
  );
}
