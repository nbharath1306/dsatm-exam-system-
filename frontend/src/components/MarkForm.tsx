import React, { useState } from 'react';
import { Mark, Student, Subject } from '../api/types';

interface MarkFormProps {
  initial?: Partial<Mark>;
  students: Student[];
  subjects: Subject[];
  onSubmit: (mark: Partial<Mark>) => void;
  onCancel: () => void;
}

const MarkForm: React.FC<MarkFormProps> = ({ initial = {}, students, subjects, onSubmit, onCancel }) => {
  const [studentId, setStudentId] = useState(initial.student?.id || '');
  const [subjectId, setSubjectId] = useState(initial.subject?.id || '');
  const [marks, setMarks] = useState(initial.marks || 0);

  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        const student = students.find(s => s.id === Number(studentId));
        const subject = subjects.find(s => s.id === Number(subjectId));
        onSubmit({ student, subject, marks });
      }}
    >
      <select
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
        required
      >
        <option value="">Select Student</option>
        {students.map(s => (
          <option key={s.id} value={s.id}>{s.name} ({s.usn})</option>
        ))}
      </select>
      <select
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        value={subjectId}
        onChange={e => setSubjectId(e.target.value)}
        required
      >
        <option value="">Select Subject</option>
        {subjects.map(s => (
          <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
        ))}
      </select>
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="Marks"
        type="number"
        min={0}
        max={100}
        value={marks}
        onChange={e => setMarks(Number(e.target.value))}
        required
      />
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default MarkForm;
