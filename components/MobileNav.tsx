'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-down panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-2xl transition-all duration-300 ease-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">
          <Link href="/services/ntsa" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">NTSA Services</p>
              <p className="text-xs text-slate-500">Smart DL, Logbook, Renewals</p>
            </div>
          </Link>
          <Link href="/services/dci" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Good Conduct</p>
              <p className="text-xs text-slate-500">DCI Police Clearance Certificate</p>
            </div>
          </Link>
          <Link href="/services/brs" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Business Registration</p>
              <p className="text-xs text-slate-500">BRS, Company Names, CR12</p>
            </div>
          </Link>

          <div className="border-t border-slate-100 my-4"></div>

          <div className="flex gap-3">
            <Link href="/orders/track" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-sm font-bold transition-colors text-center">
              Track Order
            </Link>
            <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-500/20 transition-colors text-center">
              Agent Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
