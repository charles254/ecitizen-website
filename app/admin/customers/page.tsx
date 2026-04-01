'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CustomerManagement() {
  const [customers] = useState([
    { id: '1', name: 'David Kamau', email: 'david@example.com', phone: '254712345678', idNumber: '12345678', kraPin: 'A123456789B', totalOrders: 5 },
    { id: '2', name: 'Sarah Wanjiku', email: 'sarah@example.com', phone: '254722334455', idNumber: '87654321', kraPin: 'P987654321X', totalOrders: 2 },
    { id: '3', name: 'Peter Omari', email: 'peter@example.com', phone: '254733445566', idNumber: '11223344', kraPin: 'A009988776Z', totalOrders: 1 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.idNumber.includes(searchTerm) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 bg-primary rounded shadow-lg"></div>
              <span className="font-black tracking-tight text-xl uppercase">Agent<span className="text-primary">Pro</span></span>
          </div>
          <nav className="space-y-2">
              <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>📊</span> Overview
              </Link>
              <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>📦</span> Orders
              </Link>
              <Link href="/admin/customers" className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-xl font-bold">
                  <span>👤</span> Customers
              </Link>
              <Link href="/admin/reports" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>📉</span> Financials
              </Link>
              <Link href="/admin/settings" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl text-slate-400 transition-colors">
                  <span>⚙️</span> Settings
              </Link>
          </nav>
      </aside>

      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center sticky top-0 z-20">
            <h1 className="text-2xl font-black text-slate-800">Customer Management</h1>
            <div className="flex items-center gap-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search ID, Name or Phone..." 
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all">
                    + New Customer
                </button>
            </div>
        </header>

        <div className="p-8">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">ID / KRA</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Activity</th>
                            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                                            {customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{customer.name}</p>
                                            <p className="text-xs text-slate-400">Client ID: #{customer.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-slate-600 font-medium">ID: <span className="text-slate-900">{customer.idNumber}</span></p>
                                        <p className="text-slate-600 font-medium">KRA: <span className="text-slate-900">{customer.kraPin}</span></p>
                                    </div>
                                </td>
                                <td className="p-6 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-slate-900 font-bold">+{customer.phone}</p>
                                        <p className="text-slate-400 text-xs italic">{customer.email}</p>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {customer.totalOrders} Orders
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <button className="text-slate-400 hover:text-primary transition-colors font-black text-sm p-2">
                                        View Profile »
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCustomers.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-slate-400 italic">No customers found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}
