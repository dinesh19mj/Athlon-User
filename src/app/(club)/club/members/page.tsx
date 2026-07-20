'use client';

import { Users, Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function ClubMembersPage() {
  const members = [
    { id: 1, name: 'Arjun Patel', role: 'Captain', joined: 'Jan 2026' },
    { id: 2, name: 'Neha Gupta', role: 'Member', joined: 'Feb 2026' },
    { id: 3, name: 'Raj Kumar', role: 'Member', joined: 'Mar 2026' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-background text-foreground flex flex-col">
      <div className="p-6 border-b border-foreground/10 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Members</h1>
            <p className="text-foreground/50 text-xs font-bold mt-1">Total: 42 Active Members</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#06B6D4] text-[#0A0F1A] shadow-[0_4px_20px_rgba(6,182,212,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 bg-surface border border-foreground/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-foreground/40" />
            <input type="text" placeholder="Search members..." className="bg-transparent border-none outline-none text-sm text-foreground w-full placeholder:text-foreground/40" />
          </div>
          <button className="bg-surface border border-foreground/10 rounded-xl px-3 py-2.5 flex items-center justify-center">
            <Filter className="w-4 h-4 text-foreground/70" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        {members.map((member) => (
          <div key={member.id} className="bg-surface/80 backdrop-blur-md border border-foreground/5 rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
                <p className="text-[10px] text-foreground/50 uppercase tracking-wider">Joined: {member.joined}</p>
              </div>
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
              member.role === 'Captain' ? 'bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20' :
              'bg-foreground/5 text-foreground/50 border border-foreground/10'
            }`}>
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
