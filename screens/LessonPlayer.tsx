
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LessonPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isCompleted, setIsCompleted] = useState(false);
  const [note, setNote] = useState('');

  const tabs = ['Overview', 'Resources', 'Notes', 'Discussion'];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-[#111813] dark:text-white transition-colors duration-200">
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50">
        <div 
          onClick={() => navigate(-1)}
          className="text-[#111813] dark:text-white flex size-12 shrink-0 items-center cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Video Lesson</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-12 bg-transparent text-[#111813] dark:text-white">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      <div 
        className="relative flex items-center justify-center bg-black aspect-video overflow-hidden" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAnlxIRTPYzZjYBIWhUdqIJ4IrOU-DZNBB76uucHU3GqpS0m0FsUN-qQRPNfKDSd3U-yJ8WrQRWWsryjCg9pGKQtoLJNEZ4Ey3Dl0x3CZEQW6yY7uNxreY4WqSZALw9ST-Ad_peCbXQ6IWHTO3Z70Zsl_M-AEGoMUxW3uWnv7yg65CNBPlzqdQCelysBpOPUqI8J2qlX_r-WtqN4MDA5UNMF5aWCllmXo7dHWt2RLrxfTanSYI-_EMbwfiXPxWyQGcfWPAgQ63tq-Y")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <button className="flex shrink-0 items-center justify-center rounded-full size-16 bg-primary text-black shadow-lg active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
        </button>
        <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex h-4 items-center justify-center mb-1">
            <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
            <div className="relative"><div className="absolute -left-2 -top-2 size-4 rounded-full bg-white shadow-md border-2 border-primary"></div></div>
            <div className="h-1.5 w-1/3 rounded-full bg-white/30"></div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white text-xs font-medium">05:12</p>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white text-sm">settings</span>
              <span className="material-symbols-outlined text-white text-sm">fullscreen</span>
              <p className="text-white text-xs font-medium">15:20</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 pb-40">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-wider pb-1">Module 3 • Lesson 4</p>
          <h3 className="text-[#111813] dark:text-white tracking-tight text-2xl font-bold leading-tight pb-2">Market Analysis: Identifying Growth Corridors</h3>
          <div className="flex items-center gap-2 text-[#61896f] dark:text-gray-400 text-sm">
            <span className="material-symbols-outlined text-base">visibility</span>
            <span>1.2k students completed</span>
          </div>
        </div>

        <div className="pb-2">
          <div className="flex border-b border-gray-200 dark:border-gray-700 gap-8 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 shrink-0 transition-colors ${
                  activeTab === tab ? 'border-b-primary text-[#111813] dark:text-white font-bold' : 'border-b-transparent text-[#61896f] dark:text-gray-400 font-bold'
                }`}
              >
                <p className="text-sm tracking-[0.015em]">{tab}</p>
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <h4 className="text-[#111813] dark:text-white font-bold text-lg mb-3">Lesson Summary</h4>
            <p className="text-[#111813]/80 dark:text-gray-300 text-sm leading-relaxed mb-4">
              In this lesson, we explore the data-driven approach to identifying suburbs poised for capital growth. We'll cover vacancy rates, inventory levels, and the ripple effect strategy.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-primary/10 p-3 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary">analytics</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#111813] dark:text-white">Next Step</p>
                  <p className="text-xs text-[#61896f] dark:text-gray-400">Complete the Market Data Sheet</p>
                </div>
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Resources' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[#111813] dark:text-white font-bold text-lg">Downloadable Resources</h4>
              <span className="text-xs font-bold text-primary">2 FILES</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-background-light dark:bg-gray-800 p-2 rounded">
                    <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111813] dark:text-white">Market Data Sheet.pdf</p>
                    <p className="text-[10px] text-[#61896f] dark:text-gray-400 uppercase">2.4 MB • Worksheet</p>
                  </div>
                </div>
                <button className="text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-background-light dark:bg-gray-800 p-2 rounded">
                    <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111813] dark:text-white">Suburb Checklist.pdf</p>
                    <p className="text-[10px] text-[#61896f] dark:text-gray-400 uppercase">1.1 MB • Checklist</p>
                  </div>
                </div>
                <button className="text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">download</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notes' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <h4 className="text-[#111813] dark:text-white font-bold text-lg mb-3">Your Lesson Notes</h4>
            <div className="relative">
              <textarea 
                className="w-full h-32 p-4 rounded-lg bg-background-light dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary/50 text-sm text-[#111813] dark:text-white placeholder:text-gray-400" 
                placeholder="Type your insights here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <div className="absolute bottom-3 right-3">
                <button className="bg-primary text-black text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-sm">save</span>
                  SAVE NOTE
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button className="flex-1 border border-gray-200 dark:border-gray-700 text-[#111813] dark:text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-white dark:bg-gray-900 shadow-sm active:scale-95 transition-transform">
            <span className="material-symbols-outlined">navigate_before</span>
            PREVIOUS
          </button>
          <button className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-[#111813] dark:text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform">
            NEXT LESSON
            <span className="material-symbols-outlined">navigate_next</span>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-8 pt-4 bg-gradient-to-t from-background-light via-background-light/95 to-transparent dark:from-background-dark dark:via-background-dark/95">
        <div className="max-w-screen-md mx-auto">
          <button 
            onClick={() => setIsCompleted(!isCompleted)}
            className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all duration-300 border ${
              isCompleted 
                ? 'bg-white dark:bg-gray-800 text-primary border-primary shadow-primary/10' 
                : 'bg-primary text-black border-primary shadow-primary/30 active:scale-[0.98]'
            }`}
          >
            <span className="material-symbols-outlined font-bold" style={{ fontVariationSettings: isCompleted ? "'FILL' 1" : "'FILL' 0" }}>
              check_circle
            </span>
            {isCompleted ? 'COMPLETED' : 'MARK AS COMPLETE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
