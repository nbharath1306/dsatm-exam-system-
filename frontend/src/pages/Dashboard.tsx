import React, { useEffect, useState } from 'react';
import { fetchStudents, fetchSubjects, fetchMarks } from '../api/api';
import { Student, Subject, Mark } from '../api/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import Loader from '../components/Loader';

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [stu, sub, mar] = await Promise.all([
        fetchStudents(), fetchSubjects(), fetchMarks()
      ]);
      setStudents(stu);
      setSubjects(sub);
      setMarks(mar);
      setLoading(false);
    })();
  }, []);

  // Analytics: average marks per subject
  const avgMarksData = subjects.map(subject => {
    const subjectMarks = marks.filter(m => m.subject?.id === subject.id);
    const avg = subjectMarks.length ? (subjectMarks.reduce((sum, m) => sum + (m.marks || 0), 0) / subjectMarks.length) : 0;
    return { name: subject.name, avg: Math.round(avg) };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Dashboard</h2>
        {loading ? <Loader /> : <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 shadow-lg text-white flex flex-col items-center">
            <span className="text-2xl font-semibold mb-2">Students</span>
            <span className="text-5xl font-extrabold">{students.length}</span>
            <span className="mt-2 text-indigo-100">Total Registered</span>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 shadow-lg text-white flex flex-col items-center">
            <span className="text-2xl font-semibold mb-2">Subjects</span>
            <span className="text-5xl font-extrabold">{subjects.length}</span>
            <span className="mt-2 text-indigo-100">Active Courses</span>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 shadow-lg text-white flex flex-col items-center">
            <span className="text-2xl font-semibold mb-2">Marks</span>
            <span className="text-5xl font-extrabold">{marks.length}</span>
            <span className="mt-2 text-indigo-100">Total Entries</span>
          </div>
        </div>
        <div className="mt-12 bg-white/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Average Marks per Subject</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={avgMarksData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff' }} angle={-20} height={60} interval={0} />
              <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
              <Tooltip contentStyle={{ background: '#fff', color: '#3730a3', borderRadius: 12 }} />
              <Legend />
              <Bar dataKey="avg" fill="#a78bfa" name="Average Marks" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200">Manage Students</button>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200">Manage Subjects</button>
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200">Manage Marks</button>
        </div>
        </>}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
