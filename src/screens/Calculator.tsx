
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Calculator: React.FC = () => {
  const navigate = useNavigate();
  
  const [purchasePrice, setPurchasePrice] = useState(1500000);
  const [renovation, setRenovation] = useState(50000);
  const [propertySize, setPropertySize] = useState(1200);
  const [serviceChargePerSqFt, setServiceChargePerSqFt] = useState(15);
  const [depositPercent, setDepositPercent] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [monthlyRent, setMonthlyRent] = useState(12000);
  const [otherExpenses, setOtherExpenses] = useState(500);

  const results = useMemo(() => {
						  
    const dldFee = purchasePrice * 0.04;
    const agencyFee = purchasePrice * 0.02;
	
    const depositAmount = (purchasePrice * depositPercent) / 100;
    const loanAmount = purchasePrice - depositAmount;
	
								  
    const totalInvested = depositAmount + dldFee + agencyFee + renovation;
	
						   
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
								  
    const monthlyMortgage = r > 0 ? loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;
					   
	
						 
    const annualServiceCharges = propertySize * serviceChargePerSqFt;
    const monthlyServiceCharges = annualServiceCharges / 12;
    const totalMonthlyExpenses = monthlyServiceCharges + otherExpenses;
	
					
    const monthlyCashflow = monthlyRent - monthlyMortgage - totalMonthlyExpenses;
    const roi = ((monthlyCashflow * 12) / totalInvested) * 100;
													   
	
								 
    const annualNetIncome = (monthlyRent * 12) - annualServiceCharges - (otherExpenses * 12);
    const netYield = (annualNetIncome / purchasePrice) * 100;

    return { monthlyCashflow, roi, netYield, totalInvested, dldFee, agencyFee, annualServiceCharges };
					  
		  
			   
					
			 
				
						  
	  
  }, [purchasePrice, renovation, propertySize, serviceChargePerSqFt, depositPercent, interestRate, loanTerm, monthlyRent, otherExpenses]);

  const handleAIAnalyze = () => {
    const data = {
      price: purchasePrice,
      roi: results.roi,
      netYield: results.netYield,
      rent: monthlyRent,
      serviceCharges: results.annualServiceCharges,
      totalInvested: results.totalInvested,
      currency: 'AED'
    };
    navigate(`/assistant?analyze=${encodeURIComponent(JSON.stringify(data))}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-40 transition-all no-scrollbar">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Dubai Real Estate 2026</p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Deal Analyzer</h1>
		 
																			   
        </div>
        <button onClick={() => navigate(-1)} className="md:hidden size-10 bg-white dark:bg-card-dark rounded-full flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-12 no-scrollbar">
          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 opacity-40">Acquisition Profile</h3>
            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
               <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Renovation Budget (AED)</p>
                   <span className="material-symbols-outlined text-primary">construction</span>
                </div>
                <input 
                  className="w-full bg-transparent border-none p-0 text-3xl md:text-4xl font-bold focus:ring-0 text-gray-900 dark:text-white" 
                  type="number" 
                  value={renovation}
                  onChange={(e) => setRenovation(Number(e.target.value))}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Purchase Price (AED)</p>
                   <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <input 
                  className="w-full bg-transparent border-none p-0 text-4xl md:text-5xl font-bold focus:ring-0 text-gray-900 dark:text-white" 
                  type="number" 
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                />					
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-[9px] font-bold uppercase text-gray-400 mb-1">DLD Fee (4%)</p>
                    <p className="font-bold">AED {results.dldFee.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-[9px] font-bold uppercase text-gray-400 mb-1">Agency (2%)</p>
                    <p className="font-bold">AED {results.agencyFee.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
			  

          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 opacity-40">Operational Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <label className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Internal Size (SqFt)</p>
                <input 
                  className="w-full bg-transparent border-none p-0 text-2xl font-bold focus:ring-0 text-gray-900 dark:text-white" 
                  value={propertySize}
                  onChange={(e) => setPropertySize(Number(e.target.value))}
                />
              </label>
              <label className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Service Charge / SqFt</p>
                <input 
                  className="w-full bg-transparent border-none p-0 text-2xl font-bold focus:ring-0 text-gray-900 dark:text-white" 
                  value={serviceChargePerSqFt}
                  onChange={(e) => setServiceChargePerSqFt(Number(e.target.value))}
                />
              </label>
              <label className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Other Expenses (AED/mo)</p>
                <input 
                  className="w-full bg-transparent border-none p-0 text-2xl font-bold focus:ring-0 text-gray-900 dark:text-white" 
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(Number(e.target.value))}
                />
              </label>
              <label className="bg-primary/5 dark:bg-[#1a2e20] p-6 rounded-2xl border border-primary/20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Monthly Market Rent (AED)</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary/50">AED</span>
                  <input 
                    className="flex-1 bg-transparent border-none p-0 text-4xl font-bold focus:ring-0 text-[#111813] dark:text-white" 
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  />
                </div>
              </label>
            </div>
          </section>
			  

          <section>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-6 opacity-40">Financing</h3>
            <div className="bg-white dark:bg-card-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-8">
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Equity Requirement</p>
                    <span className="text-primary font-bold px-4 py-1.5 bg-primary/10 rounded-lg">{depositPercent}%</span>
                  </div>
                  <input 
                    className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-primary" 
                    type="range" max="80" min="20" value={depositPercent}
                    onChange={(e) => setDepositPercent(Number(e.target.value))}
                  />
               </div>
               <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Interest Rate</p>
                    <input className="w-full bg-transparent border-none p-0 text-2xl font-bold focus:ring-0 text-gray-900 dark:text-white" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Loan Term (Yrs)</p>
                    <input className="w-full bg-transparent border-none p-0 text-2xl font-bold focus:ring-0 text-gray-900 dark:text-white" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} />
                  </div>
               </div>
            </div>
          </section>
        </div>
        {/* Right Side: Results (Sticky) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6 no-scrollbar">
          <div className="bg-[#111813] dark:bg-primary p-10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] text-white dark:text-[#111813] overflow-hidden relative">
            <div className="absolute top-0 right-0 size-64 bg-white/5 dark:bg-black/5 -translate-y-32 translate-x-32 rounded-full"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 mb-2">Net Monthly Cashflow</p>
                  <h4 className="text-5xl md:text-6xl font-bold tracking-tighter">AED {results.monthlyCashflow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
                </div>
                <div className="bg-primary dark:bg-black/20 text-black dark:text-primary px-6 py-3 rounded-xl flex flex-col items-center">
                   <p className="text-[9px] font-bold uppercase mb-1">Net Yield</p>
                   <p className="text-2xl font-bold">{results.netYield.toFixed(2)}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 dark:border-black/10">
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mb-1">ROI Est.</p>
                  <p className="text-2xl font-bold">{results.roi.toFixed(1)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase opacity-60 tracking-widest mb-1">Total Upfront</p>
                  <p className="text-2xl font-bold">AED {(results.totalInvested/1000).toFixed(0)}k</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-6">
                <button 
                  onClick={handleAIAnalyze}
                  className="w-full bg-white/10 dark:bg-black/10 backdrop-blur-md py-5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/5"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  Lead Strategist Analysis
                </button>
                <button className="w-full bg-primary dark:bg-black text-black dark:text-white py-5 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">
                  Generate PDF Deal Memo
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-card-dark p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
					   
										  
            <h5 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
				
              <span className="size-2 bg-yellow-500 rounded-full"></span> 
              SME Warning
            </h5>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              In the Dubai 2026 market, interest cover ratios below 1.25 are red flags for lenders. Always verify your "Other Expenses" with a local property manager to ensure net yield accuracy.
						   
					   
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
