'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Activity, 
  TrendingUp, 
  CreditCard,
  ChevronRight,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

const bgImages = [
  'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=1200',
];

const quickActions = [
  { id: '/player/tournaments', label: 'Tournaments', icon: Trophy, color: 'text-[#3B82F6]' },
  { id: '/player/rankings', label: 'Rankings', icon: TrendingUp, color: 'text-blue-400' },
  { id: '/player/matches', label: 'Matches', icon: Activity, color: 'text-purple-400' },
  { id: '/player/pro', label: 'Upgrade', icon: Star, color: 'text-yellow-400' },
];

const upcomingMatches = [
  { id: 'match-101', tournament: 'Summer Slam 2026', date: 'Today, 2:00 PM', opponent: 'John Doe', court: 'Center Court', status: 'Next up' },
  { id: 'match-102', tournament: 'Summer Slam 2026', date: 'Tomorrow, 10:00 AM', opponent: 'Jane Smith', court: 'TBD', status: 'Scheduled' },
];

export default function PlayerDashboardPage() {
  const { userEmail } = useAuthStore();
  const displayName = userEmail ? userEmail.split('@')[0] : 'Player';
  
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-background text-foreground flex flex-col relative">

      {/* Main Scrollable Area */}
      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar">
        
        {/* HERO SECTION */}
        <div className="px-6 pt-8 pb-6 border-b border-foreground/10 relative overflow-hidden">
          
          {/* Background Image Carousel (Hero Only) */}
          <div className="absolute inset-0 z-0">
            {bgImages.map((src, index) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: currentBg === index ? 1 : 0,
                  backgroundImage: `url(${src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/60 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-[100px] pointer-events-none z-0" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/10 border border-foreground/20 backdrop-blur-md mb-4 relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="text-[10px] font-bold text-foreground uppercase tracking-wider">Player Portal</span>
          </div>

          <h1 className="text-3xl font-extrabold mb-1 text-foreground tracking-tight flex items-center gap-2 relative z-10">
            Hi, <span className="capitalize">{displayName}</span> <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h1>
          <p className="text-foreground/80 text-sm font-medium mb-6 relative z-10">Ready to dominate the court today?</p>

          <div className="flex gap-3 relative z-10">
            <div className="flex-1 bg-black/40 border border-foreground/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center shadow-lg">
              <span className="text-[10px] font-black text-foreground/60 uppercase tracking-widest mb-1">Rank</span>
              <span className="text-2xl font-black text-foreground">#4</span>
            </div>
            <div className="flex-1 bg-[#3B82F6]/10 border border-[#3B82F6]/30 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[#3B82F6]/10 pointer-events-none" />
              <span className="text-[10px] font-black text-[#3B82F6]/80 uppercase tracking-widest mb-1">Points</span>
              <span className="text-2xl font-black text-[#3B82F6]">12,450</span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS GRID */}
        <div className="p-6 overflow-hidden">
          <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-4 pl-1">Quick Actions</h2>
          <section className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 snap-x scroll-px-6 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {quickActions.map((action) => (
              <Link href={action.id} key={action.id} className="flex flex-col items-center gap-1.5 shrink-0 snap-start">
                <div className="w-[68px] h-[68px] rounded-[16px] bg-surface border border-foreground/5 hover:border-foreground/20 flex flex-col items-center justify-center transition-colors shadow-lg cursor-pointer">
                  <action.icon className={`w-6 h-6 ${action.color.replace('text-', '') === action.color ? action.color.replace('bg-', 'text-') : action.color}`} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-medium text-foreground/80">{action.label}</span>
              </Link>
            ))}
          </section>
        </div>

        {/* UPCOMING MATCHES */}
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between mb-4 pl-1 pr-2">
            <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">Up Next</h2>
            <Link href="/player/matches" className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider flex items-center hover:underline">
              View All <ChevronRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingMatches.length > 0 ? upcomingMatches.map((match, i) => (
              <div key={match.id} className={`bg-surface/80 backdrop-blur-md border border-foreground/5 rounded-3xl p-5 shadow-xl relative overflow-hidden ${i === 0 ? 'border-[#3B82F6]/30' : ''}`}>
                {i === 0 && <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#3B82F6] opacity-80" />}
                
                <div className="flex items-center justify-between mb-3 border-b border-foreground/5 pb-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'text-[#3B82F6]' : 'text-foreground/40'}`}>
                      {match.status}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-foreground/70">{match.date}</span>
                </div>

                <div className="mb-4">
                  <h3 className="font-extrabold text-lg text-foreground mb-1">{match.tournament}</h3>
                  <div className="flex items-center gap-1.5 text-foreground/50">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold">{match.court}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-background p-3.5 rounded-2xl border border-foreground/5">
                  <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest shrink-0">VS</span>
                  <span className="text-sm font-bold text-foreground truncate text-right">{match.opponent}</span>
                </div>
              </div>
            )) : (
              <div className="bg-surface/50 border border-foreground/5 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center">
                <Calendar className="w-8 h-8 text-foreground/20 mb-3" />
                <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">No upcoming matches</span>
              </div>
            )}
          </div>
        </div>
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
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .animate-wave {
          animation: wave 2.5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
