'use client';

import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MoreVertical, 
  Calendar,
  CheckCircle2,
  Trophy,
  Filter,
  Search,
  MapPin
} from 'lucide-react';

// Mock data for match history
const historyMatches = [
  {
    id: 'h1',
    date: 'Today, 08:30 AM',
    duration: '45m',
    court: 'Court 1',
    category: 'Men\'s Singles',
    teamA: 'Alex Rivers',
    teamB: 'Jordan Lee',
    scoreA: 2,
    scoreB: 0,
    sets: ['21-15', '21-18'],
    winner: 'A',
    accent: 'border-green-500/30'
  },
  {
    id: 'h2',
    date: 'Yesterday, 04:15 PM',
    duration: '1h 12m',
    court: 'Center Court',
    category: 'Women\'s Doubles - Semi Final',
    teamA: 'Smith / Davis',
    teamB: 'Chen / Wang',
    scoreA: 1,
    scoreB: 2,
    sets: ['21-19', '18-21', '19-21'],
    winner: 'B',
    accent: 'border-green-500/30'
  },
  {
    id: 'h3',
    date: 'Yesterday, 02:00 PM',
    duration: '52m',
    court: 'Court 3',
    category: 'Mixed Doubles',
    teamA: 'Taylor / Patel',
    teamB: 'Wilson / Garcia',
    scoreA: 2,
    scoreB: 1,
    sets: ['21-14', '15-21', '21-17'],
    winner: 'A',
    accent: 'border-green-500/30'
  },
  {
    id: 'h4',
    date: 'Oct 12, 10:00 AM',
    duration: '35m',
    court: 'Court 2',
    category: 'Men\'s Singles',
    teamA: 'Chris Evans',
    teamB: 'Tom Holland',
    scoreA: 0,
    scoreB: 2,
    sets: ['12-21', '14-21'],
    winner: 'B',
    accent: 'border-foreground/10'
  }
];

export default function UmpireHistoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="px-4 py-6 flex items-center justify-between shrink-0 relative z-10">
        <button onClick={() => router.push('/umpire')} className="p-3 -ml-3 text-foreground/70 hover:text-foreground transition-colors bg-foreground/0 hover:bg-foreground/5 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black uppercase tracking-widest text-foreground drop-shadow-md">Match History</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-3 h-3 text-[#1B9C56]" />
            <span className="text-[10px] font-bold text-[#1B9C56] uppercase tracking-widest">Completed</span>
          </div>
        </div>
        <button className="p-3 -mr-3 text-foreground/70 hover:text-foreground transition-colors bg-foreground/0 hover:bg-foreground/5 rounded-full">
          <Filter className="w-6 h-6" />
        </button>
      </header>

      {/* SEARCH BAR */}
      <div className="px-4 pb-6 relative z-10 border-b border-foreground/5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
          <input 
            type="text" 
            placeholder="Search by player or category..."
            className="w-full bg-surface border border-foreground/5 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-foreground placeholder-white/30 focus:outline-none focus:border-[#1B9C56]/50 focus:shadow-[0_0_15px_rgba(27,156,86,0.15)] transition-all shadow-xl"
          />
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="px-4 py-6 grid grid-cols-2 gap-4 relative z-10 shrink-0">
        <div className="bg-surface border border-foreground/5 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-foreground">24</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1">Matches Umpired</span>
        </div>
        <div className="bg-surface border border-foreground/5 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-[#1B9C56]">14h</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1">Time on Court</span>
        </div>
      </div>

      {/* MATCH LIST */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 hide-scrollbar space-y-4">
        <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2 mb-2">Recent Matches</h2>
        
        {historyMatches.map((match, i) => (
          <div 
            key={match.id}
            className={`bg-surface border ${match.accent} rounded-3xl p-5 shadow-xl animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden`}
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            {/* Status overlay line */}
            <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#1B9C56] opacity-80" />
            
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-foreground/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-background border border-foreground/5 text-foreground/50">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground tracking-wide">{match.date}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-0.5">{match.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border border-foreground/5">
                <MapPin className="w-3.5 h-3.5 text-foreground/40" />
                <span className="text-xs font-bold text-foreground/60">{match.court}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{match.category}</span>
              </div>
              
              {/* Score Box */}
              <div className="flex flex-col gap-2 bg-background p-4 rounded-2xl border border-foreground/5">
                {/* Team A */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 w-3/5 truncate">
                    {match.winner === 'A' && <CheckCircle2 className="w-3.5 h-3.5 text-[#1B9C56] shrink-0" />}
                    <span className={`text-sm font-bold truncate ${match.winner === 'A' ? 'text-foreground' : 'text-foreground/50'}`}>
                      {match.teamA}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-foreground/30">{match.sets.map(s => s.split('-')[0]).join('  ')}</span>
                    <span className={`text-lg font-black w-4 text-right ${match.winner === 'A' ? 'text-[#1B9C56]' : 'text-foreground/30'}`}>
                      {match.scoreA}
                    </span>
                  </div>
                </div>
                
                {/* Team B */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 w-3/5 truncate">
                    {match.winner === 'B' && <CheckCircle2 className="w-3.5 h-3.5 text-[#1B9C56] shrink-0" />}
                    <span className={`text-sm font-bold truncate ${match.winner === 'B' ? 'text-foreground' : 'text-foreground/50'}`}>
                      {match.teamB}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-foreground/30">{match.sets.map(s => s.split('-')[1]).join('  ')}</span>
                    <span className={`text-lg font-black w-4 text-right ${match.winner === 'B' ? 'text-[#1B9C56]' : 'text-foreground/30'}`}>
                      {match.scoreB}
                    </span>
                  </div>
                </div>
              </div>
            </div>

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
