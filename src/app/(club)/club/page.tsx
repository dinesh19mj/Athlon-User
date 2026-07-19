'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  DollarSign,
  CalendarCheck,
  TrendingUp,
  Package,
  Activity,
  Trophy,
  Swords
} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

const bgImages = [
  'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611252758110-6c9f2868853b?q=80&w=800&auto=format&fit=crop',
];

const quickActions = [
  { id: '/club/members', label: 'Members', icon: Users, color: 'text-blue-400' },
  { id: '/club/attendance', label: 'Attendance', icon: CalendarCheck, color: 'text-orange-400' },
  { id: '/club/finances', label: 'Finances', icon: DollarSign, color: 'text-emerald-400' },
  { id: '/club/inventory', label: 'Inventory', icon: Package, color: 'text-pink-400' },
  { id: '/club/progress', label: 'Progress', icon: TrendingUp, color: 'text-cyan-400' },
  { id: '/club/matches', label: 'Matches', icon: Swords, color: 'text-red-400' },
];

export default function ClubDashboardPage() {
  const { userEmail } = useAuthStore();
  const displayName = userEmail ? userEmail.split('@')[0] : 'Club Admin';
  
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col relative">
      
      {/* Main Scrollable Area */}
      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar">
        
        {/* HERO SECTION */}
        <div className="px-6 pt-8 pb-6 border-b border-white/10 relative overflow-hidden">
          
          {/* Background Image Carousel (Hero Only) */}
          <div className="absolute inset-0 z-0">
            {bgImages.map((src, index) => (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: currentBg === index ? 1 : 0,
                  backgroundImage: `url(${src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/60 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-[100px] pointer-events-none z-0" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 relative z-10">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Club Management</span>
          </div>

          <h1 className="text-3xl font-extrabold mb-1 text-white tracking-tight flex items-center gap-2 relative z-10">
            Hi, <span className="capitalize">{displayName}</span> <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h1>
          <p className="text-white/80 text-sm font-medium mb-6 relative z-10">Here's your club overview for today.</p>

          <div className="flex gap-3 relative z-10">
            <div className="flex-1 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center shadow-lg">
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Members</span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-white">42</span>
                <span className="text-xs font-bold text-green-500 mb-1 flex items-center"><TrendingUp className="w-3 h-3" /> 3</span>
              </div>
            </div>
            <div className="flex-1 bg-[#06B6D4]/10 border border-[#06B6D4]/30 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[#06B6D4]/10 pointer-events-none" />
              <span className="text-[10px] font-black text-[#06B6D4]/80 uppercase tracking-widest mb-1">Treasury</span>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-[#06B6D4]">₹12.5k</span>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS GRID */}
        <div className="p-6">
          <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 pl-1">Club Operations</h2>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Link 
                key={action.id}
                href={action.id}
                className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 shadow-xl"
              >
                <div className={`p-2.5 rounded-full bg-[#0A0F1A] shadow-inner ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold text-white uppercase tracking-wider">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between mb-4 pl-1 pr-2">
            <h2 className="text-[10px] font-black text-white/40 uppercase tracking-widest">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            {[
              { id: 1, text: 'Logged daily practice match results', time: '10 mins ago', color: 'bg-blue-500' },
              { id: 2, text: 'New member Raj joined the club', time: '2 hours ago', color: 'bg-[#06B6D4]' },
              { id: 3, text: 'Shuttle expense logged: ₹2,400', time: '1 day ago', color: 'bg-red-500' },
            ].map((activity, i) => (
              <div key={activity.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${activity.color} shrink-0`} />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">{activity.text}</p>
                </div>
                <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
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
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .animate-wave {
          animation: wave 2.5s ease-in-out infinite;
        }
      `}} />
    </div>
  );
}
