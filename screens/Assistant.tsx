
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

const FormattedMessage: React.FC<{ content: string; role: 'user' | 'assistant' }> = ({ content, role }) => {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
          return (
            <div key={i} className="flex gap-2 ml-2">
              <span className="text-primary">•</span>
              <span>{line.trim().substring(2).replace(/\*\*(.*?)\*\*/g, '$1')}</span>
            </div>
          );
        }
        
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const formattedLine = parts.map((part, index) => 
          index % 2 === 1 ? <strong key={index} className="font-black text-primary/90 dark:text-primary">{part}</strong> : part
        );

        return (
          <p key={i} className={line.trim() === '' ? 'h-2' : ''}>
            {formattedLine}
          </p>
        );
      })}
    </div>
  );
};

const Assistant: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your StartSmart AI Coach. I specialize in the Dubai property market. I can help you analyze ROI, calculate service charge impacts, or research specific areas like Marina or JVC. What's on your mind?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const analysisData = params.get('analyze');
    if (analysisData) {
      const data = JSON.parse(decodeURIComponent(analysisData));
      const prompt = `Lead Strategist, please analyze this Dubai property deal: 
      Purchase Price: AED ${data.price.toLocaleString()}, 
      Net Yield: ${data.netYield.toFixed(2)}%, 
      ROI: ${data.roi.toFixed(1)}%, 
      Annual Service Charges: AED ${data.serviceCharges.toLocaleString()}, 
      Total Invested: AED ${data.totalInvested.toLocaleString()}. 
      Is this a solid BTL investment for 2024? Highlight potential risks like service charge hikes or vacancy.`;
      
      setInput(prompt);
      navigate('/assistant', { replace: true });
    }
  }, [location]);

  const sendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const text = overrideInput || input;
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are the Lead Investment Strategist for StartSmart Property. You are a seasoned expert in the Dubai market. All financial advice should use AED. Focus on Net Yield vs Gross Yield. Mention DLD Fees (4%) and Agency Fees (2%) when discussing acquisitions. Be hyper-accurate and conservative. Use bullet points. If a user asks about a specific Dubai area, use Google Search to find current rental growth trends. Explain the 'Why' behind your analysis."
        }
      });

      const assistantContent = response.text || "I couldn't generate a response. Please try again.";
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = groundingChunks?.map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Source'
      })).filter((s: any) => s.uri) || [];

      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantContent,
        sources: sources.length > 0 ? sources : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble accessing current Dubai market data. Please verify your connection." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Highest net yields in Dubai 2024?",
    "Explain Dubai service charge math",
    "Mortgage rates for non-residents",
    "Business Bay vs Marina ROI"
  ];

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
      <header className="flex items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="ml-2 flex items-center gap-3">
          <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div>
            <h2 className="text-lg font-black leading-none dark:text-white tracking-tighter uppercase">StartSmart Strategist</h2>
            <div className="flex items-center gap-1 mt-1">
              <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Dubai Market Intel Active</span>
            </div>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 pb-40 scroll-smooth no-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-3xl shadow-sm text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-primary text-[#102216] rounded-tr-none font-bold' 
                : 'bg-white dark:bg-[#1a2e20] text-[#111813] dark:text-gray-100 border border-gray-100 dark:border-gray-800 rounded-tl-none'
            }`}>
              <FormattedMessage content={msg.content} role={msg.role} />
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[12px]">verified</span> Dubai Market Sources
                  </p>
                  <div className="flex flex-col gap-2">
                    {msg.sources.slice(0, 3).map((source, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 bg-gray-50/50 dark:bg-gray-800/50 px-3 py-2 rounded-xl text-[10px] text-primary hover:bg-primary/10 transition-colors border border-gray-200/50 dark:border-gray-700/50 group"
                      >
                        <span className="truncate font-bold dark:text-gray-300">{source.title}</span>
                        <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">open_in_new</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3 animate-pulse">
            <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">smart_toy</span>
            </div>
            <div className="bg-white dark:bg-[#1a2e20] h-12 w-2/3 rounded-3xl rounded-tl-none border border-gray-100 dark:border-gray-800"></div>
          </div>
        )}
      </main>

      <div className="fixed bottom-[88px] left-0 right-0 p-4 max-w-md mx-auto bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-20">
        {messages.length < 3 && !loading && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => sendMessage(undefined, s)}
                className="whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-[#61896f] dark:text-primary hover:border-primary transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={sendMessage} className="relative flex items-center shadow-2xl rounded-3xl overflow-hidden group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your Lead Strategist..."
            className="w-full bg-white dark:bg-gray-800 border-none py-5 pl-6 pr-16 text-sm focus:ring-0 outline-none dark:text-white placeholder:text-gray-400 font-medium"
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className={`absolute right-2 size-12 rounded-2xl flex items-center justify-center transition-all ${
              input.trim() ? 'bg-primary text-[#102216] shadow-lg shadow-primary/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
            }`}
          >
            <span className="material-symbols-outlined">arrow_upward</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Assistant;
