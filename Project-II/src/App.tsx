import React, { useState } from 'react';
import { UserRole } from './type';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ChatConsultant from './pages/ChatConsultant';
import Courses from './pages/Courses';
import Registration from './pages/Registration';

// Login Component
const LoginModal: React.FC<{ onClose: () => void; onLogin: (role: UserRole) => void }> = ({ onClose, onLogin }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Staff Login</h2>
      <div className="space-y-3">
        <button
          onClick={() => onLogin(UserRole.STAFF)}
          className="w-full bg-blue-100 text-blue-800 py-3 rounded hover:bg-blue-200 font-medium"
        >
          Login as Staff
        </button>
        <button
          onClick={() => onLogin(UserRole.MANAGER)}
          className="w-full bg-purple-100 text-purple-800 py-3 rounded hover:bg-purple-200 font-medium"
        >
          Login as Manager
        </button>
        <button
          onClick={onClose}
          className="w-full border border-slate-300 text-slate-600 py-3 rounded hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(undefined);

  const handleNavigate = (view: string) => {
    if (view === 'login') {
      setShowLogin(true);
    } else {
      setCurrentView(view);
      window.scrollTo(0, 0);
    }
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setShowLogin(false);
    if (role === UserRole.STAFF || role === UserRole.MANAGER) {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(UserRole.GUEST);
    setCurrentView('home');
  };

  const handleRegisterClick = (courseId?: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('register');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'courses':
        return <Courses onRegisterClick={handleRegisterClick} />;
      case 'consultation':
        return <ChatConsultant />;
      case 'register':
        return <Registration selectedCourseId={selectedCourseId} onComplete={() => setCurrentView('home')} />;
      case 'dashboard':
        if (userRole === UserRole.GUEST) return <div className="p-8 text-center">Access Denied</div>;
        return <AdminDashboard />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;