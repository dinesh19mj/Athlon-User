'use client';

import { Plus, Clock, Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function CourtBookingsPage() {
  const courts = [1, 2, 3, 4, 5, 6];
  
  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex flex-col gap-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">Bookings</h1>
            <p className="text-white/50 text-xs font-bold mt-1">Hourly live booking monitor</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#EAB308] text-[#0A0F1A] shadow-[0_4px_20px_rgba(234,179,8,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Plus className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="flex-1 bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <Search className="w-4 h-4 text-white/40" />
            <input type="text" placeholder="Search customer or phone..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-white/40" />
          </div>
          <button className="bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 flex items-center justify-center">
            <Filter className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar relative">
        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-[#0A0F1A] z-20 py-2 border-b border-white/5">
          <Clock className="w-4 h-4 text-[#EAB308]" />
          <span className="text-sm font-bold text-white">Current Time: 19:30</span>
        </div>

        {courts.map((court) => (
          <div key={court} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest leading-none">C</span>
                <span className="text-lg font-black text-[#EAB308] leading-none mt-0.5">{court}</span>
              </div>
              
              {court % 2 === 0 ? (
                <div>
                  <h3 className="font-bold text-white text-sm">Hourly Booking</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">Rajesh Kumar • 19:00 - 20:00</p>
                </div>
              ) : court === 1 ? (
                <div>
                  <h3 className="font-bold text-white text-sm">Academy Batch</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">Elite Team • 18:00 - 20:00</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-bold text-white/40 text-sm italic">Available</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Tap to block/book</p>
                </div>
              )}
            </div>

            {(court % 2 === 0 || court === 1) && (
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
                In Use
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
