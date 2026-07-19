'use client';

import { Swords, Plus, Calendar } from 'lucide-react';

export default function MatchesPage() {
  const matches = [
    { id: 1, p1: 'Arjun P.', p2: 'Raj K.', score: '21-18, 21-15', status: 'Completed', winner: 'p1' },
    { id: 2, p1: 'Neha G.', p2: 'Priya S.', score: '15-21, 10-21', status: 'Completed', winner: 'p2' },
    { id: 3, p1: 'Team A', p2: 'Team B', score: 'Ongoing', status: 'Live', winner: null },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Practice Matches</h1>
          <p className="text-white/50 text-xs font-bold mt-1">Log daily match updates</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#06B6D4] text-[#0A0F1A] shadow-[0_4px_20px_rgba(6,182,212,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 hide-scrollbar">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#06B6D4]" />
          <span className="text-sm font-bold text-white">Today, 18 Jul</span>
        </div>

        {matches.map((match) => (
          <div key={match.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
              <Swords className="w-24 h-24" />
            </div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                match.status === 'Live' ? 'bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse' : 'bg-white/5 text-white/50 border border-white/10'
              }`}>
                {match.status}
              </span>
              <span className="text-[10px] font-bold text-[#06B6D4]">Update Score</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1 text-center">
                <h3 className={`font-black text-lg ${match.winner === 'p1' ? 'text-[#06B6D4]' : 'text-white'}`}>{match.p1}</h3>
              </div>
              <div className="px-4">
                <span className="text-xs font-black text-white/20 uppercase tracking-widest">VS</span>
              </div>
              <div className="flex-1 text-center">
                <h3 className={`font-black text-lg ${match.winner === 'p2' ? 'text-[#06B6D4]' : 'text-white'}`}>{match.p2}</h3>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-center relative z-10">
              <span className="text-sm font-bold text-white tracking-widest">{match.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
