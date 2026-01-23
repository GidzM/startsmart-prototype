import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../AuthContext';

const CACHE_KEY = 'ss_market_tip_cache';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [marketTip, setMarketTip] = useState<{ title: string; content: string } | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);

  const courseProgress = user?.progress?.['c2'] || 75;
  const firstName = user?.name ? user.name.split(' ')[0] : (user?.email.split('@')[0] || 'Investor');

  useEffect(() => {
    const fetchMarketTip = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setMarketTip(data);
          return;
        }
      }

      setLoadingTip(true);
      try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Generate a short, practical, 2-sentence Dubai property investment market tip for 2026. Mention areas like Business Bay, JVC, or Dubai Hills. Format as JSON with 'title' and 'content' keys.",
          config: { responseMimeType: "application/json" }
        });
        
        const data = JSON.parse(response.text || '{}');
        if (data.title && data.content) {
          setMarketTip(data);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        } else {
          throw new Error('Invalid AI response');
        }
      } catch (error) {
        console.error('Gemini API Error:', error);
        setMarketTip({
          title: '2026 Dubai Investment Strategy',
          content: 'Focus on acquiring high-yield apartments in Business Bay and JVC, where you can capitalize on the sustained demand for integrated lifestyle communities. In 2026, the completion of major infrastructure projects near Business Bay will likely drive further capital appreciation for strategic commercial and residential holdings.'
        });
      } finally {
        setLoadingTip(false);
      }
    };

    fetchMarketTip();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32 md:pb-8 transition-all no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Portfolio Strategist v2.6</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111813] dark:text-white">Ahlan, {firstName}!</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-card-dark p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 leading-none">Net Worth Target</p>
              <p className="text-sm font-bold mt-1 text-gray-900 dark:text-white">AED 12.5M</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <section className="relative overflow-hidden rounded-3xl shadow-xl group border border-white/10">
            <div 
              className="w-full aspect-[21/9] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCS5PvKoqPr5T3qzG4xHTxiMB2-Ums0Y-cv2ND1NvYIE9Zv_vHdHeEOabDjhC2HTxiMB2-Ums0Y-cv2ND1NvYIE9Zv_vHdHeEOabDjhC2HDzWPskBlc3zpLZ08r5keAdVqorxzTTC4XQ_zElZJh43uyLEtp6knufOa_pzW6i6CEb4bkL5C8ZdJYyQ-QnwWduiLUy-RyGTFPcveUGQQGmzUEZPF5wy3ZV0Xo-AjfQwEgYNBX-kNpPjYqAkDNVBoy3o92TD44hbpNI19VTmcmoZfUtGVi3cdNnB7eNL5NtfXmWhTh8zHIP4MA5s")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2">Dubai Yield Mastery</h3>
                  <div className="flex items-center gap-4 text-white/70 text-xs font-bold">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 12h Remaining</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-primary">verified</span> Advanced Strategy</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/catalog')}
                  className="bg-primary text-black px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/30 active:scale-95 transition-all whitespace-nowrap"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Active Strategy</h4>
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>
              <p className="text-[#61896f] dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Dubai BTL Roadmap</p>
              <p className="text-base font-bold mb-6 text-gray-900 dark:text-white">Unit 3: Net Yield Math</p>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  <span>Course Progress</span>
                  <span>{courseProgress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary shadow-[0_0_10px_rgba(19,236,91,0.5)]" style={{ width: `${courseProgress}%` }}></div>
                </div>
              </div>
            </div>

            <div 
              onClick={() => navigate('/calculator')}
              className="bg-primary p-6 rounded-2xl border border-primary/20 shadow-lg cursor-pointer hover:scale-[1.02] transition-all group"
            >
              <div className="size-12 bg-black/10 rounded-xl flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl text-black">calculate</span>
              </div>
              <h4 className="text-lg font-bold tracking-tight text-black mb-2">Deal Analyzer 2026</h4>
              <p className="text-black/70 text-xs font-medium leading-relaxed">Instantly calculate net yield and ROI for your next acquisition.</p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black">
                Explore Tool <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className="space-y-6">
          <section className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h4 className="text-base font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Market Intelligence</h4>
            {loadingTip ? (
              <div className="flex items-start gap-3 animate-pulse">
                <div className="size-10 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xs mb-1 text-gray-900 dark:text-white">{marketTip?.title}</p>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{marketTip?.content}</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-[9px] font-bold uppercase tracking-widest text-primary border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  Full Market Report 2026
                </button>
              </div>
            )}
          </section>

          <section className="bg-[#0a1f12] text-white p-6 rounded-2xl shadow-xl border border-white/5">
            <h4 className="text-base font-bold tracking-tight mb-4 text-primary">Premium Community</h4>
            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="size-9 rounded-full border-2 border-[#0a1f12] bg-cover" style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i+10}')` }}></div>
              ))}
              <div className="size-9 rounded-full border-2 border-[#0a1f12] bg-primary flex items-center justify-center text-black text-[9px] font-bold">+450</div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">Connect with high-net-worth investors specializing in the Dubai growth corridors.</p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">group</span>
              Access Members Area
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;