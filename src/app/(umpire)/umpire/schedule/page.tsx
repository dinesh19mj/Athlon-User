'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MoreVertical, 
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Filter,
  Search,
  Activity
} from 'lucide-react';
import Link from 'next/link';

// Mock data for the schedule
const scheduledMatches = [
  {
    id: 'm1',
    time: '09:00 AM',
    status: 'UPCOMING',
    court: 'Court 1',
    category: 'Men\'s Singles',
    teamA: 'Alex Rivers',
    teamB: 'Jordan Lee',
    accent: 'border-red-500/30'
  },
  {
    id: 'm2',
    time: '10:30 AM',
    status: 'IN PROGRESS',
    court: 'Court 2',
    category: 'Women\'s Doubles',
    teamA: 'Smith / Davis',
    teamB: 'Chen / Wang',
    accent: 'border-blue-500/30'
  },
  {
    id: 'm3',
    time: '01:00 PM',
    status: 'UPCOMING',
    court: 'Court 1',
    category: 'Mixed Doubles',
    teamA: 'Taylor / Patel',
    teamB: 'Wilson / Garcia',
    accent: 'border-red-500/30'
  },
  {
    id: 'm4',
    time: '03:45 PM',
    status: 'UPCOMING',
    court: 'Center Court',
    category: 'Men\'s Singles - Final',
    teamA: 'TBD',
    teamB: 'TBD',
    accent: 'border-yellow-500/30'
  }
];

export default function UmpireSchedulePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'completed'>('today');

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="px-4 py-6 flex items-center justify-between shrink-0 relative z-10">
        <button onClick={() => router.push('/umpire')} className="p-3 -ml-3 text-white/70 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">Match Schedule</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <Calendar className="w-3 h-3 text-red-500" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Today</span>
          </div>
        </div>
        <button className="p-3 -mr-3 text-white/70 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-full">
          <Filter className="w-6 h-6" />
        </button>
      </header>

      {/* SEARCH BAR */}
      <div className="px-4 pb-4 relative z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input 
            type="text" 
            placeholder="Search players, courts..."
            className="w-full bg-[#121824] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)] transition-all shadow-xl"
          />
        </div>
      </div>

      {/* SEGMENTED TABS */}
      <div className="px-4 pb-6 shrink-0 relative z-10">
        <div className="flex bg-[#121824] border border-white/5 p-1.5 rounded-2xl shadow-xl">
          <button 
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'today' ? 'bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'upcoming' ? 'bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'completed' ? 'bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* MATCH LIST */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 hide-scrollbar space-y-4">
        {scheduledMatches.map((match, i) => (
          <div 
            key={match.id}
            className={`bg-[#121824] border ${match.accent} rounded-3xl p-5 shadow-xl animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${match.status === 'IN PROGRESS' ? 'bg-blue-500/20 text-blue-500' : 'bg-[#0A0F1A] border border-white/5 text-white/70'}`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">{match.time}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-0.5">{match.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0A0F1A] px-3 py-1.5 rounded-full border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span className="text-xs font-bold text-white/70">{match.court}</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{match.category}</span>
              </div>
              
              <div className="flex items-center justify-between bg-[#0A0F1A] p-4 rounded-2xl border border-white/5">
                <span className="text-sm font-bold text-white w-[40%] truncate">{match.teamA}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 shrink-0">VS</span>
                <span className="text-sm font-bold text-white w-[40%] text-right truncate">{match.teamB}</span>
              </div>
            </div>

            <Link 
              href="/umpire/setup"
              className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                match.status === 'IN PROGRESS' 
                ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20' 
                : 'bg-red-500 text-white shadow-[0_5px_20px_rgba(239,68,68,0.3)] hover:bg-red-400'
              }`}
            >
              {match.status === 'IN PROGRESS' ? (
                <>
                  <Activity className="w-4 h-4" /> Resume Scoring
                </>
              ) : (
                'Setup Match'
              )}
            </Link>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
