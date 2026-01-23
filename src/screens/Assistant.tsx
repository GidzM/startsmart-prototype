
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { uri: string; title: string }[];
}

const FormattedMessage: React.FC<{ content: string; role: 'user' | 'assistant' }> = ({ content }) => {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4 no-scrollbar">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;

        if (trimmed.includes('|') && (trimmed.startsWith('|') || trimmed.includes('-|-'))) {
          const cells = trimmed.split('|').filter(c => c.trim().length > 0);
          if (cells.length > 1) {
            return (
              <div key={i} className="flex flex-wrap gap-2 text-[10px] md:text-[11px] font-bold bg-gray-50 dark:bg-black/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                {cells.map((cell, cIdx) => (
                  <span key={cIdx} className="border-r border-gray-200 dark:border-gray-700 last:border-r-0 pr-3">
                    {cell.trim().replace(/\*\*(.*?)\*\*/g, '$1')}
                  </span>
                ))}
              </div>
            );
          }
          if (trimmed.includes('---')) return null;
        }

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={i} className="flex gap-4 ml-2">
              <span className="text-primary mt-1.5 font-bold">•</span>
              <span className="flex-1 font-medium leading-relaxed text-sm md:text-[15px]">{trimmed.substring(2).replace(/\*\*(.*?)\*\*/g, '$1')}</span>
            </div>
          );
        }
        
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const formattedLine = parts.map((part, index) => 
          index % 2 === 1 ? <strong key={index} className="font-bold text-primary/90 dark:text-primary">{part}</strong> : part
        );

        return (
          <p key={i} className="leading-relaxed font-medium text-sm md:text-[15px]">
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
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your StartSmart Lead Strategist. I'm connected to the Dubai 2026 market pulse. I can help you deep-dive into area ROIs, calculate the true cost of service charges, or plan your BRRRR cycle. What can I analyze for you today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [loading]);

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
      Is this a solid BTL investment for the 2026 cycle? Highlight specific risks like liquidity or vacancy trends in that price bracket.`;
      
      setInput(prompt);
      navigate('/assistant', { replace: true });
    }
  }, [location, navigate]);

															
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const sendMessage = async (e?: React.FormEvent, overrideInput?: string) => {
    if (e) e.preventDefault();
    const text = overrideInput || input;
    if (!text.trim() || loading) return;

    // Rate limiting: wait at least 5 seconds between requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < 5000) {
      setMessages(prev => [...prev, { 
        id: 'rate-limit-' + Date.now(),
        role: 'assistant', 
        content: "Please wait a few seconds before sending another message." 
      }]);
      return;
    }
    setLastRequestTime(now);

															  
						   
													   
									  
									  
						   
																			 
		  
			 
	 
							

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      console.log('API Key:', import.meta.env.VITE_API_KEY); // Debug line
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are the Lead Investment Strategist for StartSmart Property, a seasoned expert in the Dubai 2026 property market. All responses must be highly professional, conservative, and math-driven. Focus on 'Net Yield' over 'Gross Yield'. Mention Dubai-specific fees (4% DLD, 2% Agency) where relevant. Use bullet points for readability. If a user asks about an area, search for current 2026 data. Explain the 'Why' behind every strategic advice. Use spaced out, readable tables if needed. Ensure advice is actionable."
        }
      });

      const assistantContent = response.text || "I apologize, my market link is currently down. Please try again in a moment.";
	  
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = groundingChunks?.map((chunk: any) => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || 'Market Source'
      })).filter((s: any) => s.uri) || [];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
        sources: sources.length > 0 ? sources : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Gemini Assistant Error:', error);
      let errorMessage = "I'm having trouble retrieving 2026 data. Please check your connection.";
      
      // Specifically handle Quota/Rate Limit Errors (HTTP 429)
      if (error.message?.includes('429') || error.message?.toLowerCase().includes('quota')) {
        errorMessage = "Strategic Hub Busy: I've exceeded my current request quota for the 2026 market pulse. Please wait about 30-60 seconds before sending your next analysis request. Free tier limits are currently active.";
      }

      setMessages(prev => [...prev, { 
        id: 'error-' + Date.now(),
        role: 'assistant', 
        content: errorMessage 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "2026 Yields?",
    "BRRRR cycle",
    "Mortgage outlook",
    "JVC vs Marina ROI"
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-background-dark overflow-hidden relative no-scrollbar">
      <header className="flex items-center justify-between p-4 md:p-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 z-[110]">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="size-10 md:size-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-2xl md:text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold tracking-tighter">AI Strategist</h2>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[8px] md:text-[10px] font-bold uppercase text-gray-500 tracking-widest">Live 2026 Pulse</span>
            </div>
          </div>
        </div>
        <button onClick={() => navigate('/dashboard')} className="md:hidden size-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-10 space-y-12 pb-80 md:pb-64 no-scrollbar scroll-smooth max-w-5xl mx-auto w-full z-[50]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[92%] md:max-w-[80%] p-5 md:p-8 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-[#111813] text-primary rounded-tr-none font-bold' 
                : 'bg-gray-50 dark:bg-card-dark text-[#111813] dark:text-gray-100 border border-gray-100 dark:border-gray-800 rounded-tl-none'
            }`}>
              <FormattedMessage content={msg.content} role={msg.role} />
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-6 md:mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] md:text-[16px] text-primary">verified</span> Sources
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {msg.sources.slice(0, 4).map((source, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-3 bg-white dark:bg-gray-800 px-3 py-2.5 md:px-4 md:py-3 rounded-xl text-[9px] md:text-[10px] text-primary hover:bg-primary hover:text-white transition-all border border-gray-200 dark:border-gray-700 group"
                      >
                        <span className="truncate font-bold">{source.title}</span>
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
          <div className="flex items-start gap-4">
            <div className="size-10 md:size-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl md:text-3xl animate-bounce">smart_toy</span>
            </div>
            <div className="bg-gray-50 dark:bg-card-dark h-14 md:h-16 w-28 md:w-32 rounded-2xl rounded-tl-none flex items-center justify-center">
              <div className="flex gap-1.5 md:gap-2">
                <div className="size-1.5 md:size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="size-1.5 md:size-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="size-1.5 md:size-2 bg-primary/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom UI - Fixed to avoid overlapping sidebar on desktop/tablet */}
      <div className="fixed bottom-[88px] md:bottom-8 left-0 md:left-64 right-0 mx-auto w-full md:max-w-[calc(100%-16rem)] max-w-3xl px-4 md:px-6 z-[100]">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 md:pb-6 scroll-smooth flex-nowrap">
            {suggestions.map((s, i) => (
              <button 
                key={i} 
                onClick={() => sendMessage(undefined, s)}
                className="whitespace-nowrap flex-shrink-0 px-4 py-2 md:px-6 md:py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-primary hover:border-primary transition-all shadow-xl active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
		  
          <form onSubmit={sendMessage} className="relative flex items-center shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 w-full">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your Strategist..."
              className="w-full bg-transparent border-none py-4 md:py-7 pl-6 md:pl-10 pr-16 md:pr-24 text-sm md:text-base focus:ring-0 outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className={`absolute right-2 md:right-3 size-12 md:size-16 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${
                input.trim() ? 'bg-primary text-[#102216] shadow-lg scale-100' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 scale-90'
              }`}
            >
              <span className="material-symbols-outlined text-xl md:text-2xl font-bold">arrow_upward</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
