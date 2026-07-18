'use client';

import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MapPin,
  Clock,
  Activity,
  Users,
  AlertCircle,
  CheckCircle2,
  Filter
} from 'lucide-react';

// Mock data for courts
const venueCourts = [
  {
    id: 'c1',
    name: 'Center Court',
    status: 'IN_USE',
    surface: 'Hard Court',
    currentMatch: {
      category: 'Men\'s Singles - Final',
      teamA: 'Alex Rivers',
      teamB: 'Jordan Lee',
      duration: '45m'
    },
    accent: 'border-blue-500/30 text-blue-500 bg-blue-500/10'
  },
  {
    id: 'c2',
    name: 'Court 1',
    status: 'AVAILABLE',
    surface: 'Hard Court',
    currentMatch: null,
    accent: 'border-green-500/30 text-green-500 bg-green-500/10'
  },
  {
    id: 'c3',
    name: 'Court 2',
    status: 'IN_USE',
    surface: 'Hard Court',
    currentMatch: {
      category: 'Women\'s Doubles',
      teamA: 'Smith / Davis',
      teamB: 'Chen / Wang',
      duration: '1h 12m'
    },
    accent: 'border-blue-500/30 text-blue-500 bg-blue-500/10'
  },
  {
    id: 'c4',
    name: 'Court 3',
    status: 'MAINTENANCE',
    surface: 'Hard Court',
    currentMatch: null,
    accent: 'border-orange-500/30 text-orange-500 bg-orange-500/10'
  }
];

export default function UmpireCourtsPage() {
  const router = useRouter();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <CheckCircle2 className="w-4 h-4" />;
      case 'IN_USE': return <Activity className="w-4 h-4" />;
      case 'MAINTENANCE': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="px-4 py-6 flex items-center justify-between shrink-0 relative z-10">
        <button onClick={() => router.push('/umpire')} className="p-3 -ml-3 text-white/70 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">Venue Courts</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <MapPin className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Live Status</span>
          </div>
        </div>
        <button className="p-3 -mr-3 text-white/70 hover:text-white transition-colors bg-white/0 hover:bg-white/5 rounded-full">
          <Filter className="w-6 h-6" />
        </button>
      </header>

      {/* STATS OVERVIEW */}
      <div className="px-4 pb-6 grid grid-cols-3 gap-3 relative z-10 shrink-0">
        <div className="bg-[#121824] border border-white/5 rounded-2xl p-3 shadow-lg flex flex-col items-center justify-center">
          <span className="text-xl font-black text-white">4</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-1">Total</span>
        </div>
        <div className="bg-[#121824] border border-green-500/20 rounded-2xl p-3 shadow-lg flex flex-col items-center justify-center">
          <span className="text-xl font-black text-green-500">1</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-green-500/70 mt-1">Available</span>
        </div>
        <div className="bg-[#121824] border border-blue-500/20 rounded-2xl p-3 shadow-lg flex flex-col items-center justify-center">
          <span className="text-xl font-black text-blue-500">2</span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500/70 mt-1">In Use</span>
        </div>
      </div>

      {/* COURT GRID */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 hide-scrollbar space-y-4">
        {venueCourts.map((court, i) => (
          <div 
            key={court.id}
            className={`bg-[#121824] border border-white/5 rounded-3xl p-5 shadow-xl animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden`}
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${court.accent}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-wide uppercase">{court.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-0.5">{court.surface}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${court.accent}`}>
                {getStatusIcon(court.status)}
                <span className="text-xs font-bold uppercase tracking-widest">{court.status.replace('_', ' ')}</span>
              </div>
            </div>

            {court.currentMatch ? (
              <div className="bg-[#0A0F1A] p-4 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{court.currentMatch.category}</span>
                  <div className="flex items-center gap-1 text-white/40">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-mono">{court.currentMatch.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate w-[40%]">
                    <Users className="w-3.5 h-3.5 text-white/30 shrink-0" />
                    <span className="text-sm font-bold text-white truncate">{court.currentMatch.teamA}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20 shrink-0">VS</span>
                  <div className="flex items-center justify-end gap-2 truncate w-[40%] text-right">
                    <span className="text-sm font-bold text-white truncate">{court.currentMatch.teamB}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0A0F1A]/50 border border-white/5 border-dashed p-6 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                  {court.status === 'MAINTENANCE' ? 'Court is currently closed' : 'No match currently active'}
                </span>
              </div>
            )}

            {court.status === 'AVAILABLE' && (
              <button 
                onClick={() => router.push('/umpire/setup')}
                className="w-full mt-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest transition-colors shadow-[0_5px_20px_rgba(147,51,234,0.3)]"
              >
                Assign Match to Court
              </button>
            )}

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
