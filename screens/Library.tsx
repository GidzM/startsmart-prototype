
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TRACKS } from '../constants';
import { useAuth } from '../AuthContext';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white min-h-screen pb-24 transition-colors duration-300">
      <header className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <div 
          onClick={() => navigate(-1)}
          className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
        <h2 className="text-gray-900 dark:text-white text-lg font-black tracking-tighter flex-1 text-center pr-10">Profile & Library</h2>
      </header>

      <main className="max-w-md mx-auto flex flex-col flex-1 pb-10">
        <section className="px-4 py-8 flex flex-col items-center border-b border-gray-100 dark:border-gray-800 mb-4">
          <div className="size-24 rounded-full border-4 border-primary/20 p-1 mb-4 shadow-xl">
            <div className="size-full bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-5xl">person</span>
            </div>
          </div>
          <h3 className="text-2xl font-black tracking-tight">{user?.email.split('@')[0]}</h3>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">{user?.email}</p>
          
          <button 
            onClick={handleLogout}
            className="mt-6 px-6 py-2 rounded-xl border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </section>

        <div className="px-4 pt-4 pb-2">
          <h3 className="text-gray-900 dark:text-white tracking-tighter text-2xl font-black leading-tight">My Active Tracks</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Synced to your profile</p>
        </div>

        {TRACKS.map((track) => {
          const progress = user?.progress?.[track.id] || 0;
          return (
            <div key={track.id} className="p-4">
              <div className="flex flex-col gap-4 rounded-3xl bg-white dark:bg-[#1a2e20] p-6 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                        track.category === 'Strategy' ? 'bg-primary/20 text-emerald-700 dark:text-primary' :
                        track.category === 'Development' ? 'bg-primary/20 text-emerald-700 dark:text-primary' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {track.category}
                      </span>
                      <span className="text-gray-400 text-[10px] font-bold uppercase">{track.modulesCount} Modules</span>
                    </div>
                    <h4 className="text-gray-900 dark:text-white text-xl font-black leading-tight tracking-tight mb-1">{track.title}</h4>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${progress > 0 ? 'bg-primary/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <span className={`material-symbols-outlined text-3xl ${progress > 0 ? 'text-primary' : 'text-gray-400'}`} style={{ fontVariationSettings: progress > 0 ? "'FILL' 1" : "'FILL' 0" }}>
                      {track.icon}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">Progress</p>
                    <p className={`${progress > 0 ? 'text-primary' : 'text-gray-400'} text-xs font-black uppercase`}>
                      {progress > 0 ? `${progress}%` : 'Not Started'}
                    </p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-inner">
                    <div className="h-full rounded-full bg-primary transition-all duration-1000 shadow-[0_0_8px_rgba(19,236,91,0.3)]" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/roadmap/${track.id}`)}
                  className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 gap-2 text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${
                    progress === 0 
                      ? 'border-2 border-primary text-gray-900 dark:text-white hover:bg-primary/5' 
                      : progress === 100 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'bg-primary text-background-dark shadow-lg shadow-primary/20'
                  }`}
                >
                  <span>{progress === 0 ? 'Start Training' : 'Continue'}</span>
                  <span className="material-symbols-outlined text-base">
                    {progress === 0 ? 'play_circle' : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}

        <div className="p-4 pt-2">
          <div className="relative overflow-hidden rounded-3xl h-52 group cursor-pointer active:scale-[0.98] transition-all shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAreeilm_79PwBh-qUDOnKruiaoc_hC94sTfYArgkNSR5491eUBMOAZP9lBZ9SnrpAMl0STNIwU-hOJvKv5CsWbcaHuuEiZsTZXLalSDn-vThRR9ZWEnGO_PBXQnF_p772aI5BWYY0Ecp452jh1NWJoAicyrd7SkxJieDoOZGT8szOfH10iExjxlKCmEPnRNQRQpa0lyIS5sPHZZ3Pq2S36GrWPi7nqcpBlyFX2faVazx-ZAnRivo3kfYSPLlS8uCNcSkZdKUXqWe4')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1.5">New Exclusive Release</p>
              <h5 className="text-white text-2xl font-black tracking-tight leading-tight">The HMO <br/>Masterclass</h5>
              <div className="flex items-center gap-3 mt-4">
                 <button className="bg-white text-background-dark px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Enroll Now</button>
                 <span className="text-white/60 text-[10px] font-bold">12 Lessons • 4 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
