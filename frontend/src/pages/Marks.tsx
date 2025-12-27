import React, { useEffect, useState } from 'react';
import { fetchMarks, addMark, updateMark, deleteMark, fetchStudents, fetchSubjects } from '../api/api';
import { Mark, Student, Subject } from '../api/types';
import Loader from '../components/Loader';
import MarkForm from '../components/MarkForm';
import AdvancedSearch from '../components/AdvancedSearch';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Marks: React.FC = () => {
  const [marks, setMarks] = useState<Mark[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMark, setEditMark] = useState<Mark | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{ label: string; value: string } | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [marksData, studentsData, subjectsData] = await Promise.all([
        fetchMarks(), fetchStudents(), fetchSubjects()
      ]);
      setMarks(marksData);
      setStudents(studentsData);
      setSubjects(subjectsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const studentOptions = students.map(s => ({ label: `${s.name} (${s.usn})`, value: s.usn }));
  const subjectOptions = subjects.map(s => ({ label: `${s.name} (${s.code})`, value: s.name }));
  const filterOptions = [
    ...studentOptions.length ? [{ label: 'Student', options: studentOptions }] : [],
    ...subjectOptions.length ? [{ label: 'Subject', options: subjectOptions }] : [],
  ];

  const filtered = marks.filter((m: Mark) => {
    const matchesSearch = m.student?.usn?.toLowerCase().includes(search.toLowerCase()) || m.subject?.name?.toLowerCase().includes(search.toLowerCase());
    if (!selectedFilter) return matchesSearch;
    if (studentOptions.some(o => o.value === selectedFilter.value)) {
      return matchesSearch && m.student?.usn === selectedFilter.value;
    }
    if (subjectOptions.some(o => o.value === selectedFilter.value)) {
      return matchesSearch && m.subject?.name === selectedFilter.value;
    }
    return matchesSearch;
  });

  const handleAdd = () => {
    setEditMark(null);
    setModalOpen(true);
  };

  const handleEdit = (mark: Mark) => {
    setEditMark(mark);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this mark entry?')) {
      setModalLoading(true);
      try {
        await deleteMark(id);
        toast.success('Mark deleted');
      } catch {
        toast.error('Failed to delete mark');
      }
      await load();
      setModalLoading(false);
    }
  };

  const handleForm = async (mark: Partial<Mark>) => {
    setModalLoading(true);
    try {
      if (editMark) {
        await updateMark(editMark.id, mark);
        toast.success('Mark updated');
      } else {
        await addMark(mark);
        toast.success('Mark added');
      }
    } catch {
      toast.error('Failed to save mark');
    }
    setModalOpen(false);
    await load();
    setModalLoading(false);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Internal Marks Report', 14, 16);
    autoTable(doc, {
      startY: 24,
      head: [['USN', 'Subject', 'Marks']],
      body: filtered.map(m => [m.student?.usn, m.subject?.name, m.marks]),
      theme: 'grid',
      headStyles: { fillColor: [67, 56, 202] },
      styles: { fontSize: 11 },
    });
    doc.save('marks-report.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white text-center">Internal Marks</h2>
          <button
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold shadow"
            onClick={exportPDF}
          >Export PDF</button>
          <button
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow"
            onClick={handleAdd}
          >+ Add Mark</button>
        </div>
        {loading ? <Loader /> : <>
        <AdvancedSearch
          search={search}
          setSearch={setSearch}
          filterOptions={filterOptions.flatMap(o => o.options ? o.options : o)}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          placeholder="Search by USN or subject..."
        />
        <div className="overflow-x-auto animate-slide-in">
        <table className="w-full text-left text-indigo-100">
          <thead>
            <tr>
              <th className="pb-2">USN</th>
              <th className="pb-2">Subject</th>
              <th className="pb-2">Marks</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m: Mark) => (
              <tr key={m.id} className="hover:bg-indigo-900/30 transition-colors">
                <td className="py-2">{m.student?.usn}</td>
                <td>{m.subject?.name}</td>
                <td>{m.marks}</td>
                <td>
                  <button
                    className="px-2 py-1 mr-2 rounded bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold"
                    onClick={() => handleEdit(m)}
                  >Edit</button>
                  <button
                    className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
                    onClick={() => handleDelete(m.id)}
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
            <h3 className="text-xl font-bold mb-4 text-indigo-900">{editMark ? 'Edit Mark' : 'Add Mark'}</h3>
            {modalLoading ? <Loader /> : (
              <MarkForm
                initial={editMark || undefined}
                students={students}
                subjects={subjects}
                onSubmit={handleForm}
                onCancel={() => setModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        @keyframes slide-in { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: none; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(.4,0,.2,1) both; }
        .animate-slide-in { animation: slide-in 0.5s cubic-bezier(.4,0,.2,1) both; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
};

export default Marks;
