
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        await signup(name, email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(isLogin ? 'Invalid email or password' : 'User already exists with this email');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display px-6 py-12 no-scrollbar overflow-y-auto">
      <div className="max-w-md mx-auto w-full no-scrollbar">
        <div className="flex flex-col items-center mb-10">
          <div className="size-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
            <span className="material-symbols-outlined text-background-dark text-4xl font-bold">real_estate_agent</span>
          </div>
          <h1 className="text-3xl font-black text-background-dark dark:text-white tracking-tighter">StartSmart</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-1">Property Investment</p>
        </div>

        <div className="bg-white dark:bg-[#1a2e20] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold tracking-tight transition-all border-b-2 ${isLogin ? 'text-primary border-primary' : 'text-gray-400 border-transparent'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold tracking-tight transition-all border-b-2 ${!isLogin ? 'text-primary border-primary' : 'text-gray-400 border-transparent'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-6 py-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1 tracking-widest">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold ml-1 animate-pulse">
                {error}
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-5 rounded-xl shadow-xl transition-all active:scale-95 mt-4 text-base tracking-tight"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <button className="w-full mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest hover:text-primary transition-colors">
              Forgot Password?
            </button>
          )}
        </div>

        <p className="text-center mt-12 text-[10px] text-gray-400 leading-relaxed max-w-[280px] mx-auto font-medium">
          By continuing, you agree to StartSmart's 
          <span className="text-primary font-bold ml-1">Terms</span> and <span className="text-primary font-bold">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Auth;
