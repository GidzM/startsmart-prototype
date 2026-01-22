
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
    // Dubai Specific Fees
    const dldFee = purchasePrice * 0.04;
    const agencyFee = purchasePrice * 0.02;
    
    const depositAmount = (purchasePrice * depositPercent) / 100;
    const loanAmount = purchasePrice - depositAmount;
    
    // Total cash required upfront
    const totalInvested = depositAmount + dldFee + agencyFee + renovation;
    
    // Mortgage Calculation
    const r = interestRate / 100 / 12;
    const n = loanTerm * 12;
    const monthlyMortgage = r > 0 
      ? loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : loanAmount / n;
    
    // Operating Expenses
    const annualServiceCharges = propertySize * serviceChargePerSqFt;
    const monthlyServiceCharges = annualServiceCharges / 12;
    const totalMonthlyExpenses = monthlyServiceCharges + otherExpenses;
    
    // Profitability
    const monthlyCashflow = monthlyRent - monthlyMortgage - totalMonthlyExpenses;
    const annualCashflow = monthlyCashflow * 12;
    const roi = (annualCashflow / totalInvested) * 100;
    
    // Net Yield (Dubai Standard)
    const annualNetIncome = (monthlyRent * 12) - annualServiceCharges - (otherExpenses * 12);
    const netYield = (annualNetIncome / purchasePrice) * 100;

    return {
      monthlyCashflow,
      roi,
      netYield,
      totalInvested,
      dldFee,
      agencyFee,
      annualServiceCharges
    };
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
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-72 transition-colors duration-300">
      <div className="sticky top-0 z-50 flex items-center bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 p-4 justify-between h-16">
        <div 
          onClick={() => navigate(-1)}
          className="text-gray-900 dark:text-white flex size-10 items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10 font-display uppercase italic">Dubai Deal Analyzer</h2>
      </div>

      <main className="max-w-md mx-auto">
        <h3 className="text-gray-900 dark:text-white text-lg font-black leading-tight tracking-[-0.015em] px-4 pb-2 pt-6 font-display">Property Acquisition</h3>
        
        <div className="p-4">
          <div className="flex flex-col items-stretch justify-start rounded-2xl shadow-sm bg-white dark:bg-[#1a2e20] border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="flex w-full grow flex-col items-stretch justify-center gap-4 p-5">
              <div className="flex items-center justify-between">
                <p className="text-gray-900 dark:text-white text-sm font-black uppercase tracking-widest opacity-70">Purchase Price</p>
                <div className="flex items-center gap-1 text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  AED
                </div>
              </div>
              <div className="relative">
                <input 
                  className="w-full px-4 py-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-2xl font-black focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                  type="number" 
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DLD Fee (4%)</p>
                  <p className="text-sm font-bold dark:text-gray-200">AED {results.dldFee.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Agency (2%)</p>
                  <p className="text-sm font-bold dark:text-gray-200">AED {results.agencyFee.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4 px-4 py-2">
          <label className="flex flex-col min-w-[140px] flex-1">
            <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest pb-2 ml-1">Renovation/Fit-out</p>
            <div className="relative">
              <input 
                className="w-full rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1a2e20] h-14 px-4 text-sm font-bold" 
                value={renovation}
                onChange={(e) => setRenovation(Number(e.target.value))}
              />
            </div>
          </label>
        </div>

        <h3 className="text-gray-900 dark:text-white text-lg font-black leading-tight tracking-[-0.015em] px-4 pb-2 pt-6 font-display">Dubai Operating Costs</h3>
        <div className="px-4 grid grid-cols-2 gap-4">
          <label className="flex flex-col">
            <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest pb-2 ml-1">Size (SqFt)</p>
            <input 
              className="w-full rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1a2e20] h-14 px-4 text-sm font-bold" 
              value={propertySize}
              onChange={(e) => setPropertySize(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col">
            <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest pb-2 ml-1">AED/SqFt Charge</p>
            <input 
              className="w-full rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1a2e20] h-14 px-4 text-sm font-bold" 
              value={serviceChargePerSqFt}
              onChange={(e) => setServiceChargePerSqFt(Number(e.target.value))}
            />
          </label>
        </div>

        <h3 className="text-gray-900 dark:text-white text-lg font-black leading-tight tracking-[-0.015em] px-4 pb-2 pt-6 font-display">Financing</h3>
        <div className="px-4">
          <div className="bg-white dark:bg-[#1a2e20] rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">Down Payment</p>
                <span className="text-primary font-black">{depositPercent}%</span>
              </div>
              <input 
                className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
                max="80" min="20" type="range" 
                value={depositPercent}
                onChange={(e) => setDepositPercent(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest pb-2">Rate (%)</p>
                <input 
                  className="w-full rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-12 px-4 text-sm font-bold" 
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col">
                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest pb-2">Years</p>
                <input 
                  className="w-full rounded-xl text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 h-12 px-4 text-sm font-bold" 
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </div>

        <h3 className="text-gray-900 dark:text-white text-lg font-black leading-tight tracking-[-0.015em] px-4 pb-2 pt-6 font-display">Expected Income</h3>
        <div className="px-4 space-y-3 pb-20">
          <div className="flex items-center gap-4 bg-white dark:bg-[#1a2e20] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="bg-primary/10 p-3 rounded-xl">
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white text-xs font-black uppercase tracking-widest opacity-60">Monthly Rent (AED)</p>
              <input 
                className="w-full bg-transparent border-none p-0 text-xl font-black dark:text-white focus:ring-0" 
                type="number" 
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light/95 dark:from-background-dark dark:via-background-dark/95 to-transparent z-40">
        <div className="bg-[#111813] dark:bg-primary rounded-3xl shadow-2xl p-6 text-white dark:text-[#111813] max-w-lg mx-auto relative border border-white/10 overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Monthly Net Cashflow</p>
                <h4 className="text-3xl font-black tracking-tighter">AED {results.monthlyCashflow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h4>
              </div>
              <div className="bg-primary dark:bg-[#111813] text-[#111813] dark:text-primary px-4 py-2 rounded-2xl flex flex-col items-center shadow-lg">
                <span className="text-[9px] font-black uppercase tracking-tighter">Net Yield</span>
                <span className="text-lg font-black leading-none">{results.netYield.toFixed(2)}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 dark:border-black/10 pt-4 mb-6">
              <div>
                <p className="text-[9px] font-black opacity-60 uppercase tracking-widest">Est. ROI</p>
                <p className="text-base font-black">{results.roi.toFixed(1)}%</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black opacity-60 uppercase tracking-widest">Total Cash Required</p>
                <p className="text-base font-black">AED {(results.totalInvested/1000).toFixed(0)}k</p>
              </div>
            </div>

            <div className="flex gap-3">
               <button 
                 onClick={handleAIAnalyze}
                 className="flex-1 bg-white/10 dark:bg-black/10 backdrop-blur-md py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
               >
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                AI STRATEGY CHECK
              </button>
              <button className="flex-1 bg-primary dark:bg-black text-[#111813] dark:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl">
                <span className="material-symbols-outlined text-sm">download</span>
                EXPORT DEAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
