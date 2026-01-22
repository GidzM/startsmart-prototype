
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TRACKS } from '../constants';

const Roadmap: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const track = TRACKS.find(t => t.id === id) || TRACKS[0];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white min-h-screen pb-24">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[#111813] dark:text-white">arrow_back_ios</span>
            </button>
            <h2 className="text-[#111813] dark:text-white text-lg font-bold leading-tight">{track.title}</h2>
          </div>
          <div className="flex items-center">
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[#111813] dark:text-white">more_horiz</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <section className="p-4">
          <div className="bg-white dark:bg-[#1a2e20] p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-center">
                <p className="text-[#111813] dark:text-white text-base font-semibold">Your Roadmap Progress</p>
                <p className="text-[#111813] dark:text-white text-sm font-medium">{track.progress}% Complete</p>
              </div>
              <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${track.progress}%` }}></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[#61896f] text-xs font-medium">Progress saved</p>
                <button 
                  onClick={() => navigate('/lesson/intro')}
                  className="bg-primary text-[#102216] px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform"
                >
                  Continue Path
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4">
          <h3 className="text-[#111813] dark:text-white text-lg font-bold px-1 pb-4 pt-2">Strategy Steps</h3>
          <div className="relative">
            {track.steps.map((step, index) => (
              <div key={step.id} className="grid grid-cols-[40px_1fr] gap-x-4 mb-4">
                <div className="flex flex-col items-center">
                  {step.status === 'completed' ? (
                    <div className="bg-primary size-8 rounded-full flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-[#102216] text-[20px] font-bold">check</span>
                    </div>
                  ) : step.status === 'in-progress' ? (
                    <div className="bg-white dark:bg-background-dark border-4 border-primary size-8 rounded-full flex items-center justify-center z-10 shadow-[0_0_12px_rgba(19,236,91,0.4)]">
                      <div className="size-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="bg-gray-200 dark:bg-gray-800 size-8 rounded-full flex items-center justify-center z-10">
                      <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-[20px]">lock</span>
                    </div>
                  )}
                  {index < track.steps.length - 1 && (
                    <div className={`w-[2px] h-full -mt-1 ${step.status === 'completed' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'} opacity-40`}></div>
                  )}
                </div>
                
                <div className={`pb-6 ${step.status === 'locked' ? 'opacity-60' : ''}`}>
                  <div className={`p-4 rounded-xl border shadow-sm transition-all ${
                    step.status === 'in-progress' 
                      ? 'bg-white dark:bg-[#1a2e20] border-2 border-primary shadow-md' 
                      : 'bg-white dark:bg-[#1a2e20] border-gray-100 dark:border-gray-800 opacity-90'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`text-[#111813] dark:text-white font-bold ${step.status === 'in-progress' ? 'text-lg' : ''}`}>{step.title}</h4>
                      {step.status !== 'locked' && (
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          step.status === 'completed' ? 'bg-primary/20 text-primary' : 'bg-primary text-[#102216]'
                        }`}>
                          {step.status.replace('-', ' ')}
                        </span>
                      )}
                    </div>
                    
                    {step.imageUrl && (
                      <div 
                        className="w-full h-32 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg bg-cover bg-center" 
                        style={{ backgroundImage: `url("${step.imageUrl}")` }}
                      ></div>
                    )}

                    <p className={`text-sm leading-relaxed mb-4 ${step.status === 'in-progress' ? 'text-[#111813] dark:text-white' : 'text-[#61896f]'}`}>
                      {step.description}
                    </p>

                    {step.status === 'completed' ? (
                      <button className="flex items-center gap-1 text-primary text-sm font-semibold">
                        Review Lesson <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                    ) : step.status === 'in-progress' ? (
                      <div className="flex items-center justify-between">
                        <span className="text-[#61896f] text-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">schedule</span> {step.timeRemaining}
                        </span>
                        <button 
                          onClick={() => navigate('/lesson/active')}
                          className="bg-primary text-[#102216] px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform"
                        >
                          Resume Lesson
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 mt-4 pb-12">
          <div className="bg-gradient-to-br from-[#102216] to-[#1a2e20] p-6 rounded-2xl text-center shadow-xl">
            <h4 className="text-white font-bold text-lg mb-2">Need help with this path?</h4>
            <p className="text-primary/80 text-sm mb-4">Join our community of 5k+ investors mastering {track.title}.</p>
            <button className="w-full bg-white text-[#102216] font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform">
              Join Community Discord
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Roadmap;
