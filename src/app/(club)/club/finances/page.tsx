'use client';

import { DollarSign, TrendingDown, Receipt } from 'lucide-react';
import Link from 'next/link';

export default function FinancesPage() {
  const transactions = [
    { id: 1, desc: 'Court Booking - Court 1', type: 'Expense', amount: 1200, date: 'Today, 10:30 AM' },
    { id: 2, desc: 'Monthly Member Fee - Arjun', type: 'Income', amount: 2500, date: 'Yesterday' },
    { id: 3, name: 'Shuttle Tubes (x2)', type: 'Expense', amount: 3000, date: '12 Jul 2026' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex flex-col gap-6 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Finances</h1>
          <p className="text-white/50 text-xs font-bold mt-1">Court fees & shuttle expenses</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 flex flex-col">
            <span className="text-[9px] font-black text-green-500 uppercase tracking-widest mb-1">Income</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">₹15.2k</span>
            </div>
            <span className="text-[10px] text-green-500 font-bold mt-2">Member Fees</span>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex flex-col">
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">Expenses</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">₹4.2k</span>
            </div>
            <span className="text-[10px] text-red-500 font-bold mt-2 flex items-center gap-1"><TrendingDown className="w-3 h-3" /> Courts & Shuttles</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 pl-1">Recent Ledger</h2>
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Receipt className="w-4 h-4 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{tx.desc || tx.name}</h3>
                <p className="text-[9px] text-white/50 uppercase tracking-wider">{tx.date}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`font-black ${tx.type === 'Income' ? 'text-green-500' : 'text-red-500'}`}>
                {tx.type === 'Income' ? '+' : '-'}₹{tx.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
