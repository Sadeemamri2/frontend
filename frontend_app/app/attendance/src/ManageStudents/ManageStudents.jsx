import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStudents } from '../utilitis/api_request'; // Adjust path as needed
import Loading from '../component/Loading'; 

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch students on component mount
  useEffect(() => {
    loadStudents();

  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents(); // fetches from API
      setStudents(data); // updates local state
    } catch (error) {
      console.error('Error fetching students:', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />; // Use your loading component

  return (
    <div>
      <h2>Manage Students</h2>
      <button onClick={() => navigate('/add-student')}>Add Student</button>
      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              console.log('Student:', student);
              return(
              <tr key={student.id}>
                <td>{student.username}</td>
              </tr>
              )
})}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageStudents;
