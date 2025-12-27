export interface Student {
  id: number;
  name: string;
  usn: string;
  branch?: string;
  semester?: number;
  email?: string;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  department?: string;
  semester?: number;
}

export interface Mark {
  id: number;
  student: Student;
  subject: Subject;
  marks: number;
}
