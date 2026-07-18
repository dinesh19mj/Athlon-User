'use client';

import Link from 'next/link';
import { Trophy, Calendar, Users, ChevronRight, PlusCircle, Settings, ArrowLeft } from 'lucide-react';

const mockTournaments = [
  { id: 1, name: 'Summer Slam 2026', status: 'ACTIVE', dates: 'Jul 20 - Jul 25', participants: 128 },
  { id: 2, name: 'City Finals', status: 'DRAFT', dates: 'Aug 10 - Aug 12', participants: 0 },
  { id: 3, name: 'Spring Open', status: 'COMPLETED', dates: 'Mar 01 - Mar 05', participants: 256 },
];

export default function OrganizerTournamentsPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white font-sans p-4 md:p-8 pb-32">
      
      {/* Header */}
      <header className="mb-6 mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/organizer" className="p-2 -ml-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-black uppercase tracking-wide">
            My Tournaments
          </h1>
        </div>
        <button className="hidden md:flex bg-[#1B9C56] text-black font-bold py-2 px-4 rounded-xl items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(27,156,86,0.3)]">
          <PlusCircle className="w-5 h-5" /> New Tournament
        </button>
      </header>

      {/* Tournaments List */}
      <div className="space-y-4">
        {mockTournaments.map((tournament) => (
          <div key={tournament.id} className="bg-[#121824] border border-white/5 rounded-2xl p-5 shadow-xl hover:border-white/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0A0F1A] flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">
                  <Trophy className={`w-6 h-6 ${tournament.status === 'ACTIVE' ? 'text-[#1B9C56]' : 'text-white/40'}`} />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight">{tournament.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      tournament.status === 'ACTIVE' ? 'bg-[#1B9C56]/20 text-[#1B9C56] border border-[#1B9C56]/30' : 
                      tournament.status === 'COMPLETED' ? 'bg-white/10 text-white/60 border border-white/10' :
                      'bg-orange-500/20 text-orange-500 border border-orange-500/30'
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 bg-[#0A0F1A] rounded-xl p-3 border border-white/5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/40" />
                <span className="text-xs font-semibold text-white/70">{tournament.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/40" />
                <span className="text-xs font-semibold text-white/70">{tournament.participants} Players</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
              <Link href={`/organizer/tournaments/${tournament.id}`} className="flex items-center gap-1 text-[#1B9C56] text-xs font-bold hover:underline">
                MANAGE TOURNAMENT <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
