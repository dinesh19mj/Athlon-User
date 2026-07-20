import Link from 'next/link';
import { Calendar, MapPin, Clock, Trophy, ChevronRight, Activity } from 'lucide-react';

const mockMatches = [
  {
    id: 1,
    tournament: 'Summer Smash 2024',
    category: "Men's Singles",
    round: 'Quarter-Finals',
    date: 'Oct 15, 2024',
    time: '10:00 AM',
    court: 'Court 1',
    opponent: 'Arjun M',
    status: 'Upcoming',
    score: null,
    result: null
  },
  {
    id: 2,
    tournament: 'State Level Championship',
    category: "Men's Singles",
    round: 'Finals',
    date: 'Sep 20, 2024',
    time: '04:00 PM',
    court: 'Main Court',
    opponent: 'Siva K',
    status: 'Completed',
    score: '21-18, 15-21, 21-19',
    result: 'Won'
  },
  {
    id: 3,
    tournament: 'Weekend Warriors Open',
    category: "Men's Singles",
    round: 'Round of 16',
    date: 'Sep 05, 2024',
    time: '02:30 PM',
    court: 'Court 3',
    opponent: 'Rahul R',
    status: 'Completed',
    score: '18-21, 19-21',
    result: 'Lost'
  }
];

export default function PlayerMatchesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-24">
      {/* Header */}
      <header className="p-4 md:px-8 md:py-6 border-b border-foreground/5 bg-surface/50 backdrop-blur-md sticky top-0 z-20">
        <h1 className="text-3xl font-black uppercase tracking-wide">My Matches</h1>
        <p className="text-foreground/50 font-bold mt-1 text-sm">View your past and upcoming match schedule.</p>
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button className="px-5 py-2 bg-[#1B9C56] text-black font-bold text-xs uppercase tracking-wider rounded-lg shrink-0">All Matches</button>
          <button className="px-5 py-2 bg-surface border border-foreground/10 text-foreground/60 font-bold text-xs uppercase tracking-wider rounded-lg hover:text-foreground shrink-0 transition-colors">Upcoming</button>
          <button className="px-5 py-2 bg-surface border border-foreground/10 text-foreground/60 font-bold text-xs uppercase tracking-wider rounded-lg hover:text-foreground shrink-0 transition-colors">Completed</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        {mockMatches.map((match) => (
          <div key={match.id} className="bg-surface border border-foreground/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#1B9C56]/50 transition-colors group">
            
            {/* Match Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                  match.status === 'Upcoming' 
                    ? 'bg-orange-500/10 text-orange-500' 
                    : match.result === 'Won'
                      ? 'bg-[#1B9C56]/10 text-[#1B9C56]'
                      : 'bg-red-500/10 text-red-500'
                }`}>
                  {match.status === 'Upcoming' ? 'Upcoming' : match.result}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{match.category} • {match.round}</span>
              </div>
              
              <h3 className="text-lg font-black uppercase tracking-tight mb-1 group-hover:text-[#1B9C56] transition-colors">{match.tournament}</h3>
              
              <div className="flex items-center gap-4 text-xs font-bold text-foreground/60 mt-3">
                <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {match.date}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {match.time}</div>
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {match.court}</div>
              </div>
            </div>

            {/* Opponent & Result */}
            <div className="flex flex-col md:items-end justify-center pt-4 md:pt-0 border-t border-foreground/5 md:border-none shrink-0 md:min-w-[150px]">
              <div className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-1">Opponent</div>
              <div className="text-base font-black truncate">{match.opponent}</div>
              
              {match.status === 'Completed' && match.score && (
                <div className="mt-2 text-xs font-bold bg-foreground/5 px-2 py-1 rounded">
                  Score: <span className="text-foreground/80">{match.score}</span>
                </div>
              )}
              {match.status === 'Upcoming' && (
                <button className="mt-3 flex items-center gap-1 text-[#1B9C56] text-xs font-black uppercase tracking-widest hover:underline">
                  View Details <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>

          </div>
        ))}
      </main>
    </div>
  );
}
