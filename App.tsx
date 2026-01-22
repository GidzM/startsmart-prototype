
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import Catalog from './screens/Catalog';
import Calculator from './screens/Calculator';
import LessonPlayer from './screens/LessonPlayer';
import Library from './screens/Library';
import Roadmap from './screens/Roadmap';
import Assistant from './screens/Assistant';
import Auth from './screens/Auth';

const NavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isTabActive = (path: string) => {
    if (path === '/') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { label: 'Home', icon: 'home', path: '/dashboard' },
    { label: 'Courses', icon: 'menu_book', path: '/catalog' },
    { label: 'AI Coach', icon: 'smart_toy', path: '/assistant' },
    { label: 'Market', icon: 'trending_up', path: '/calculator' },
    { label: 'Profile', icon: 'person', path: '/library' },
  ];

  const hideNav = location.pathname === '/' || location.pathname === '/auth' || location.pathname.startsWith('/lesson');

  if (hideNav || !user) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-6 pt-3 px-4 z-50">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isTabActive(item.path) ? 'text-primary scale-110' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600'
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: isTabActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>
              {item.icon}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
      <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
      <Route path="/lesson/:id" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
      <Route path="/roadmap/:id" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
          <AppRoutes />
          <NavigationHandler />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
