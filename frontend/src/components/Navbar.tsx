import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-gradient-to-r from-indigo-800 to-purple-800 py-4 px-6 flex items-center justify-between shadow-lg">
      <div className="text-white text-2xl font-bold tracking-wide">
        DSATM Exam System
      </div>
      <div className="flex gap-6">
        <Link to="/" className="text-indigo-200 hover:text-white transition-colors">Home</Link>
        <Link to="/dashboard" className="text-indigo-200 hover:text-white transition-colors">Dashboard</Link>
        <Link to="/students" className="text-indigo-200 hover:text-white transition-colors">Students</Link>
        <Link to="/subjects" className="text-indigo-200 hover:text-white transition-colors">Subjects</Link>
        <Link to="/marks" className="text-indigo-200 hover:text-white transition-colors">Marks</Link>
        <Link to="/login" className="text-indigo-200 hover:text-white transition-colors">Login</Link>
        <Link to="/register" className="text-indigo-200 hover:text-white transition-colors">Register</Link>
      </div>
    </nav>
  );
}
