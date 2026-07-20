'use client';

import { TrendingUp, Target, Award, ChevronRight } from 'lucide-react';

export default function ProgressPage() {
  const members = [
    { id: 1, name: 'Arjun Patel', score: 85, rank: 1, trend: '+5', streak: 4 },
    { id: 2, name: 'Raj Kumar', score: 78, rank: 2, trend: '+2', streak: 2 },
    { id: 3, name: 'Neha Gupta', score: 65, rank: 3, trend: '-1', streak: 0 },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-background text-foreground flex flex-col">
      <div className="p-6 border-b border-foreground/10 shrink-0">
        <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Progress</h1>
        <p className="text-foreground/50 text-xs font-bold mt-1">Daily skill & performance monitor</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface border border-foreground/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1">
            <Target className="w-6 h-6 text-[#06B6D4] mb-1" />
            <span className="text-2xl font-black text-foreground">78%</span>
            <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest">Club Avg Win Rate</span>
          </div>
          <div className="bg-surface border border-foreground/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1">
            <Award className="w-6 h-6 text-yellow-500 mb-1" />
            <span className="text-2xl font-black text-foreground">24</span>
            <span className="text-[9px] font-bold text-foreground/50 uppercase tracking-widest">Practice Matches</span>
          </div>
        </div>

        <div>
          <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-3 pl-1">Daily Rankings</h2>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="bg-surface/80 backdrop-blur-md border border-foreground/5 rounded-2xl p-4 shadow-xl flex items-center justify-between group hover:border-[#06B6D4]/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center">
                    <span className="text-xs font-black text-foreground/70">#{member.rank}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                    <p className="text-[10px] text-foreground/50 uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      Score: {member.score} • 🔥 {member.streak}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-[#06B6D4] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
