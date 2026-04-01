'use client';
import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ revenue: 0, active: 0, pendingOtp: 0, completed: 0 });
  const [filter, setFilter] = useState('ALL');
  // rerender-transitions: Use useTransition for non-urgent data fetching updates
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await fetch(`/api/admin/orders?status=${filter}`);
            const data = await res.json();
            if (data.success) {
                startTransition(() => {
                    setOrders(data.orders);
                    setStats(prev => ({
                        ...prev,
                        revenue: data.stats.revenue,
                        active: data.stats.active,
                        pendingOtp: data.stats.pendingOtp
                    }));
                });
            }
        } catch (err) {
            console.error("Dashboard fetch failed", err);
        }
    };
    fetchData();
  }, [filter]);

  const statsDisplay = [
    { label: 'Total Revenue', value: `Ksh ${stats.revenue.toLocaleString()}`, icon: '💰', color: 'bg-emerald-500' },
    { label: 'Active Orders', value: stats.active.toString(), icon: '📦', color: 'bg-emerald-500' },
    { label: 'Pending OTPs', value: stats.pendingOtp.toString(), icon: '🔑', color: 'bg-amber-500' },
    { label: 'Completed Today', value: '28', icon: '✅', color: 'bg-purple-500' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Premium Sidebar */}
      <aside className="w-72 bg-slate-900 text-white fixed h-full z-30 shadow-2xl transition-premium">
          <div className="p-8 flex items-center gap-3">
              <div className="w-10 h-10 gradient-brand rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 rotate-3 group-hover:rotate-0 transition-transform">
                  <span className="font-black text-white italic">C</span>
              </div>
              <div>
                  <h1 className="font-black text-xl tracking-tighter uppercase">Agent<span className="text-emerald-500">Pro</span></h1>
                  <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Network Live</span>
                  </div>
              </div>
          </div>

          <nav className="mt-8 px-4 space-y-2">
              <Link href="/admin/dashboard" className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-emerald-600/10 text-emerald-500 font-black text-sm border-r-4 border-emerald-600 transition-premium shadow-sm">
                  <span className="text-xl">📊</span> Overview
              </Link>
              <Link href="/admin/customers" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 font-bold text-sm transition-premium group">
                  <span className="text-xl group-hover:scale-110 transition-transform">👥</span> Customers
              </Link>
              <Link href="/admin/reports" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 font-bold text-sm transition-premium group">
                  <span className="text-xl group-hover:scale-110 transition-transform">📉</span> Financials
              </Link>
              <Link href="/admin/settings" className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-400 hover:bg-white/5 font-bold text-sm transition-premium group">
                  <span className="text-xl group-hover:scale-110 transition-transform">⚙️</span> Settings
              </Link>
          </nav>

          <div className="absolute bottom-8 left-4 right-4 p-6 bg-white/5 rounded-[2rem] border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-emerald-500/30"></div>
                  <div>
                      <p className="text-xs font-black text-white">Agent Kiptoo</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Master Admin</p>
                  </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-colors">
                  Logout Session
              </button>
          </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8">
        <header className="flex justify-between items-end mb-8">
            <div>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-2">Operational Dashboard</p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Command Center</h2>
            </div>
            <div className="flex gap-4">
                <div className="relative">
                    <input type="text" placeholder="Search orders..." className="pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-sm font-medium w-80 outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 transition-all" />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                </div>
                <button className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl hover:-translate-y-1 transition-premium">
                    🔔
                </button>
            </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
             {statsDisplay.map((stat: any, i: number) => (
                 <div key={i} className="bg-white p-5 rounded-2xl border border-slate-50 shadow-sm relative overflow-hidden group hover:shadow-xl transition-premium">
                    <div className="absolute -right-4 -top-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-8xl">{stat.icon}</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                    <div className="mt-4 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${stat.color} animate-pulse`}></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time sync</span>
                    </div>
                 </div>
             ))}
        </div>

        {/* Filters and Queue */}
        <div className="bg-white p-6 rounded-2xl border border-slate-50 shadow-sm">
            <div className="flex justify-between items-center mb-10">
                <div className="flex gap-4 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                    {['ALL', 'PENDING', 'PAID', 'COMPLETED'].map((f) => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-premium ${filter === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">Sort by:</span>
                    <select className="bg-transparent font-black text-xs uppercase tracking-widest outline-none">
                        <option>Recent First</option>
                        <option>Oldest First</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="group relative bg-white hover:bg-slate-50 p-6 rounded-[2rem] border border-slate-100 transition-premium flex items-center justify-between card-hover-effect">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-xl shadow-lg shadow-emerald-500/10 group-hover:rotate-6 transition-transform">
                                {order.service.includes('DL') ? '🚗' : order.service.includes('Conduct') ? '👮' : order.service.includes('Reg') ? '🏢' : '📦'}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-black text-slate-900">{order.service}</h4>
                                    <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">{order.id}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <p className="text-sm font-bold text-slate-500">{order.customer}</p>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <p className="text-xs text-slate-400 font-medium">{order.time}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="text-right">
                                <p className="text-lg font-black text-slate-900">Ksh {order.amount}</p>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Verified Payment</p>
                            </div>
                            
                            <div className="flex gap-2">
                                <button title="WhatsApp Client" className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-premium shadow-sm">
                                    📳
                                </button>
                                <button title="SMS Fallback" className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-premium shadow-sm">
                                    💬
                                </button>
                                <button title="Process OTP" className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-premium shadow-sm">
                                    🔑
                                </button>
                                <button title="Mark Complete" className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-premium shadow-sm">
                                    ✔️
                                </button>
                            </div>
                            
                            <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                                order.status === 'COMPLETED' ? 'bg-emerald-500 text-white' : 
                                order.status === 'PAID' ? 'bg-emerald-600 text-white' : 
                                order.status === 'AWAITING_OTP' ? 'bg-amber-500 text-white animate-pulse' : 
                                'bg-slate-100 text-slate-400'
                            }`}>
                                {order.status.replace('_', ' ')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Live Stream Section Overlay */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-900 p-6 rounded-2xl text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 gradient-brand opacity-10 blur-[100px] group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <span className="w-2 h-8 gradient-brand rounded-full"></span>
                    Live OTP Stream
                </h3>
                <div className="space-y-4">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center blur-[1px] hover:blur-none transition-all cursor-not-allowed">
                        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Waiting for citizen submission...</span>
                        <div className="w-2 h-2 bg-slate-600 rounded-full animate-ping"></div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] text-center mt-4">Bridge Active: ws://localhost:3001</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-50 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <span className="w-2 h-8 bg-emerald-600 rounded-full"></span>
                    Service Distribution
                </h3>
                <div className="space-y-6">
                    {[
                        { name: 'NTSA Services', count: 45, color: 'bg-emerald-500' },
                        { name: 'DCI (Good Conduct)', count: 32, color: 'bg-emerald-500' },
                        { name: 'BRS Business', count: 18, color: 'bg-amber-500' },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                                <span>{item.name}</span>
                                <span>{item.count}%</span>
                            </div>
                            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                                    style={{ width: `${item.count}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
