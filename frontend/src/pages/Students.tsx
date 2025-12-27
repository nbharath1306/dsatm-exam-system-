import React, { useEffect, useState } from 'react';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../api/api';
import { Student } from '../api/types';
import Loader from '../components/Loader';
import StudentForm from '../components/StudentForm';
import AdvancedSearch from '../components/AdvancedSearch';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{ label: string; value: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchStudents();
      setStudents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const branchOptions = Array.from(new Set(students.map(s => s.branch).filter(Boolean))).map(b => ({ label: b as string, value: b as string }));
  const semesterOptions = Array.from(new Set(students.map(s => s.semester).filter(Boolean))).map(s => ({ label: `Semester ${s}`, value: String(s) }));
  const filterOptions = [
    ...branchOptions.length ? [{ label: 'Branch', options: branchOptions }] : [],
    ...semesterOptions.length ? [{ label: 'Semester', options: semesterOptions }] : [],
  ];

  const filtered = students.filter((s: Student) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.usn.toLowerCase().includes(search.toLowerCase());
    if (!selectedFilter) return matchesSearch;
    if (branchOptions.some(o => o.value === selectedFilter.value)) {
      return matchesSearch && s.branch === selectedFilter.value;
    }
    if (semesterOptions.some(o => o.value === selectedFilter.value)) {
      return matchesSearch && String(s.semester) === selectedFilter.value;
    }
    return matchesSearch;
  });

  const handleAdd = () => {
    setEditStudent(null);
    setModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this student?')) {
      setModalLoading(true);
      try {
        await deleteStudent(id);
        toast.success('Student deleted');
      } catch {
        toast.error('Failed to delete student');
      }
      await load();
      setModalLoading(false);
    }
  };

  const handleForm = async (student: Partial<Student>) => {
    setModalLoading(true);
    try {
      if (editStudent) {
        await updateStudent(editStudent.id, student);
        toast.success('Student updated');
      } else {
        await addStudent(student);
        toast.success('Student added');
      }
    } catch {
      toast.error('Failed to save student');
    }
    setModalOpen(false);
    await load();
    setModalLoading(false);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Students Report', 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [['Name', 'USN', 'Branch', 'Semester']],
      body: filtered.map(s => [s.name, s.usn, s.branch, s.semester]),
      theme: 'grid',
      headStyles: { fillColor: [67, 56, 202] },
      styles: { fontSize: 11 },
    });
    doc.save('students-report.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white text-center">Students</h2>
          <button
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold shadow"
            onClick={exportPDF}
          >Export PDF</button>
          <button
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
            onClick={handleAdd}
          >+ Add Student</button>
        </div>
        {loading ? <Loader /> : <>
        <AdvancedSearch
          search={search}
          setSearch={setSearch}
          filterOptions={filterOptions.flatMap(o => o.options ? o.options : o)}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          placeholder="Search by name or USN..."
        />
        <div className="overflow-x-auto animate-slide-in">
        <table className="w-full text-left text-indigo-100">
          <thead>
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">USN</th>
              <th className="pb-2">Branch</th>
              <th className="pb-2">Semester</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s: Student) => (
              <tr key={s.id} className="hover:bg-indigo-900/30 transition-colors">
                <td className="py-2">{s.name}</td>
                <td>{s.usn}</td>
                <td>{s.branch}</td>
                <td>{s.semester}</td>
                <td>
                  <button
                    className="px-2 py-1 mr-2 rounded bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold"
                    onClick={() => handleEdit(s)}
                  >Edit</button>
                  <button
                    className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
                    onClick={() => handleDelete(s.id)}
                    disabled={modalLoading}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </>}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-scale-in">
            <h3 className="text-xl font-bold mb-4 text-indigo-900">{editStudent ? 'Edit Student' : 'Add Student'}</h3>
            {modalLoading ? <Loader /> : (
              <StudentForm
                initial={editStudent || undefined}
                onSubmit={handleForm}
                onCancel={() => setModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        @keyframes slide-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
        .animate-slide-in { animation: slide-in 0.5s cubic-bezier(.4,0,.2,1) both; }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: none; } }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default Students;
