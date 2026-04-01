'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ReportStats {
  summary: {
    totalRevenue: number;
    totalCommission: number;
    netProfit: number;
  };
  chartData: {
    date: string;
    revenue: number;
    profit: number;
  }[];
}

export default function ReportsPage() {
  const [stats, setStats] = useState<ReportStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports')
      .then(res => res.json())
      .then((data: ReportStats & { success: boolean }) => {
        if (data.success) {
          setStats(data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center font-black animate-pulse">GENERATING FINANCIALS...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-primary rounded shadow-lg"></div>
              <span className="font-black tracking-tight text-xl uppercase">Agent<span className="text-primary">Pro</span></span>
          </div>
          <nav className="space-y-2">
              <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>📊</span> Overview
              </Link>
              <Link href="/admin/customers" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>👤</span> Customers
              </Link>
              <Link href="/admin/reports" className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-xl font-bold">
                  <span>📈</span> Financials
              </Link>
          </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-10 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-black text-slate-900">Profitability Report</h1>
                <p className="text-slate-500 font-medium">Last 30 days performance analysis</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 flex items-center gap-3">
                <span className="text-green-500 font-bold">●</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Data Sync</span>
            </div>
        </header>

        {/* Big Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-10 -mt-10"></div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Gross Revenue</p>
                <h3 className="text-4xl font-black text-slate-900 leading-none">Ksh {stats?.summary.totalRevenue.toLocaleString()}</h3>
                <div className="mt-6 flex items-center gap-2 text-green-500 font-bold text-xs">
                    <span>↑ 12%</span>
                    <span className="text-slate-300 font-medium">from last month</span>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full -mr-10 -mt-10"></div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Agent Commissions</p>
                <h3 className="text-4xl font-black text-slate-900 leading-none">Ksh {stats?.summary.totalCommission.toLocaleString()}</h3>
                <div className="mt-6 flex items-center gap-2 text-rose-500 font-bold text-xs">
                    <span>↓ 4%</span>
                    <span className="text-slate-300 font-medium">payout liability</span>
                </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Net Profit (Take Home)</p>
                <h3 className="text-4xl font-black text-white leading-none">Ksh {stats?.summary.netProfit.toLocaleString()}</h3>
                <div className="mt-6 flex items-center gap-2 text-primary font-bold text-xs">
                    <span>★ Premium Margin</span>
                </div>
            </div>
        </div>

        {/* Daily Performance Mini-Chart (Visual Representation) */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Daily Revenue Velocity
            </h2>
            <div className="h-64 flex items-end gap-3 px-4">
                {stats?.chartData.map((day, i) => (
                    <div key={i} className="flex-1 group relative">
                        <div 
                            className="w-full bg-slate-100 group-hover:bg-primary/20 rounded-t-xl transition-all relative overflow-hidden"
                            style={{ height: `${(day.revenue / Math.max(...stats.chartData.map((d) => d.revenue))) * 100}%` }}
                        >
                            <div 
                                className="absolute bottom-0 left-0 w-full bg-primary rounded-t-xl opacity-80"
                                style={{ height: `${(day.profit / day.revenue) * 100}%` }}
                            ></div>
                        </div>
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            {day.date}: Ksh {day.revenue}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-between px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                <span>Start Month</span>
                <span>Today</span>
            </div>
        </div>
      </main>
    </div>
  );
}
