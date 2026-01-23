
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TRACKS } from '../constants';
import { useAuth } from '../AuthContext';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPassword, setEditPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const success = updateUser({
      name: editName,
      email: editEmail,
      ...(editPassword ? { password: editPassword } : {})
    });

    if (success) {
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setIsEditing(false);
      setEditPassword('');
    } else {
      setMessage({ type: 'error', text: 'Email already exists or invalid data' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-40 transition-all no-scrollbar">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Portfolio Account</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Investor Profile</h1>
        </div>
               <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 text-gray-900 dark:text-white"
          >
            <span className="material-symbols-outlined text-sm">{isEditing ? 'close' : 'edit'}</span>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </header>

      {message && (
        <div className={`mb-6 p-4 rounded-xl text-xs font-bold uppercase tracking-widest border ${
          message.type === 'success' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start no-scrollbar">
        {/* Profile Sidebar */}
        <aside className="lg:col-span-4 space-y-8 no-scrollbar">
          <section className="bg-white dark:bg-card-dark p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
            <div className="size-32 rounded-full border-4 border-primary/20 p-1 mb-6 shadow-2xl">
              <div className="size-full bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
              </div>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="w-full space-y-4 text-left">
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</label>
                  <input 
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-3 text-sm font-bold"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                  <input 
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-3 text-sm font-bold"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">New Password (Optional)</label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-3 text-sm font-bold"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-primary text-black rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all mt-4"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <>
                <h3 className="text-2xl font-bold tracking-tight mb-1 text-gray-900 dark:text-white">{user?.name}</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">{user?.email}</p>
                
                <div className="w-full grid grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Joined</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">2024</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                    <p className="text-sm font-bold text-primary">Elite</p>
                  </div>
                </div>
              </>
            )}
          </section>

          <section className="bg-primary/5 dark:bg-[#1a2e20] p-8 rounded-2xl border border-primary/20 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span>
              Certification
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-6">
              You are currently on track to receive your "Dubai 2026 Strategic Investor" certification. Complete 2 more modules to unlock.
            </p>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: '80%' }}></div>
            </div>
          </section>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10 no-scrollbar">
          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 opacity-40">My Active Tracks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-scrollbar">
              {TRACKS.map((track) => {
                const progress = user?.progress?.[track.id] || 0;
                return (
                  <div key={track.id} className="bg-white dark:bg-card-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`size-14 rounded-xl flex items-center justify-center ${progress > 0 ? 'bg-primary/10 text-primary' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
                        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: progress > 0 ? "'FILL' 1" : "'FILL' 0" }}>
                          {track.icon}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        {track.category}
                      </span>
                    </div>
                    
                    <h4 className="text-xl font-bold tracking-tight mb-2 leading-tight">{track.title}</h4>
                    <p className="text-xs text-gray-400 font-medium mb-8 line-clamp-2">{track.description}</p>
                    
                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Progress</span>
                        <span className="text-xs font-bold text-primary">{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary shadow-[0_0_8px_rgba(19,236,91,0.5)]" style={{ width: `${progress}%` }}></div>
                      </div>
                      <button 
                        onClick={() => navigate(`/roadmap/${track.id}`)}
                        className="w-full py-4 bg-gray-50 dark:bg-gray-800 hover:bg-primary hover:text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-4"
                      >
                        {progress === 0 ? 'Initialize' : 'Resume'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <div className="relative overflow-hidden rounded-3xl h-64 shadow-2xl group cursor-pointer active:scale-[0.99] transition-all border border-white/5">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAreeilm_79PwBh-qUDOnKruiaoc_hC94sTfYArgkNSR5491eUBMOAZP9lBZ9SnrpAMl0STNIwU-hOJvKv5CsWbcaHuuEiZsTZXLalSDn-vThRR9ZWEnGO_PBXQnF_p772aI5BWYY0Ecp452jh1NWJoAicyrd7SkxJieDoOZGT8szOfH10iExjxlKCmEPnRNQRQpa0lyIS5sPHZZ3Pq2S36GrWPi7nqcpBlyFX2faVazx-ZAnRivo3kfYSPLlS8uCNcSkZdKUXqWe4')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                <div className="max-w-md">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Exclusive Strategy Masterclass</p>
                  <h5 className="text-white text-3xl font-bold tracking-tight leading-tight">Dubai 2026: The <br/>HMO Transformation</h5>
                </div>
                <button className="hidden md:flex bg-white text-black px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                  Enroll Early
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Library;
