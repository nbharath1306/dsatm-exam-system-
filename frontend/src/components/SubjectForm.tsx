import React, { useState } from 'react';
import { Subject } from '../api/types';

interface SubjectFormProps {
  initial?: Partial<Subject>;
  onSubmit: (subject: Partial<Subject>) => void;
  onCancel: () => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ initial = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState(initial.name || '');
  const [code, setCode] = useState(initial.code || '');
  const [department, setDepartment] = useState(initial.department || '');
  const [semester, setSemester] = useState(initial.semester || 1);

  return (
    <form
      className="space-y-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ name, code, department, semester });
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
        placeholder="Code"
        value={code}
        onChange={e => setCode(e.target.value)}
        required
      />
      <input
        className="w-full px-3 py-2 rounded bg-indigo-100 text-indigo-900"
        placeholder="Department"
        value={department}
        onChange={e => setDepartment(e.target.value)}
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

export default SubjectForm;
