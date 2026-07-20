'use client';

import { CheckCircle, XCircle } from 'lucide-react';

export default function AttendancePage() {
  const members = [
    { id: 1, name: 'Arjun Patel', status: 'present' },
    { id: 2, name: 'Neha Gupta', status: 'absent' },
    { id: 3, name: 'Raj Kumar', status: 'pending' },
    { id: 4, name: 'Vikram Singh', status: 'pending' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-background text-foreground flex flex-col">
      <div className="p-6 border-b border-foreground/10 flex flex-col gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Attendance</h1>
          <p className="text-foreground/50 text-xs font-bold mt-1">Mark daily club attendance</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-black text-foreground/40 uppercase tracking-widest pl-1">All Members</h2>
          <span className="text-[10px] font-bold text-black bg-[#06B6D4] px-2 py-1 rounded-full">18 Jul 2026</span>
        </div>

        {members.map((member) => (
          <div key={member.id} className="bg-surface/80 backdrop-blur-md border border-foreground/5 rounded-2xl p-3 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <span className="font-bold text-foreground/50">{member.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-foreground text-sm">{member.name}</h3>
            </div>
            
            <div className="flex items-center gap-2 bg-background p-1 rounded-xl border border-foreground/5">
              <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                member.status === 'present' ? 'bg-green-500 text-foreground' : 'text-foreground/20 hover:text-green-500'
              }`}>
                <CheckCircle className="w-5 h-5" />
              </button>
              <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                member.status === 'absent' ? 'bg-red-500 text-foreground' : 'text-foreground/20 hover:text-red-500'
              }`}>
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-foreground/10 bg-background shrink-0">
        <button className="w-full bg-[#06B6D4] text-[#0A0F1A] font-black uppercase tracking-widest py-3.5 rounded-xl text-sm shadow-[0_4px_20px_rgba(6,182,212,0.4)] active:scale-95 transition-transform">
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
