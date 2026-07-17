'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Calendar, ChevronRight, Activity, MapPin } from 'lucide-react';

export default function UmpireDashboardPage() {
  const { userEmail } = useAuthStore();
  const displayName = userEmail ? userEmail.split('@')[0] : 'Umpire';

  return (
    <div className="pb-8">
      {/* Hero Header */}
      <header className="relative bg-[#0A0E17] pt-12 pb-20 px-4 md:px-8 overflow-hidden border-b border-(--border)">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-(--live)/20 via-transparent to-transparent opacity-60" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-(--live) animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Umpire Mode</span>
            </div>
            
            <button 
              onClick={() => {
                useAuthStore.getState().logout();
                window.location.href = '/';
              }} 
              className="text-white/60 hover:text-white text-sm font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-white tracking-tight">
            Welcome back, <span className="text-(--live) capitalize">{displayName}</span>
          </h1>
          <p className="text-white/60 text-lg">Select a match to start live scoring.</p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 md:px-8 -mt-8 relative z-20">
        
        <div className="flex flex-col gap-4">
          
          {/* Active / Next Match Card */}
          <div className="bg-(--surface) border border-(--live)/30 shadow-[0_8px_30px_rgba(255,59,48,0.12)] rounded-[24px] overflow-hidden flex flex-col md:hover:border-(--live)/50 transition-colors">
            <div className="bg-(--live)/10 p-4 border-b border-(--live)/20 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-(--live) animate-pulse" />
                <span className="text-xs font-bold text-(--live) uppercase tracking-wider">Ready to Start</span>
              </div>
              <div className="flex items-center gap-1 text-(--text-muted) text-sm font-semibold">
                <MapPin className="w-4 h-4" /> Court 1
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h3 className="font-extrabold text-xl mb-2">Summer Slam 2026</h3>
              <p className="text-(--text-muted) mb-6">You have been assigned to umpire this tournament.</p>
              
              <Link 
                href="/umpire/setup" 
                className="w-full flex items-center justify-center gap-2 bg-(--live) text-white font-bold py-4 rounded-xl hover:opacity-90 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,59,48,0.2)]"
              >
                <Activity className="w-5 h-5" />
                Setup Match & Start Scoring
              </Link>
            </div>
          </div>
          
          {/* Scheduled Tournament Card */}
          <div className="bg-(--surface) border border-(--border) rounded-[24px] overflow-hidden flex flex-col opacity-80 md:hover:opacity-100 transition-opacity">
            <div className="bg-(--surface-elevated) p-4 border-b border-(--border) flex justify-between items-center">
              <span className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">Scheduled • 4:00 PM</span>
              <div className="flex items-center gap-1 text-(--text-muted) text-sm font-semibold">
                <MapPin className="w-4 h-4" /> Court 2
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg mb-2">City Open 2026</h3>
              <p className="text-(--text-muted) text-sm mb-6">Upcoming assignment.</p>
              
              <button 
                disabled
                className="w-full flex items-center justify-center bg-(--surface-elevated) text-(--text-muted) font-bold py-3 rounded-xl cursor-not-allowed"
              >
                Not Yet Available
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
