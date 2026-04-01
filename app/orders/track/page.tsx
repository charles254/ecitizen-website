'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      router.push(`/orders/${orderId}/track`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20 font-sans">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-3xl mb-8 mx-auto animate-float">
             📦
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
            Track Your <span className="text-emerald-600">Order</span>
          </h1>
          <p className="text-slate-400 font-medium italic mb-10 leading-relaxed uppercase text-[10px] tracking-widest">
            "Enter your unique ORD reference code provided at submission."
          </p>

          <form onSubmit={handleTrack} className="space-y-6">
            <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Example: ORD-7741"
                  required
                  className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:bg-white focus:border-emerald-500/30 outline-none transition-all shadow-inner uppercase tracking-widest text-sm"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
                <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ⌨️
                </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 gradient-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 hover:-translate-y-1 transition-all active:scale-95"
            >
              Check Status →
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-slate-50 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Active Bridge Sync
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                   Need help? <Link href="https://wa.me/254700000000" className="text-emerald-600 hover:underline">Contact Support</Link>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
