
import { useEffect } from 'react';
import { fetchMarks } from '../api/api';
import Loader from '../components/Loader';


  const [marks, setMarks] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarks().then(data => {
      setMarks(data);
      setLoading(false);
    });
  }, []);


  const filtered = marks.filter(m =>
    m.usn.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Internal Marks</h2>
        {loading ? <Loader /> : <>
        <input
          type="text"
          placeholder="Search by USN or subject..."
          className="w-full mb-6 px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <table className="w-full text-left text-indigo-100">
          <thead>
            <tr>
              <th className="pb-2">USN</th>
              <th className="pb-2">Subject</th>
              <th className="pb-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id} className="hover:bg-indigo-900/30 transition-colors">
                <td className="py-2">{m.usn}</td>
                <td>{m.subject}</td>
                <td>{m.marks}</td>
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
