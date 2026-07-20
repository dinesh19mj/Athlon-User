'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  MoreVertical, 
  User, 
  Users, 
  ListOrdered, 
  ClipboardList, 
  Copy, 
  Hash, 
  Globe, 
  Settings,
  ChevronDown,
  Trophy,
  Activity
} from 'lucide-react';
import { useMatchStore, GameCategory } from '@/lib/store/useMatchStore';

export default function MatchSetupPage() {
  const router = useRouter();
  const setupMatch = useMatchStore(state => state.setupMatch);

  const [activeTab, setActiveTab] = useState<'settings' | 'team1' | 'team2'>('settings');

  const [category, setCategory] = useState<GameCategory>('Doubles');
  const [sets, setSets] = useState<1 | 2 | 3>(3);
  const [pointBreak, setPointBreak] = useState<number>(15);
  
  const [useDeuce, setUseDeuce] = useState(true);
  const [useSeeding, setUseSeeding] = useState(true);
  const [useCountries, setUseCountries] = useState(true);
  
  const [teamA, setTeamA] = useState<string[]>(['', '']);
  const [teamB, setTeamB] = useState<string[]>(['', '']);

  const isDoubles = category === 'Doubles' || category === 'Mixed Doubles';

  const handleNext = () => {
    if (activeTab === 'settings') setActiveTab('team1');
    else if (activeTab === 'team1') setActiveTab('team2');
    else handleStartMatch();
  };

  const handleStartMatch = () => {
    const finalTeamA = isDoubles ? teamA : [teamA[0]];
    const finalTeamB = isDoubles ? teamB : [teamB[0]];
    
    if (!finalTeamA[0]) finalTeamA[0] = 'Player 1 (A)';
    if (isDoubles && !finalTeamA[1]) finalTeamA[1] = 'Player 2 (A)';
    if (!finalTeamB[0]) finalTeamB[0] = 'Player 1 (B)';
    if (isDoubles && !finalTeamB[1]) finalTeamB[1] = 'Player 2 (B)';

    setupMatch({
      id: `match-${Date.now()}`,
      category,
      bestOfSets: sets,
      pointBreak: pointBreak,
      teamA: finalTeamA,
      teamB: finalTeamB,
    });

    router.push('/scoring/live');
  };

  const CustomSwitch = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors border border-foreground/5 shadow-inner ${checked ? 'bg-red-500/20 border-red-500/30' : 'bg-background'}`}
    >
      <div className={`w-4 h-4 rounded-full transition-transform shadow-lg ${checked ? 'translate-x-6 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'translate-x-0 bg-foreground/40'}`} />
    </div>
  );

  return (
    <div className="h-[100dvh] bg-background text-foreground font-sans flex flex-col relative overflow-hidden">
      
      {/* Ambient Red Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* HEADER */}
      <header className="px-4 py-6 flex items-center justify-between shrink-0 relative z-10">
        <button onClick={() => router.push('/umpire')} className="p-3 -ml-3 text-foreground/70 hover:text-foreground transition-colors bg-foreground/0 hover:bg-foreground/5 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-black uppercase tracking-widest text-foreground drop-shadow-md">Match Setup</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Umpire Mode</span>
          </div>
        </div>
        <button className="p-3 -mr-3 text-foreground/70 hover:text-foreground transition-colors bg-foreground/0 hover:bg-foreground/5 rounded-full">
          <MoreVertical className="w-6 h-6" />
        </button>
      </header>

      {/* SEGMENTED TABS */}
      <div className="px-4 pb-6 shrink-0 relative z-10">
        <div className="flex bg-surface border border-foreground/5 p-1.5 rounded-2xl shadow-xl">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'settings' ? 'bg-red-500 text-foreground shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'}`}
          >
            Settings
          </button>
          <button 
            onClick={() => setActiveTab('team1')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'team1' ? 'bg-red-500 text-foreground shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'}`}
          >
            {isDoubles ? 'Team 1' : 'Player 1'}
          </button>
          <button 
            onClick={() => setActiveTab('team2')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${activeTab === 'team2' ? 'bg-red-500 text-foreground shadow-[0_4px_20px_rgba(239,68,68,0.4)]' : 'text-foreground/40 hover:text-foreground hover:bg-foreground/5'}`}
          >
            {isDoubles ? 'Team 2' : 'Player 2'}
          </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 relative z-10 hide-scrollbar">
        
        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Match Type (Singles vs Doubles) */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">Match Format</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setCategory('Singles')}
                  className={`flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border transition-all ${!isDoubles ? 'bg-surface border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)] scale-[1.02]' : 'bg-background border-foreground/5 hover:border-foreground/20 hover:bg-foreground/5'}`}
                >
                  <div className={`p-3 rounded-full ${!isDoubles ? 'bg-red-500/20 text-red-500' : 'bg-foreground/5 text-foreground/40'}`}>
                    <User className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-wide ${!isDoubles ? 'text-foreground' : 'text-foreground/40'}`}>Singles</span>
                </button>
                <button 
                  onClick={() => setCategory('Doubles')}
                  className={`flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border transition-all ${isDoubles ? 'bg-surface border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)] scale-[1.02]' : 'bg-background border-foreground/5 hover:border-foreground/20 hover:bg-foreground/5'}`}
                >
                  <div className={`p-3 rounded-full ${isDoubles ? 'bg-red-500/20 text-red-500' : 'bg-foreground/5 text-foreground/40'}`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-bold uppercase tracking-wide ${isDoubles ? 'text-foreground' : 'text-foreground/40'}`}>Doubles</span>
                </button>
              </div>
            </div>

            {/* Rules & Configuration */}
            <div className="space-y-3">
              <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-2">Rules & Scoring</h2>
              
              <div className="bg-surface border border-foreground/5 rounded-3xl overflow-hidden shadow-xl">
                
                {/* Max Games */}
                <div className="flex items-center justify-between p-5 border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded-xl border border-foreground/5">
                      <ListOrdered className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-sm font-bold text-foreground/90">Max games (sets)</span>
                  </div>
                  <div className="relative">
                    <select 
                      value={sets}
                      onChange={(e) => setSets(Number(e.target.value) as 1 | 2 | 3)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                    <div className="bg-background border border-foreground/10 rounded-xl px-4 py-2 flex items-center gap-4 pointer-events-none shadow-inner">
                      <span className="font-bold">{sets}</span>
                      <ChevronDown className="w-4 h-4 text-foreground/50" />
                    </div>
                  </div>
                </div>

                {/* Points Per Game */}
                <div className="flex items-center justify-between p-5 border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded-xl border border-foreground/5">
                      <Trophy className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-sm font-bold text-foreground/90">Points per game</span>
                  </div>
                  <div className="relative">
                    <select 
                      value={pointBreak}
                      onChange={(e) => setPointBreak(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                      <option value={11}>11</option>
                      <option value={15}>15</option>
                      <option value={21}>21</option>
                      <option value={30}>30</option>
                    </select>
                    <div className="bg-background border border-foreground/10 rounded-xl px-4 py-2 flex items-center gap-4 pointer-events-none shadow-inner">
                      <span className="font-bold">{pointBreak}</span>
                      <ChevronDown className="w-4 h-4 text-foreground/50" />
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between p-5 border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded-xl border border-foreground/5">
                      <Activity className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-sm font-bold text-foreground/90">Use Deuce</span>
                  </div>
                  <CustomSwitch checked={useDeuce} onChange={setUseDeuce} />
                </div>

                <div className="flex items-center justify-between p-5 border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded-xl border border-foreground/5">
                      <Hash className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-sm font-bold text-foreground/90">Use Seeding</span>
                  </div>
                  <CustomSwitch checked={useSeeding} onChange={setUseSeeding} />
                </div>

                <div className="flex items-center justify-between p-5 hover:bg-foreground/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded-xl border border-foreground/5">
                      <Globe className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-sm font-bold text-foreground/90">Use Countries</span>
                  </div>
                  <CustomSwitch checked={useCountries} onChange={setUseCountries} />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TEAM 1 TAB */}
        {activeTab === 'team1' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-surface border border-foreground/5 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-black uppercase tracking-wide mb-6 text-foreground drop-shadow-md">
                {isDoubles ? 'Team 1 Roster' : 'Player 1 Details'}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 ml-1">Player 1 Name</label>
                  <input 
                    type="text" 
                    value={teamA[0]}
                    onChange={(e) => setTeamA([e.target.value, teamA[1]])}
                    placeholder="Enter full name"
                    className="w-full bg-background border border-foreground/10 rounded-2xl px-5 py-4 text-foreground font-bold focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all placeholder-white/20"
                  />
                </div>
                {isDoubles && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 ml-1">Player 2 Name</label>
                    <input 
                      type="text" 
                      value={teamA[1]}
                      onChange={(e) => setTeamA([teamA[0], e.target.value])}
                      placeholder="Enter full name"
                      className="w-full bg-background border border-foreground/10 rounded-2xl px-5 py-4 text-foreground font-bold focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all placeholder-white/20"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TEAM 2 TAB */}
        {activeTab === 'team2' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="bg-surface border border-foreground/5 rounded-3xl p-6 shadow-xl">
              <h2 className="text-lg font-black uppercase tracking-wide mb-6 text-foreground drop-shadow-md">
                {isDoubles ? 'Team 2 Roster' : 'Player 2 Details'}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 ml-1">Player 1 Name</label>
                  <input 
                    type="text" 
                    value={teamB[0]}
                    onChange={(e) => setTeamB([e.target.value, teamB[1]])}
                    placeholder="Enter full name"
                    className="w-full bg-background border border-foreground/10 rounded-2xl px-5 py-4 text-foreground font-bold focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all placeholder-white/20"
                  />
                </div>
                {isDoubles && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    <label className="block text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2 ml-1">Player 2 Name</label>
                    <input 
                      type="text" 
                      value={teamB[1]}
                      onChange={(e) => setTeamB([teamB[0], e.target.value])}
                      placeholder="Enter full name"
                      className="w-full bg-background border border-foreground/10 rounded-2xl px-5 py-4 text-foreground font-bold focus:outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all placeholder-white/20"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FIXED BOTTOM ACTION BAR */}
      <div className="fixed bottom-20 md:bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/95 to-[#0A0F1A]/0 backdrop-blur-sm pt-12 z-40">
        <button 
          onClick={handleNext}
          className="w-full bg-red-500 text-foreground font-black uppercase tracking-widest py-4 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-red-400 active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(239,68,68,0.3)] border border-red-400/50"
        >
          {activeTab === 'settings' ? 'Configure Team 1' : activeTab === 'team1' ? 'Configure Team 2' : 'Start Scoring Match'}
          {activeTab !== 'team2' ? <span className="ml-1 text-lg font-normal">›</span> : <Activity className="w-4 h-4 ml-1" />}
        </button>
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
