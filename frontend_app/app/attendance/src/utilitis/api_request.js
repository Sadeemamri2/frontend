const API_BASE = 'http://127.0.0.1:8000/api';
const TIMEOUT = 10000; // Timeout duration (in ms)

export async function sendRequest(url, method = 'GET', body = null) {
  const token = localStorage.getItem('token'); // Get token from localStorage
  console.log('Token:', token);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '', // Only add token if it's present
  };

  const controller = new AbortController(); // Create an abort controller for timeout
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT); // Set timeout

  try {
    const res = await fetch(`${API_BASE}${url}`, { // Use 'url' instead of 'path'
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal, // Add abort signal for request cancellation
    });

    clearTimeout(timeoutId); // Clear timeout on success

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(errorData.detail || 'An error occurred');
    }

    return res.json(); // Return JSON response
  } catch (error) {
    clearTimeout(timeoutId); // Ensure timeout is cleared

    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    console.error('API Error:', error.message);
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

// Public API for authentication
export function signup({ username, email, password, role }) {
  localStorage.removeItem('token'); // Remove existing token before signup
  return sendRequest('/users/', 'POST', { username, email, password, role });
}

export async function login({ username, password }) {
  try {
    const data = await sendRequest('/token/', 'POST', { username, password }); // Correct endpoint
    localStorage.setItem('token', data.access); // Store token on successful login
    return data;
  } catch (error) {
    console.error('Login Error:', error.message);
    throw new Error('Invalid credentials, please try again.');
  }
}

export function logout() {
  localStorage.removeItem('token'); // Clear the token on logout
}

// --- Student APIs ---
export function fetchStudents() {
  return sendRequest('/students/', 'GET'); // Fetch all students
}

export function deleteStudent(id) {
  return sendRequest(`/students/${id}/`, 'DELETE'); // Delete student by ID
}

export function updateStudent(id, studentData) {
  return sendRequest(`/students/${id}/`, 'PUT', studentData); // Update student details by ID
}

export function createStudent(studentData) {
  return sendRequest('/students/', 'POST', studentData); // Create new student
}

// Fetch the current user’s profile
export function getProfile() {
  return sendRequest('/users/me/', 'GET'); // Fetch user profile data
}

// Classroom APIs
export function fetchClassrooms() {
  return sendRequest('/classrooms/', 'GET'); // Fetch all classrooms
}

export function createClassroom({ name, year, role }) {
  return sendRequest('/classrooms/', 'POST', { name, year, role }); // Create a new classroom
}

export function updateClassroom(id, { name, year }) {
  return sendRequest(`/classrooms/${id}/`, 'PUT', { name, year }); // Update classroom details by ID
}

export function deleteClassroom(id) {
  return sendRequest(`/classrooms/${id}/`, 'DELETE'); // Delete classroom by ID
}

// Attendance APIs
export function fetchAttendance() {
  return sendRequest('/attendance/', 'GET'); // Fetch attendance records
}

export function recordAttendance({ date, status, note, role, classroom_id }) {
  return sendRequest('/attendance/', 'POST', { date, status, note, role, classroom_id }); // Record attendance for a classroom
}

// Reports APIs
export function fetchReports() {
  return sendRequest('/reports/', 'GET'); // Fetch all reports
}

export function fetchReport(id) {
  return sendRequest(`/reports/${id}/`, 'GET'); // Fetch a specific report by ID
}

export function createReport({ title, content, role, attendance_id }) {
  return sendRequest('/reports/', 'POST', { title, content, role, attendance_id }); // Create a new report
}

// Edit report
export const editReport = async (reportId, updatedReport) => {
  console.log('Report ID to edit:', reportId);  // Ensure the reportId is correct
  const token = localStorage.getItem('token'); // Retrieve the token from LocalStorage

  if (!token) {
    throw new Error('User is not authenticated'); // If token is missing, throw error
  }

  try {
    const response = await fetch(`http://localhost:8000/api/reports/${reportId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include token in the request header
      },
      body: JSON.stringify(updatedReport), // Send the updated report data in the body
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error updating report: ' + error.message); // Handle errors
  }
};

// Delete report
export const deleteReport = async (reportId) => {
  const token = localStorage.getItem('token'); // جلب التوكن من الـ LocalStorage

  if (!token) {
    throw new Error('User is not authenticated'); // إذا لم يكن هناك توكن، رمي خطأ
  }

  try {
    const response = await fetch(`http://localhost:8000/api/reports/${reportId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // إرسال التوكن مع الطلب
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete report');
    }

    return 'Report deleted successfully';
  } catch (error) {
    throw new Error('Error deleting report: ' + error.message); // التعامل مع الخطأ
  }
};

// Lessons APIs
export const fetchLessons = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/lessons/');
  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }
  return await response.json();
};

export function createLesson(lessonData) {
  return sendRequest('/lessons/', 'POST', lessonData); // Create new lesson
}

export function updateLesson(id, lessonData) {
  return sendRequest(`/lessons/${id}/`, 'PUT', lessonData); // Update lesson details by ID
}

export async function deleteLesson(id) {
  try {
    const token = localStorage.getItem('token'); // استرجاع التوكن من LocalStorage

    if (!token) {
      throw new Error('User is not authenticated'); // إذا لم يكن هناك توكن
    }

    const response = await fetch(`http://127.0.0.1:8000/api/lessons/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // استخدم التوكن المسترجع
      },
    });

    if (!response.ok) {
      // إذا كانت الاستجابة غير ناجحة
      throw new Error('Failed to delete lesson');
    }

    // إذا كانت الاستجابة 204 No Content أو بدون محتوى، نفترض أن الحذف تم بنجاح
    if (response.status === 204) {
      return 'Lesson deleted successfully'; 
    }

    // إذا كان هناك محتوى في الاستجابة (غير متوقع في الحذف عادةً)
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error deleting lesson:', error.message);
    throw new Error('Failed to delete lesson. Please try again.');
  }
}

