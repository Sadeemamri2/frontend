const API_BASE = 'http://127.0.0.1:8000/api';
const TIMEOUT = 10000; 

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
      signal: controller.signal, // Add abort signal
    });

    clearTimeout(timeoutId); // Clear timeout on success

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error:', errorData);
      throw new Error(errorData.detail || 'An error occurred');
    }

    return res.json();
  } catch (error) {
    clearTimeout(timeoutId); // Ensure timeout is cleared

    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    console.error('API Error:', error.message);
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

// Public API
export function signup({ username, email, password, role }) {
  localStorage.removeItem('token');
  return sendRequest('/users/', 'POST', { username, email, password, role });
}

export async function login({ username, password }) {
  try {

    const data = await sendRequest('/token/', 'POST', { username, password }); // Correct endpoint
    localStorage.setItem('token', data.access); // Store token
    return data;
  } catch (error) {
    console.error('Login Error:', error.message);
    throw new Error('Invalid credentials, please try again.');
  }
}

export function logout() {
  localStorage.removeItem('token'); // Clear the token on logout
}

// Fetch the current user’s profile from your backend:
export function getProfile() {
  return sendRequest('/users/me/', 'GET');
}

// Example for fetching classrooms, attendance, etc:
export function fetchClassrooms() {
  return sendRequest('/classrooms/', 'GET');
}

export function createClassroom({ name, year}) {
  return sendRequest('/classrooms/', 'POST', { name, year,role });
}

export function fetchAttendance() {
  return sendRequest('/attendance/', 'GET');
}

export function recordAttendance({ date, status, note, role, classroom_id }) {
  return sendRequest('/attendance/', 'POST', { date, status, note, role, classroom_id });
}

export function fetchReports() {
  return sendRequest('/reports/', 'GET');
}

export function fetchReport(id) {
  return sendRequest(`/reports/${id}/`, 'GET');
}

export function createReport({ title, content, role, attendance_id }) {
  return sendRequest('/reports/', 'POST', { title, content, role, attendance_id });
}

// Optionally, add PUT and DELETE methods if needed
export function updateClassroom(id, { name, year }) {
  return sendRequest(`/classrooms/${id}/`, 'PUT', { name, year });
}

export function deleteClassroom(id) {
  return sendRequest(`/classrooms/${id}/`, 'DELETE');
}
