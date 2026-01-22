
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center bg-transparent p-4 pb-2 justify-between">
        <div className="w-10"></div>
        <h2 className="text-[#111813] dark:text-white text-lg font-black leading-tight tracking-tighter flex-1 text-center font-display">StartSmart</h2>
        <div className="w-10 flex justify-end">
          <span className="material-symbols-outlined text-[#111813] dark:text-white cursor-pointer">info</span>
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full px-4">
        <div className="w-full">
          <div className="py-3">
            <div 
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white dark:bg-zinc-800 rounded-3xl min-h-[380px] shadow-2xl border border-zinc-100 dark:border-zinc-800" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCla-B-M2EvHLr1dsXrAM44bZlWJWOtfFfDYT2ApSllvTTLAzhIPUaIdrFrcD-AAiM0RJrboaQO2mcieKhz5T9CCFTlRCW8I-oqT97u8_xK-A9QU4WZYDLDwIb1HQamn7o7vuvA4jQ6VeCZmtXnGD_aQSpYr5tlTSXQXnOQppRovp2HuXcpZbmVJdbm4Pvwrlb4374MSlI3qTrp8Arc45Ly1abMAzJqMhSTvrLvXyu4LsDRfYyYd19mRXnkMKxiOLrB0B9OJuzRrTI")' }}
            >
              <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-[#111813] dark:text-white tracking-tighter text-[36px] font-black leading-tight px-4 text-center pb-3 pt-8 font-display">
            StartSmart <br/> Property
          </h1>
        </div>

        <div className="w-full">
          <p className="text-[#4F5B52] dark:text-zinc-400 text-sm font-medium leading-relaxed pb-6 pt-1 px-8 text-center font-display">
            The professional roadmap to building a high-yielding property portfolio with modular learning.
          </p>
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-2 py-4">
          <div className="h-1.5 w-8 rounded-full bg-primary"></div>
          <div className="h-1.5 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="h-1.5 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
        </div>
      </main>

      <footer className="p-6 pb-12 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate('/auth')}
            className="w-full bg-primary hover:bg-primary/90 text-[#102216] font-black py-4 rounded-xl transition-all font-display text-lg active:scale-95 shadow-xl shadow-primary/20"
          >
            Get Started
          </button>
          <button 
             onClick={() => navigate('/auth')}
            className="w-full bg-transparent text-[#111813] dark:text-white font-bold py-2 rounded-xl border border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-display"
          >
            Already a member? <span className="text-primary font-black">Sign In</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
