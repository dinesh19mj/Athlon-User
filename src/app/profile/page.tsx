'use client';

import { ArrowLeft, Settings, MapPin, Edit3, Wallet, Trophy, Target, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const matchHistory = [
    { id: 1, opponent: 'Rahul Verma', tournament: 'Smash Arena Practice', result: 'WIN', score: '21-18, 21-15', date: 'Yesterday' },
    { id: 2, opponent: 'Vikram Singh', tournament: 'District Qualifiers', result: 'LOSS', score: '19-21, 21-18, 15-21', date: '12 Jul 2024' },
    { id: 3, opponent: 'Amit Sharma', tournament: 'Corporate League', result: 'WIN', score: '21-12, 21-10', date: '08 Jul 2024' },
    { id: 4, opponent: 'Karthik N.', tournament: 'Friendly Match', result: 'WIN', score: '21-19, 21-17', date: '05 Jul 2024' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0A0F1A] text-white font-sans pb-24 overflow-y-auto selection:bg-[#1B9C56] selection:text-black">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-[#0A0F1A]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 -ml-2 text-white hover:text-[#1B9C56] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold uppercase tracking-wider">My Profile</h1>
        </div>
        
        <button className="p-2 -mr-2 text-white hover:text-gray-300 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <main className="w-full max-w-lg mx-auto px-4 flex flex-col gap-6 pt-6">

        {/* User Identity Header */}
        <section className="flex flex-col items-center relative">
          
          {/* Avatar with Glow */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-[#1B9C56] rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-[#1B9C56] p-[3px]">
              <div className="w-full h-full rounded-full bg-[#0A0F1A] border-4 border-[#0A0F1A] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="User Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Level Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#121824] border border-[#1B9C56] px-3 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,255,102,0.3)]">
              <span className="text-[10px] font-black text-[#1B9C56] uppercase tracking-widest whitespace-nowrap">Pro Lvl 5</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white tracking-wide mt-2">Dinesh Kumar</h2>
          
          <div className="flex items-center gap-1.5 text-white/50 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Bangalore, India</span>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full max-w-[240px] mt-6 bg-[#121824] border border-white/5 p-3 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-white/60">
              <span>XP 2,450</span>
              <span className="text-[#FF7722]">Next Lvl 3,000</span>
            </div>
            <div className="w-full h-1.5 bg-[#0A0F1A] rounded-full overflow-hidden">
              <div className="h-full bg-[#1B9C56] rounded-full" style={{ width: '81%' }} />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-2 gap-3 mt-2">
          <button className="flex items-center justify-center gap-2 bg-[#121824] border border-white/10 hover:border-white/30 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-lg">
            <Edit3 className="w-4 h-4 text-white/70" /> Edit Profile
          </button>
          <button className="flex items-center justify-center gap-2 bg-[#1B9C56]/20 border border-blue-500/30 hover:border-blue-500/60 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-lg">
            <Wallet className="w-4 h-4 text-[#FF7722]" /> My Wallet
          </button>
        </section>

        {/* Core Stats Grid */}
        <section className="grid grid-cols-3 gap-3">
          <div className="bg-[#121824] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg">
            <Trophy className="w-5 h-5 text-yellow-400 mb-1" />
            <span className="text-xl font-black text-white">42</span>
            <span className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Matches</span>
          </div>
          <div className="bg-[#121824] border border-[#1B9C56]/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-[0_0_15px_rgba(0,255,102,0.05)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1B9C56]/5 to-transparent pointer-events-none" />
            <Target className="w-5 h-5 text-[#1B9C56] mb-1 relative z-10" />
            <span className="text-xl font-black text-white relative z-10">72%</span>
            <span className="text-[9px] uppercase tracking-wider text-[#1B9C56] font-bold relative z-10">Win Rate</span>
          </div>
          <div className="bg-[#121824] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg">
            <Zap className="w-5 h-5 text-orange-400 mb-1" />
            <span className="text-xl font-black text-white">6</span>
            <span className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Best Streak</span>
          </div>
        </section>

        {/* Recent Match History */}
        <section className="mt-2">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-xs font-bold text-white/50 tracking-wider uppercase">Recent Matches</h3>
            <span className="text-[10px] font-bold text-[#FF7722] cursor-pointer hover:text-white transition-colors">View All</span>
          </div>
          
          <div className="flex flex-col gap-3">
            {matchHistory.map((match) => (
              <div key={match.id} className="flex items-center justify-between bg-[#121824] border border-white/5 p-3.5 rounded-xl hover:border-white/20 transition-colors shadow-sm cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A0F1A] border border-white/10 flex items-center justify-center overflow-hidden">
                     {/* Random Avatar Placeholder for Opponents */}
                     <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${match.opponent}&backgroundColor=121824&textColor=ffffff`} alt={match.opponent} className="w-full h-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-[#FF7722] transition-colors">{match.opponent}</span>
                    <span className="text-[10px] text-white/50 mt-0.5">{match.tournament} • {match.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                    match.result === 'WIN' 
                      ? 'bg-red-500/10 text-[#1B9C56] border border-red-500/20' 
                      : 'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {match.result}
                  </div>
                  <span className="text-xs font-bold text-white/80">{match.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
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
