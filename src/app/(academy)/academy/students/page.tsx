'use client';

import { Users, Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function StudentsPage() {
  const students = [
    { id: 1, name: 'Arjun Patel', level: 'Intermediate', batch: 'Evening A' },
    { id: 2, name: 'Neha Gupta', level: 'Beginner', batch: 'Morning B' },
    { id: 3, name: 'Karan Singh', level: 'Advanced', batch: 'Elite Squad' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Students</h1>
            <p className="text-white/50 text-xs font-bold mt-1">Total: 155 Enrolled</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#A855F7] text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-white/40" />
            <input type="text" placeholder="Search students..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/40" />
          </div>
          <button className="bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 flex items-center justify-center">
            <Filter className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        {students.map((student) => (
          <div key={student.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{student.name}</h3>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">{student.batch}</p>
              </div>
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
              student.level === 'Advanced' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
              student.level === 'Intermediate' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
              'bg-green-500/10 text-green-500 border border-green-500/20'
            }`}>
              {student.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
