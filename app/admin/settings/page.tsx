'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ServiceWithCategory {
  id: string;
  title: string;
  price: number;
  agentCommission: number;
  category: {
    name: string;
  };
}

export default function CommissionSettings() {
  const [services, setServices] = useState<ServiceWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/settings/commissions')
      .then(res => res.json())
      .then(data => {
        if (data.success) setServices(data.services);
        setLoading(false);
      });
  }, []);

  const updateCommission = async (serviceId: string, value: string) => {
    setSaving(serviceId);
    try {
        const res = await fetch('/api/admin/settings/commissions', {
            method: 'PATCH',
            body: JSON.stringify({ serviceId, agentCommission: value })
        });
        if (res.ok) {
            setServices(services.map(s => s.id === serviceId ? { ...s, agentCommission: parseFloat(value) } : s));
        }
    } catch (err) {
        console.error(err);
    } finally {
        setSaving(null);
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">LOADING SETTINGS...</div>;

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
              <Link href="/admin/reports" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>📈</span> Financials
              </Link>
              <Link href="/admin/settings" className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-xl font-bold">
                  <span>⚙️</span> Settings
              </Link>
          </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 leading-tight">Agent Commissions</h1>
            <p className="text-slate-500 font-medium">Set how much agents earn per completed service.</p>
        </header>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <tr>
                        <th className="p-8">Service Name</th>
                        <th className="p-8">Category</th>
                        <th className="p-8">Customer Price (Ksh)</th>
                        <th className="p-8">Agent Commission (Ksh)</th>
                        <th className="p-8">Your Profit (Ksh)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {services.map((service) => (
                        <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-8 font-bold text-slate-900">{service.title}</td>
                            <td className="p-8">
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                    {service.category.name}
                                </span>
                            </td>
                            <td className="p-8 font-black text-slate-900">{service.price}</td>
                            <td className="p-8">
                                <div className="relative flex items-center gap-3">
                                    <input 
                                        type="number" 
                                        defaultValue={service.agentCommission}
                                        onBlur={(e) => updateCommission(service.id, e.target.value)}
                                        className="w-24 bg-slate-50 border border-slate-200 p-3 rounded-xl font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                    />
                                    {saving === service.id && (
                                        <span className="text-[10px] text-primary font-black animate-pulse uppercase tracking-widest">Saving...</span>
                                    )}
                                </div>
                            </td>
                            <td className="p-8">
                                <div className="flex flex-col">
                                    <span className="text-emerald-600 font-black">Ksh {service.price - service.agentCommission}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Net Margin</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-xl">💡</div>
                <p className="text-sm font-medium text-slate-300">Net Margin is calculated as <span className="text-white font-bold">Customer Price - Agent Commission</span>. This is your pure profit before server costs.</p>
            </div>
            <button className="bg-primary hover:bg-primary/90 px-6 py-3 rounded-xl font-black text-sm transition-all whitespace-nowrap">
                Save All Changes
            </button>
        </div>
      </main>
    </div>
  );
}
