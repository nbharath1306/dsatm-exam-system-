import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError('Please fill all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    alert('Registration successful! (Demo)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>
        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-indigo-200 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-indigo-200 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-indigo-200 mb-1" htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-indigo-100/80 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Sign Up
        </button>
        <div className="mt-4 text-indigo-200 text-sm text-center">
          Already have an account? <a href="#" className="underline hover:text-white">Sign in</a>
        </div>
      </form>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
