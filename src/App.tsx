
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

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isTabActive = (path: string) => {
    if (path === '/') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { label: 'Dashboard', icon: 'home', path: '/dashboard' },
    { label: 'Courses', icon: 'menu_book', path: '/catalog' },
    { label: 'AI Coach', icon: 'smart_toy', path: '/assistant' },
    { label: 'Deal Analyzer', icon: 'trending_up', path: '/calculator' },
    { label: 'Profile', icon: 'account_circle', path: '/profile' },
  ];

																														

  const hideNav = !user || location.pathname === '/' || location.pathname === '/auth' || location.pathname.startsWith('/lesson');
  if (hideNav) return null;

  return (
    <>
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-white dark:bg-card-dark border-r border-gray-100 dark:border-gray-800 z-[100] px-4 py-8 no-scrollbar">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-black text-xl font-black">real_estate_agent</span>
          </div>
          <h2 className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white">StartSmart</h2>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                isTabActive(item.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isTabActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Market Status</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="size-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-gray-900 dark:text-white">Dubai 2026 Pulse Active</span>
          </div>
          <p className="text-[8px] font-medium text-gray-400">Grounded in 2026 Supply Forecasts</p>
        </div>
      </aside>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-card-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-8 pt-3 px-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isTabActive(item.path) ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isTabActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/" />;
};

const MainContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const showSidebarPadding = user && location.pathname !== '/' && location.pathname !== '/auth' && !location.pathname.startsWith('/lesson');

  return (
    <div className={`${showSidebarPadding ? 'md:pl-64' : ''} transition-all duration-300 min-h-screen no-scrollbar`}>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
        <Route path="/calculator" element={<ProtectedRoute><Calculator /></ProtectedRoute>} />
        <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><LessonPlayer /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/roadmap/:id" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors overflow-x-hidden no-scrollbar">
          <Navigation />
          <MainContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
