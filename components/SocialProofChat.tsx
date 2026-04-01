'use client';

import React, { useState, useEffect } from 'react';

const mockActions = [
  { city: 'Nairobi', service: 'NTSA Smart DL Renewal', time: '2 mins ago', icon: '🚗' },
  { city: 'Mombasa', service: 'Certificate of Good Conduct', time: '5 mins ago', icon: '📜' },
  { city: 'Kisumu', service: 'Business Registration', time: 'just now', icon: '🏢' },
  { city: 'Nakuru', service: 'DL Replacement', time: '1 min ago', icon: '🪪' },
  { city: 'Eldoret', service: 'CR12 Search', time: '8 mins ago', icon: '🔍' },
  { city: 'Thika', service: 'Logbook Transfer', time: '4 mins ago', icon: '📄' },
  { city: 'Kisii', service: 'Marriage Certificate', time: '12 mins ago', icon: '💍' },
  { city: 'Malindi', service: 'Foreigner Certificate', time: '20 mins ago', icon: '🌍' },
];

const SocialProofChat = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (hasClosed) return;

    // Initial delay before showing first notification
    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    const interval = setInterval(() => {
      setVisible(false);
      
      // Wait for exit animation then change content
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % mockActions.length);
        if (!hasClosed) setVisible(true);
      }, 1000);

    }, 12000); // Show every 12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [hasClosed]);

  const handleClose = () => {
    setVisible(false);
    setHasClosed(true);
  };

  const action = mockActions[currentIdx];

  if (!mounted) return null;
  if (hasClosed && !visible) return null;

  return (
    <div 
      className={`fixed bottom-20 left-4 md:bottom-8 md:left-8 z-[100] transition-all duration-700 ease-out transform hidden sm:block ${
        visible ? 'translate-y-0 opacity-100 scale-100 rotate-0' : 'translate-y-20 opacity-0 scale-90 -rotate-2 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl md:rounded-2xl blur opacity-15 group-hover:opacity-30 transition-opacity duration-500"></div>
        
        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-2.5 md:gap-3 w-[240px] md:w-[280px]">
          {/* Avatar / Icon */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl shadow-inner ring-1 ring-emerald-500/20">
              {action.icon}
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Verified Activity</p>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tight whitespace-nowrap">{action.time}</p>
            </div>
            <p className="text-slate-100 text-[11px] leading-tight font-medium">
              Someone in <span className="text-white font-bold">{action.city}</span> just applied for <span className="text-emerald-400 font-bold">{action.service}</span>
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex -space-x-1.5">
                {[1, 2, 3].map((i) => (
                   <div key={i} className={`w-3 h-3 rounded-full border border-slate-900 bg-slate-800 overflow-hidden`}>
                      <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700"></div>
                   </div>
                ))}
              </div>
              <span className="text-[8px] text-slate-400 font-semibold">+14.2k active users</span>
            </div>
          </div>

          <button 
            onClick={handleClose}
            className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-white p-1.5 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
            aria-label="Close"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialProofChat;
