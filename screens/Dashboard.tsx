
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { useAuth } from '../AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [marketTip, setMarketTip] = useState<{ title: string; content: string } | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);

  // Use user progress or default to demo
  const courseProgress = user?.progress?.['c2'] || 75;
  const firstName = user?.email.split('@')[0] || 'Investor';

  useEffect(() => {
    const fetchMarketTip = async () => {
      setLoadingTip(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Generate a short, practical, 2-sentence Dubai property investment market tip for 2024. Mention areas like Business Bay, JVC, or Dubai Hills. Format as JSON with 'title' and 'content' keys.",
          config: {
            responseMimeType: "application/json",
          }
        });
        const data = JSON.parse(response.text);
        setMarketTip(data);
      } catch (error) {
        console.error("Failed to fetch tip", error);
        setMarketTip({
          title: 'Focus on JVC Net Yields',
          content: 'Jumeirah Village Circle continues to lead for buy-to-let investors with net yields often exceeding 7%. Ensure you account for the higher service charges in premium towers.'
        });
      } finally {
        setLoadingTip(false);
      }
    };

    fetchMarketTip();
  }, []);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-24 transition-colors duration-300">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary/20 bg-gray-100">
            <span className="material-symbols-outlined text-primary m-auto">account_circle</span>
          </div>
          <h2 className="text-[#111813] dark:text-white text-lg font-black tracking-tighter flex-1 ml-3 font-display">StartSmart</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#111813] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-md mx-auto">
        <div className="px-4 pt-6 pb-2">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Dubai Investment Hub</p>
          <h1 className="text-3xl font-black text-[#111813] dark:text-white tracking-tight">Ahlan, {firstName}!</h1>
        </div>

        <section className="p-4">
          <div className="flex flex-col items-stretch justify-start rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1a2e20] overflow-hidden">
            <div 
              className="w-full bg-center bg-no-repeat aspect-[21/9] bg-cover relative" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCS5PvKoqPr5T3qzG4xHTxiMB2-Ums0Y-cv2ND1NvYIE9Zv_vHdHeEOabDjhC2HDzWPskBlc3zpLZ08r5keAdVqorxzTTC4XQ_zElZJh43uyLEtp6knufOa_pzW6i6CEb4bkL5C8ZdJYyQ-QnwWduiLUy-RyGTFPcveUGQQGmzUEZPF5wy3ZV0Xo-AjfQwEgYNBX-kNpPjYqAkDNVBoy3o92TD44hbpNI19VTmcmoZfUtGVi3cdNnB7eNL5NtfXmWhTh8zHIP4MA5s")' }}
            >
              <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-5">
                 <p className="text-white text-xl font-black font-display tracking-tight uppercase italic">Portfolio Growth</p>
              </div>
            </div>
            <div className="flex w-full flex-col items-stretch justify-center gap-4 p-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-3 justify-between">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#61896f] dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">Training Progress</p>
                    <p className="text-[#111813] dark:text-white text-lg font-black tracking-tight">{courseProgress}% Mastery</p>
                  </div>
                  <button className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-9 px-4 bg-primary text-[#111813] text-xs font-black shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                    <span className="truncate">RESUME</span>
                  </button>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full mt-1 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(19,236,91,0.5)]" style={{ width: `${courseProgress}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-2">
          <div className="flex items-center justify-between px-4 pb-3 pt-4">
            <h2 className="text-[#111813] dark:text-white text-xl font-black font-display tracking-tighter">Active Strategy</h2>
            <button onClick={() => navigate('/catalog')} className="text-primary text-xs font-bold uppercase tracking-widest">All Courses</button>
          </div>
          <div className="px-4">
            <div className="flex items-stretch justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#1a2e20] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex flex-[2_2_0px] flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[#111813] dark:text-white text-lg font-black leading-tight tracking-tight">Dubai BTL Roadmap</p>
                  <p className="text-[#61896f] dark:text-gray-400 text-xs font-bold uppercase tracking-widest">Unit 3: Net Yield Math</p>
                </div>
                <button 
                  onClick={() => navigate('/lesson/c3-l3')}
                  className="flex items-center justify-center rounded-xl h-10 px-4 bg-primary/10 text-[#111813] dark:text-primary gap-2 text-xs font-black w-fit mt-4 border border-primary/20"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>play_circle</span>
                  <span className="truncate uppercase">Continue</span>
                </button>
              </div>
              <div 
                className="w-24 h-24 sm:w-28 sm:h-28 bg-center bg-no-repeat bg-cover rounded-2xl shrink-0 shadow-inner" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDFNIjE874TOXi4kz8sqFNsdZuwSvHwUtXuKn6I8uyut6q0QTwkZncDFPxE3dW1cZjOkwhgHsj1qp5IbwYI2XHzmu2cuoPDU27K-UG_pb9xpFvfYJKm77P6x8VHSRQsuhZQvPq7jOGtoV-nnkxZpJKejJy6DtVKH4GdR2KIMaqmp2em0am49auFEEpr-JMyAbcP-9XCPChQAFHfQjRYGfaSZvVEOoJbHDACpuPuvBOW75KFAgySRbvfXbROhoKnqPocOWWD8ABaqZI")' }}
              ></div>
            </div>
          </div>
        </section>

        <section className="mt-6 px-4">
          <h2 className="text-[#111813] dark:text-white text-xl font-black font-display tracking-tighter pb-3">Dubai Market Intelligence</h2>
          <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/20 dark:bg-[#1a2e20] min-h-[160px] flex flex-col justify-center shadow-lg">
            {loadingTip ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-primary/20 rounded-2xl text-primary shadow-inner">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[#111813] dark:text-white text-lg font-black tracking-tight leading-tight">{marketTip?.title}</p>
                    <p className="text-[#61896f] dark:text-gray-300 text-sm font-medium leading-relaxed">
                      {marketTip?.content}
                    </p>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-primary/10 flex justify-between items-center">
                   <div className="flex -space-x-1.5">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="size-5 rounded-full border-2 border-white dark:border-background-dark bg-gray-200" style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i+10}')`, backgroundSize: 'cover' }}></div>
                      ))}
                      <span className="text-[9px] text-gray-500 font-bold ml-2 self-center">Updated for Dubai 2024</span>
                   </div>
                  <button className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">
                    Share <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>share</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="mt-6 px-4 grid grid-cols-2 gap-4 pb-12">
          <div 
            onClick={() => navigate('/calculator')}
            className="bg-white dark:bg-[#1a2e20] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center gap-3 cursor-pointer active:scale-95 transition-all shadow-sm hover:shadow-md"
          >
            <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>calculate</span>
            </div>
            <p className="text-sm font-black text-[#111813] dark:text-white tracking-tight uppercase">Yield Calc</p>
          </div>
          <div 
            className="bg-white dark:bg-[#1a2e20] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center gap-3 cursor-pointer active:scale-95 transition-all shadow-sm hover:shadow-md"
          >
            <div className="size-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>forum</span>
            </div>
            <p className="text-sm font-black text-[#111813] dark:text-white tracking-tight uppercase">Community</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
