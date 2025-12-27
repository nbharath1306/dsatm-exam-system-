// Real API integration for DSATM Exam System backend

const API_BASE = '/api';

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

import { Student, Subject, Mark } from './types';

export async function addStudent(student: Partial<Student>) {
  const res = await fetch(`${API_BASE}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error('Failed to add student');
  return res.json();
}

export async function updateStudent(id: number, student: Partial<Student>) {
  const res = await fetch(`${API_BASE}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!res.ok) throw new Error('Failed to update student');
  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await fetch(`${API_BASE}/students/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete student');
  return true;
}

export async function addSubject(subject: Partial<Subject>) {
  const res = await fetch(`${API_BASE}/subjects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subject),
  });
  if (!res.ok) throw new Error('Failed to add subject');
  return res.json();
}

export async function updateSubject(id: number, subject: Partial<Subject>) {
  const res = await fetch(`${API_BASE}/subjects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subject),
  });
  if (!res.ok) throw new Error('Failed to update subject');
  return res.json();
}

export async function deleteSubject(id: number) {
  const res = await fetch(`${API_BASE}/subjects/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete subject');
  return true;
}

export async function addMark(mark: Partial<Mark>) {
  const res = await fetch(`${API_BASE}/marks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mark),
  });
  if (!res.ok) throw new Error('Failed to add mark');
  return res.json();
}

export async function updateMark(id: number, mark: Partial<Mark>) {
  const res = await fetch(`${API_BASE}/marks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mark),
  });
  if (!res.ok) throw new Error('Failed to update mark');
  return res.json();
}

export async function deleteMark(id: number) {
  const res = await fetch(`${API_BASE}/marks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete mark');
  return true;
}
