export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 animate-fade-in">
          Welcome to DSATM Exam System
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 mb-8 animate-fade-in delay-100">
          Manage students, subjects, attendance, and marks with a modern, secure platform.
        </p>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        .delay-100 { animation-delay: .1s; }
      `}</style>
    </div>
  );
}
