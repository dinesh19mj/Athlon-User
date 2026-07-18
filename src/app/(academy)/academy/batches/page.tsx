'use client';

import { BookOpen, Plus, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function BatchesPage() {
  const batches = [
    { id: 1, name: 'Morning A', time: '06:00 AM - 08:00 AM', capacity: '20/24', coach: 'Vikram S.' },
    { id: 2, name: 'Evening B', time: '04:00 PM - 06:00 PM', capacity: '18/20', coach: 'Priya S.' },
    { id: 3, name: 'Elite Squad', time: '06:00 PM - 09:00 PM', capacity: '8/10', coach: 'Vikram S.' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Batches</h1>
          <p className="text-white/50 text-xs font-bold mt-1">Manage training schedules</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#A855F7] text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen className="w-24 h-24" />
            </div>
            
            <h3 className="font-black text-lg text-white mb-4 relative z-10">{batch.name}</h3>
            
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-3 text-white/70">
                <Clock className="w-4 h-4 text-[#A855F7]" />
                <span className="text-xs font-bold uppercase tracking-wider">{batch.time}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Users className="w-4 h-4 text-[#A855F7]" />
                <span className="text-xs font-bold uppercase tracking-wider">{batch.capacity} Students</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Assigned Coach</span>
                <span className="text-sm font-bold text-white">{batch.coach}</span>
              </div>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-bold text-white uppercase tracking-widest transition-colors">
                Manage
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
