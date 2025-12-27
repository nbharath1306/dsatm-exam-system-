// Real API integration for DSATM Exam System backend

const API_BASE = 'http://localhost:8080/api';

export async function fetchStudents() {
  const res = await fetch(`${API_BASE}/students`);
  if (!res.ok) throw new Error('Failed to fetch students');
  return res.json();
}

export async function fetchSubjects() {
  const res = await fetch(`${API_BASE}/subjects`);
  if (!res.ok) throw new Error('Failed to fetch subjects');
  return res.json();
}

export async function fetchMarks() {
  const res = await fetch(`${API_BASE}/marks`);
  if (!res.ok) throw new Error('Failed to fetch marks');
  return res.json();
}
