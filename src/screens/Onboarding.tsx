
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background-light dark:bg-background-dark no-scrollbar overflow-hidden">
      
      {/* Hero Section: Top on Mobile/Tablet, Left on Desktop */}
      <section className="relative w-full lg:w-1/2 h-[40vh] md:h-[50vh] lg:h-full overflow-hidden flex-shrink-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-[10s] hover:scale-110" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCla-B-M2EvHLr1dsXrAM44bZlWJWOtfFfDYT2ApSllvTTLAzhIPUaIdrFrcD-AAiM0RJrboaQO2mcieKhz5T9CCFTlRCW8I-oqT97u8_xK-A9QU4WZYDLDwIb1HQamn7o7vuvA4jQ6VeCZmtXnGD_aQSpYr5tlTSXQXnOQppRovp2HuXcpZbmVJdbm4Pvwrlb4374MSlI3qTrp8Arc45Ly1abMAzJqMhSTvrLvXyu4LsDRfYyYd19mRXnkMKxiOLrB0B9OJuzRrTI")' }}
        >
          {/* Mobile/Tablet Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent lg:hidden"></div>
          {/* Desktop Gradient */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
        </div>
        
        {/* Mobile/Tablet Branding Overlay */}
        <header className="lg:hidden absolute top-0 left-0 right-0 flex items-center justify-between p-6 z-20">
          <div className="flex items-center gap-2">
             <div className="size-8 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-black text-lg font-black">real_estate_agent</span>
             </div>
             <h2 className="text-white lg:text-background-dark text-lg font-bold tracking-tighter">StartSmart</h2>
          </div>
          <span className="material-symbols-outlined text-white cursor-pointer opacity-70">info</span>
        </header>

        {/* Desktop Branding Overlay */}
        <div className="hidden lg:flex absolute top-12 left-12 items-center gap-3 z-20">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-xl shadow-primary/20">
            <span className="material-symbols-outlined text-black font-black">real_estate_agent</span>
          </div>
          <span className="text-white text-2xl font-bold tracking-tighter">StartSmart</span>
        </div>
      </section>

      {/* Content Section: Bottom on Mobile/Tablet, Right on Desktop */}
      <main className="flex-1 flex flex-col justify-center items-center lg:items-start w-full px-6 md:px-12 lg:px-20 py-8 lg:py-0 no-scrollbar bg-background-light dark:bg-background-dark z-10">
        <div className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
          <p className="hidden lg:block text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">Strategic Real Estate Academy</p>
          <h1 className="text-[#111813] dark:text-white tracking-tighter text-[40px] md:text-[64px] lg:text-[72px] font-bold leading-[0.95] pb-4 font-display">
            StartSmart <br className="hidden lg:block" /> Property
          </h1>
          <p className="text-[#4F5B52] dark:text-zinc-400 text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-md mx-auto lg:mx-0 pb-10">
            The professional roadmap to building a high-yielding property portfolio with modular learning and AI-driven deal analysis.
          </p>
        </div>

        {/* Strategic Pillars (Hidden on mobile, shown on Tablet & Desktop) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full max-w-xl lg:max-w-md mb-12 mx-auto lg:mx-0">
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
               <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white">AI ROI Engine</p>
              <p className="text-xs text-zinc-500 font-medium">Hyper-accurate 2026 yield projections grounded in live supply data.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
               <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white">Certified Strategists</p>
              <p className="text-xs text-zinc-500 font-medium">Courses led by SME investors with over AED 500M in managed assets.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0 flex flex-col gap-4">
          <button 
            onClick={() => navigate('/auth')}
            className="w-full bg-primary hover:bg-primary/90 text-[#102216] font-bold py-5 rounded-2xl transition-all font-display text-lg active:scale-95 shadow-2xl shadow-primary/20"
          >
            Get Started
          </button>
          <button 
             onClick={() => navigate('/auth')}
            className="w-full bg-transparent text-[#111813] dark:text-white font-bold py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-display text-sm"
          >
            Already a member? <span className="text-primary font-bold ml-1">Sign In</span>
          </button>
        </div>

        {/* Tablet/Mobile Page Indicator */}
        <div className="lg:hidden flex w-full flex-row items-center justify-center gap-2 py-10 mt-auto">
          <div className="h-1.5 w-8 rounded-full bg-primary shadow-[0_0_8px_rgba(19,236,91,0.5)]"></div>
          <div className="h-1.5 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="h-1.5 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
