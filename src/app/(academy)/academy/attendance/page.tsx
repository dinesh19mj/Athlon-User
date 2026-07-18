'use client';

import { CalendarCheck, Search, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AttendancePage() {
  const students = [
    { id: 1, name: 'Arjun Patel', batch: 'Elite Squad', status: 'present' },
    { id: 2, name: 'Neha Gupta', batch: 'Elite Squad', status: 'absent' },
    { id: 3, name: 'Karan Singh', batch: 'Elite Squad', status: 'pending' },
    { id: 4, name: 'Riya Verma', batch: 'Elite Squad', status: 'pending' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex flex-col gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Attendance</h1>
          <p className="text-white/50 text-xs font-bold mt-1">Mark daily attendance for batches</p>
        </div>

        <div className="flex bg-[#121824] border border-white/10 rounded-xl overflow-hidden p-1">
          <button className="flex-1 bg-[#A855F7]/20 text-[#A855F7] py-2 rounded-lg text-xs font-bold uppercase tracking-wider">Morning A</button>
          <button className="flex-1 text-white/50 hover:text-white py-2 text-xs font-bold uppercase tracking-wider transition-colors">Evening B</button>
          <button className="flex-1 text-white/50 hover:text-white py-2 text-xs font-bold uppercase tracking-wider transition-colors">Elite</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest pl-1">Elite Squad • 8 Students</h2>
          <span className="text-[10px] font-bold text-white bg-white/10 px-2 py-1 rounded-full">18 Jul 2026</span>
        </div>

        {students.map((student) => (
          <div key={student.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-3 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-bold text-white/50">{student.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-white text-sm">{student.name}</h3>
            </div>
            
            <div className="flex items-center gap-2 bg-[#0A0F1A] p-1 rounded-xl border border-white/5">
              <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                student.status === 'present' ? 'bg-green-500 text-white' : 'text-white/20 hover:text-green-500'
              }`}>
                <CheckCircle className="w-5 h-5" />
              </button>
              <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                student.status === 'absent' ? 'bg-red-500 text-white' : 'text-white/20 hover:text-red-500'
              }`}>
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 bg-[#0A0F1A] shrink-0">
        <button className="w-full bg-[#A855F7] text-white font-black uppercase tracking-widest py-3.5 rounded-xl text-sm shadow-[0_4px_20px_rgba(168,85,247,0.4)] active:scale-95 transition-transform">
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
