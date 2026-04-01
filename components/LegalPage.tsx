import React from 'react';
import Link from 'next/link';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-10">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-12 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-sm font-bold uppercase tracking-widest">Back to Hub</span>
        </Link>
        
        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="gradient-brand p-12 text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{title}</h1>
            <p className="text-white/70 text-sm font-bold uppercase tracking-[0.2em]">Effective Date: {lastUpdated}</p>
          </div>
          
          <div className="p-12 prose prose-slate max-w-none">
            {children}
          </div>
          
          <div className="bg-slate-50 p-8 border-t border-slate-100 text-center">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
              If you have any questions regarding our legal terms, please contact <br/>
              <span className="text-slate-900 mt-2 block">support@ecitizen-cyber.co.ke</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
