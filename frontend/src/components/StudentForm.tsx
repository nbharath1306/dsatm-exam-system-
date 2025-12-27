import React, { useState } from 'react';
import { Student } from '../api/types';

interface StudentFormProps {
  initial?: Partial<Student>;
  onSubmit: (student: Partial<Student>) => void;
  onCancel: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initial = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initial.name || '');
  const [usn, setUsn] = useState(initial.usn || '');
  const [branch, setBranch] = useState(initial.branch || '');
  const [semester, setSemester] = useState(initial.semester || 1);
  const [email, setEmail] = useState(initial.email || '');

  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ name, usn, branch, semester, email });
      }}
    >
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="USN"
        value={usn}
        onChange={e => setUsn(e.target.value)}
        required
      />
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="Branch"
        value={branch}
        onChange={e => setBranch(e.target.value)}
      />
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="Semester"
        type="number"
        min={1}
        max={8}
        value={semester}
        onChange={e => setSemester(Number(e.target.value))}
      />
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
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

export default StudentForm;
