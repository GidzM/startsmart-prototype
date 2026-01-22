
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (isLogin) {
      if (login(email, password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (signup(email, password)) {
        navigate('/dashboard');
      } else {
        setError('User already exists with this email');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display px-6 py-12">
      <div className="max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-10">
          <div className="size-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
            <span className="material-symbols-outlined text-background-dark text-4xl font-bold">real_estate_agent</span>
          </div>
          <h1 className="text-3xl font-black text-background-dark dark:text-white tracking-tighter">StartSmart</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Property Investment</p>
        </div>

        <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold transition-all border-b-2 ${isLogin ? 'text-primary border-primary' : 'text-gray-400 border-transparent'}`}
            >
              LOGIN
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold transition-all border-b-2 ${!isLogin ? 'text-primary border-primary' : 'text-gray-400 border-transparent'}`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none dark:text-white"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold ml-1 animate-pulse">
                {error}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-background-dark font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 mt-4"
            >
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          {isLogin && (
            <button className="w-full mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-primary transition-colors">
              Forgot Password?
            </button>
          )}
        </div>

        <p className="text-center mt-8 text-xs text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          By continuing, you agree to StartSmart's 
          <span className="text-primary font-bold"> Terms of Service</span> and <span className="text-primary font-bold">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Auth;
