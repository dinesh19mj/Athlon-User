'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, LogOut, Users, Settings, Plus, Home, UserCircle, Menu, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, activeWorkspaceId } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/organizer', icon: LayoutDashboard },
    { name: 'Live Matches', href: '/organizer/live-matches', icon: Activity },
    { name: 'Registrations', href: '/organizer/registrations', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-(--bg) text-(--text)">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-(--border) bg-(--surface) flex flex-col hidden md:flex">
        <div className="p-4 border-b border-(--border)">
          <Image src="/athlon-logo.png" alt="Athlon Logo" width={120} height={32} className="mb-4 object-contain w-auto h-10" />
          
          <div className="flex flex-col mt-4">
            <Link href="/profile" className="flex items-center gap-3 text-(--text-muted) hover:text-[#1B9C56] transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
              <UserCircle className="w-5 h-5" />
              <span className="font-medium text-sm">View Profile</span>
            </Link>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-(--primary)/10 text-(--primary)' 
                    : 'text-(--text-muted) hover:text-(--text) hover:bg-(--surface-elevated)'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-(--border)">
          <button 
            onClick={() => {
              logout();
              window.location.href = '/';
            }} 
            className="flex items-center gap-3 text-(--text-muted) hover:text-(--live) transition-colors w-full px-3 py-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-(--bg) md:pb-0 pb-16">
        {/* Mobile Header (PWA Style - matches Home page) */}
        <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-[#0A0F1A]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <Image src="/athlon-logo.png" alt="Athlon" width={90} height={18} className="object-contain w-auto h-10" />
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2 text-white hover:text-[#1B9C56] transition-colors"
            >
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-12 w-48 bg-[#121824] border border-white/10 rounded-xl shadow-2xl py-2 flex flex-col z-50 animate-in fade-in zoom-in-95 duration-200">
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                  <User className="w-4 h-4 text-[#1B9C56]" /> Profile
                </Link>
                <Link href="/settings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                  <Settings className="w-4 h-4 text-white/70" /> Settings
                </Link>
                <div className="h-px bg-white/10 my-1 mx-2" />
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                    window.location.href = '/';
                  }} 
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>
        
        {children}
      </main>

      {/* Mobile Bottom Nav (PWA Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0A0F1A]/95 backdrop-blur-xl border-t border-white/10 z-50 px-6 flex items-center justify-between">
        <Link href="/organizer" className={`flex flex-col items-center gap-1 w-16 transition-opacity ${pathname === '/organizer' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
          <Home className={`w-6 h-6 ${pathname === '/organizer' ? 'text-[#1B9C56]' : 'text-white'}`} />
          <span className={`text-[9px] font-bold ${pathname === '/organizer' ? 'text-[#1B9C56]' : 'text-white'}`}>Home</span>
        </Link>
        
        <Link href="/organizer/live-matches" className={`flex flex-col items-center gap-1 w-16 transition-opacity ${pathname === '/organizer/live-matches' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
          <Activity className={`w-6 h-6 ${pathname === '/organizer/live-matches' ? 'text-[#1B9C56]' : 'text-white'}`} />
          <span className={`text-[9px] font-bold ${pathname === '/organizer/live-matches' ? 'text-[#1B9C56]' : 'text-white'}`}>Live</span>
        </Link>

        {/* Elevated Center + Button */}
        <div className="relative -top-6 flex items-center justify-center">
          <button className="w-16 h-16 rounded-full bg-[#1B9C56] text-black shadow-[0_8px_30px_rgba(27,156,86,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border-4 border-[#0A0F1A]">
            <Plus className="w-8 h-8 stroke-[3]" />
          </button>
        </div>

        <Link href="/organizer/registrations" className={`flex flex-col items-center gap-1 w-16 transition-opacity ${pathname === '/organizer/registrations' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
          <Users className={`w-6 h-6 ${pathname === '/organizer/registrations' ? 'text-[#1B9C56]' : 'text-white'}`} />
          <span className={`text-[9px] font-bold ${pathname === '/organizer/registrations' ? 'text-[#1B9C56]' : 'text-white'}`}>Users</span>
        </Link>
        
        <Link href="/profile" className={`flex flex-col items-center gap-1 w-16 transition-opacity ${pathname === '/profile' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
          <UserCircle className={`w-6 h-6 ${pathname === '/profile' ? 'text-[#1B9C56]' : 'text-white'}`} />
          <span className={`text-[9px] font-bold ${pathname === '/profile' ? 'text-[#1B9C56]' : 'text-white'}`}>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
