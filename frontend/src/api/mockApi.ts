// Mock API for demo purposes. Replace with real API calls as needed.

export async function fetchStudents() {
  return [
    { id: 1, name: 'Alice Johnson', usn: 'CS2021001', branch: 'CSE', semester: 6 },
    { id: 2, name: 'Bob Smith', usn: 'ME2021002', branch: 'ME', semester: 6 },
    { id: 3, name: 'Charlie Brown', usn: 'CE2021003', branch: 'CE', semester: 4 },
  ];
}

export async function fetchSubjects() {
  return [
    { id: 1, code: 'BMATS301', name: 'Linear Algebra', department: 'Mathematics', semester: 3 },
    { id: 2, code: 'BCD302', name: 'Data Structures and Algorithm', department: 'CSE-DS', semester: 3 },
    { id: 3, code: 'BCD304', name: 'Computer Organization and Architecture', department: 'CSE-DS', semester: 3 },
  ];
}

export async function fetchMarks() {
  return [
    { id: 1, usn: 'CS2021001', subject: 'Linear Algebra', marks: 44 },
    { id: 2, usn: 'ME2021002', subject: 'Data Structures and Algorithm', marks: 30 },
    { id: 3, usn: 'CE2021003', subject: 'Computer Organization and Architecture', marks: 25 },
  ];
}
