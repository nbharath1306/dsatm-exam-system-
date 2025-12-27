
import { useEffect } from 'react';
import { fetchSubjects } from '../api/api';
import Loader from '../components/Loader';


  const [subjects, setSubjects] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects().then(data => {
      setSubjects(data);
      setLoading(false);
    });
  }, []);


  const filtered = subjects.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Subjects</h2>
        {loading ? <Loader /> : <>
        <input
          type="text"
          placeholder="Search by name or code..."
          className="w-full mb-6 px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table className="w-full text-left text-indigo-100">
          <thead>
            <tr>
              <th className="pb-2">Code</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Department</th>
              <th className="pb-2">Semester</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-indigo-900/30 transition-colors">
                <td className="py-2">{s.code}</td>
                <td>{s.name}</td>
                <td>{s.department}</td>
                <td>{s.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>}
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
