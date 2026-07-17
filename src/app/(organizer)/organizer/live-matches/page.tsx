'use client';

import { LiveMatchWidget } from '@/components/organizer/LiveMatchWidget';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

// Mock list of matches happening right now
const liveMatches = [
  { id: 'match-1', court: 'Court 1', teamA: 'Smith / Jones', teamB: 'Davis / Wilson' },
  { id: 'match-2', court: 'Court 2', teamA: 'Anderson / Lee', teamB: 'Taylor / Clark' },
  { id: 'match-3', court: 'Center Court', teamA: 'Williams / Brown', teamB: 'Johnson / Miller' },
];

export default function OrganizerLiveMatchesPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Live Matches</h1>
          <p className="text-(--text-muted) text-sm mt-1">Monitor real-time scores from all active courts.</p>
        </div>
        
        {/* Helper to open umpire view in a new tab for testing */}
        <Link 
          href="/scoring/match-1" 
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-(--surface-elevated) hover:bg-(--surface) border border-(--border) rounded-(--radius-pill) text-sm font-medium transition-colors"
        >
          Open Umpire Test (Court 1) <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {liveMatches.map(match => (
          <LiveMatchWidget 
            key={match.id}
            matchId={match.id}
            courtName={match.court}
            teamA={match.teamA}
            teamB={match.teamB}
          />
        ))}
      </div>
    </div>
  );
}
