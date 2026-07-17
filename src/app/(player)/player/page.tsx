'use client';

import Link from 'next/link';
import { Calendar, ChevronRight, Trophy, TrendingUp, Activity, MapPin } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

const upcomingMatches = [
  { id: 'match-101', tournament: 'Summer Slam 2026', date: 'Today, 2:00 PM', opponent: 'John Doe', court: 'Center Court', status: 'Next up' },
  { id: 'match-102', tournament: 'Summer Slam 2026', date: 'Tomorrow, 10:00 AM', opponent: 'Jane Smith', court: 'TBD', status: 'Scheduled' },
];

export default function PlayerDashboardPage() {
  const { userEmail } = useAuthStore();
  const displayName = userEmail ? userEmail.split('@')[0] : 'Player';

  return (
    <div className="pb-8">
      {/* Hero Header */}
      <header className="relative bg-[#0A0E17] pt-12 pb-20 px-4 md:px-8 overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-(--primary)/20 via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-(--success) animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Online</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-white tracking-tight">
              Welcome back, <span className="text-(--primary) capitalize">{displayName}</span>
            </h1>
            <p className="text-white/60 text-lg">Ready to dominate the court today?</p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px]">
              <p className="text-2xl font-black text-white">4</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Rank</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center min-w-[100px]">
              <p className="text-2xl font-black text-(--primary)">12</p>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Points</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        
        {/* Next Match Highlight */}
        <section className="mb-10">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold">Up Next</h2>
            <Link href="/player/matches" className="text-(--primary) text-sm font-semibold hover:underline flex items-center">
              View schedule <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {upcomingMatches.length > 0 ? upcomingMatches.map((match, index) => (
              <div 
                key={match.id} 
                className={`rounded-[24px] overflow-hidden border ${
                  index === 0 
                    ? 'bg-(--surface) border-(--primary)/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
                    : 'bg-(--bg) border-(--border)'
                } flex flex-col md:flex-row active:scale-[0.99] transition-transform cursor-pointer md:hover:border-(--primary)/50 group`}
              >
                {/* Time / Status Banner */}
                <div className={`md:w-48 p-6 flex flex-col justify-center ${
                  index === 0 ? 'bg-(--primary)/10 border-b md:border-b-0 md:border-r border-(--primary)/20' : 'bg-(--surface-elevated) border-b md:border-b-0 md:border-r border-(--border)'
                }`}>
                  <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${index === 0 ? 'text-(--primary)' : 'text-(--text-muted)'}`}>
                    {match.status}
                  </span>
                  <div className="font-bold text-xl">{match.date.split(',')[0]}</div>
                  <div className="text-(--text-muted) font-semibold">{match.date.split(',')[1]}</div>
                </div>
                
                {/* Match Details */}
                <div className="p-6 flex-1 flex flex-col justify-between relative">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                    <ChevronRight className="w-6 h-6 text-(--text-muted)" />
                  </div>
                  
                  <div>
                    <h3 className="font-extrabold text-2xl mb-1">{match.tournament}</h3>
                    <p className="text-(--text-muted) font-medium text-sm flex items-center gap-1.5 mb-4">
                      <MapPin className="w-4 h-4" /> {match.court}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-(--bg) border border-(--border) w-fit px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-(--text-muted)">vs</span>
                    <span className="font-bold">{match.opponent}</span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-(--surface) border border-(--border) border-dashed rounded-[24px] p-12 text-center flex flex-col items-center">
                <Calendar className="w-12 h-12 text-(--text-muted) mb-4" />
                <h3 className="font-bold text-lg mb-1">No upcoming matches</h3>
                <p className="text-(--text-muted) text-sm">You haven't been scheduled for any matches yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/player/tournaments" className="bg-(--surface) border border-(--border) rounded-2xl p-6 hover:border-(--primary)/50 hover:bg-(--surface-elevated) transition-all group">
              <Trophy className="w-8 h-8 text-(--text-muted) group-hover:text-(--primary) transition-colors mb-4" />
              <h3 className="font-bold mb-1">Tournaments</h3>
              <p className="text-xs text-(--text-muted)">Find & register</p>
            </Link>
            
            <Link href="/player/rankings" className="bg-(--surface) border border-(--border) rounded-2xl p-6 hover:border-(--primary)/50 hover:bg-(--surface-elevated) transition-all group">
              <TrendingUp className="w-8 h-8 text-(--text-muted) group-hover:text-(--info) transition-colors mb-4" />
              <h3 className="font-bold mb-1">Leaderboards</h3>
              <p className="text-xs text-(--text-muted)">View rankings</p>
            </Link>
            
            <Link href="/player/matches" className="bg-(--surface) border border-(--border) rounded-2xl p-6 hover:border-(--primary)/50 hover:bg-(--surface-elevated) transition-all group">
              <Activity className="w-8 h-8 text-(--text-muted) group-hover:text-(--live) transition-colors mb-4" />
              <h3 className="font-bold mb-1">Match History</h3>
              <p className="text-xs text-(--text-muted)">Past results</p>
            </Link>
            
            <div className="bg-[linear-gradient(45deg,transparent,rgba(204,255,0,0.05))] border border-(--primary)/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-(--primary)/5 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
              <h3 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-(--primary) to-white mb-2">Upgrade to Pro</h3>
              <p className="text-xs text-(--text-muted)">Get advanced stats</p>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
}

