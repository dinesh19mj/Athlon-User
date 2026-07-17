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
  ChevronDown
} from 'lucide-react';
import { useMatchStore, GameCategory, PointBreak } from '@/lib/store/useMatchStore';

export default function MatchSetupPage() {
  const router = useRouter();
  const setupMatch = useMatchStore(state => state.setupMatch);

  const [activeTab, setActiveTab] = useState<'settings' | 'team1' | 'team2'>('settings');

  const [category, setCategory] = useState<GameCategory>('Doubles');
  const [sets, setSets] = useState<1 | 2 | 3>(3);
  const [pointBreak, setPointBreak] = useState<number>(15);
  
  // Toggles (UI only for now as requested, but we'll store state)
  const [useDeuce, setUseDeuce] = useState(true);
  const [useSeeding, setUseSeeding] = useState(true);
  const [useCountries, setUseCountries] = useState(true);
  
  const [teamA, setTeamA] = useState<string[]>(['', '']);
  const [teamB, setTeamB] = useState<string[]>(['', '']);

  const isDoubles = category === 'Doubles' || category === 'Mixed Doubles';

  const handleNext = () => {
    if (activeTab === 'settings') {
      setActiveTab('team1');
    } else if (activeTab === 'team1') {
      setActiveTab('team2');
    } else {
      // Final tab -> Start match
      handleStartMatch();
    }
  };

  const handleStartMatch = () => {
    const finalTeamA = isDoubles ? teamA : [teamA[0]];
    const finalTeamB = isDoubles ? teamB : [teamB[0]];
    
    // Fallback names if empty
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

  const Switch = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-primary/30' : 'bg-white/10'}`}
    >
      <div className={`w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6 bg-primary' : 'translate-x-0 bg-white/50'}`} />
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-surface flex flex-col text-white font-sans">
      
      {/* HEADER */}
      <header className="bg-primary px-4 pt-8 pb-4 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/umpire')} className="text-white hover:opacity-80">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium text-white">New Match</h1>
        </div>
        <button className="text-white hover:opacity-80">
          <MoreVertical className="w-6 h-6" />
        </button>
      </header>

      {/* TABS */}
      <div className="flex bg-surface-elevated border-b border-white/5 px-2 shrink-0">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-4 text-sm font-medium text-center relative transition-colors ${activeTab === 'settings' ? 'text-white' : 'text-white/40'}`}
        >
          Settings
          {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
        </button>
        <button 
          onClick={() => setActiveTab('team1')}
          className={`flex-1 py-4 text-sm font-medium text-center relative transition-colors ${activeTab === 'team1' ? 'text-white' : 'text-white/40'}`}
        >
          {isDoubles ? 'Team 1' : 'Player 1'}
          {activeTab === 'team1' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
        </button>
        <button 
          onClick={() => setActiveTab('team2')}
          className={`flex-1 py-4 text-sm font-medium text-center relative transition-colors ${activeTab === 'team2' ? 'text-white' : 'text-white/40'}`}
        >
          {isDoubles ? 'Team 2' : 'Player 2'}
          {activeTab === 'team2' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
        
        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            {/* Configuration */}
            <div>
              <h2 className="text-white/70 text-sm mb-3">Configuration</h2>
              <div className="flex bg-surface-elevated rounded-xl overflow-hidden p-1 gap-1">
                <button 
                  onClick={() => setCategory('Singles')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${!isDoubles ? 'bg-primary text-white font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  <User className="w-5 h-5" />
                  Singles
                </button>
                <button 
                  onClick={() => setCategory('Doubles')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-colors ${isDoubles ? 'bg-primary text-white font-semibold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  <Users className="w-5 h-5" />
                  Doubles
                </button>
              </div>
            </div>

            {/* Settings List */}
            <div>
              <h2 className="text-white/70 text-sm mb-3">Settings</h2>
              
              <div className="space-y-1">
                
                {/* Max Games */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <ListOrdered className="w-6 h-6 text-white/50" />
                    <span className="text-white/90">Max games (sets)</span>
                  </div>
                  <div className="relative">
                    <select 
                      value={sets}
                      onChange={(e) => setSets(Number(e.target.value) as 1 | 2 | 3)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer bg-background text-white"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option className="bg-background text-white" value={1}>1</option>
                      <option className="bg-background text-white" value={2}>2</option>
                      <option className="bg-background text-white" value={3}>3</option>
                    </select>
                    <div className="bg-background border border-white/5 rounded-xl px-4 py-2 flex items-center gap-6 pointer-events-none">
                      <span>{sets}</span>
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </div>
                  </div>
                </div>

                {/* Points Per Game */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <ClipboardList className="w-6 h-6 text-white/50" />
                    <span className="text-white/90">Points per game</span>
                  </div>
                  <div className="relative">
                    <select 
                      value={pointBreak}
                      onChange={(e) => setPointBreak(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer bg-background text-white"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option className="bg-background text-white" value={11}>11</option>
                      <option className="bg-background text-white" value={15}>15</option>
                      <option className="bg-background text-white" value={21}>21</option>
                      <option className="bg-background text-white" value={30}>30</option>
                    </select>
                    <div className="bg-background border border-white/5 rounded-xl px-4 py-2 flex items-center gap-4 pointer-events-none">
                      <span>{pointBreak}</span>
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Copy className="w-6 h-6 text-white/50" />
                    <span className="text-white/90">Use deuce</span>
                  </div>
                  <Switch checked={useDeuce} onChange={setUseDeuce} />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Hash className="w-6 h-6 text-white/50" />
                    <span className="text-white/90">Use seeding</span>
                  </div>
                  <Switch checked={useSeeding} onChange={setUseSeeding} />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Globe className="w-6 h-6 text-white/50" />
                    <span className="text-white/90">Use countries</span>
                  </div>
                  <Switch checked={useCountries} onChange={setUseCountries} />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <Settings className="w-6 h-6 text-white/50" />
                    <span className="text-white/90">Optional settings</span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-white/50" />
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TEAM 1 / PLAYER 1 TAB */}
        {activeTab === 'team1' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-white/70 text-sm mb-2">{isDoubles ? 'Player 1' : 'Player Name'}</label>
              <input 
                type="text" 
                value={teamA[0]}
                onChange={(e) => setTeamA([e.target.value, teamA[1]])}
                placeholder="Enter name"
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {isDoubles && (
              <div>
                <label className="block text-white/70 text-sm mb-2">Player 2</label>
                <input 
                  type="text" 
                  value={teamA[1]}
                  onChange={(e) => setTeamA([teamA[0], e.target.value])}
                  placeholder="Enter name"
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}
          </div>
        )}

        {/* TEAM 2 / PLAYER 2 TAB */}
        {activeTab === 'team2' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-white/70 text-sm mb-2">{isDoubles ? 'Player 1' : 'Player Name'}</label>
              <input 
                type="text" 
                value={teamB[0]}
                onChange={(e) => setTeamB([e.target.value, teamB[1]])}
                placeholder="Enter name"
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {isDoubles && (
              <div>
                <label className="block text-white/70 text-sm mb-2">Player 2</label>
                <input 
                  type="text" 
                  value={teamB[1]}
                  onChange={(e) => setTeamB([teamB[0], e.target.value])}
                  placeholder="Enter name"
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}
          </div>
        )}

      </div>

      {/* BOTTOM BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-white/5">
        <button 
          onClick={handleNext}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all"
        >
          {activeTab === 'settings' ? 'Next' : activeTab === 'team1' ? 'Next' : 'Start Match'}
          {activeTab !== 'team2' && <span className="ml-1 font-mono">›</span>}
        </button>
      </div>

    </div>
  );
}
