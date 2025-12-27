
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 animate-fade-in">
          DSATM Exam System
        </h1>
        <p className="text-xl md:text-2xl text-indigo-200 mb-8 animate-fade-in delay-100">
          Modern, secure, and powerful platform for managing exams, students, and internal marks at DSATM.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in delay-200">
          <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-purple-700 transition-transform duration-200">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-lg border border-indigo-400 text-indigo-200 font-semibold hover:bg-indigo-800/30 transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>
      <footer className="mt-16 text-indigo-300 text-sm opacity-80 animate-fade-in delay-300">
        &copy; {new Date().getFullYear()} DSATM Exam System. All rights reserved.
      </footer>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        .delay-100 { animation-delay: .1s; }
        .delay-200 { animation-delay: .2s; }
        .delay-300 { animation-delay: .3s; }
      `}</style>
    </div>
  );
}

export default App;
