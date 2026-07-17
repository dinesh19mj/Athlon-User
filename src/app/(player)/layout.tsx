'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Trophy, CalendarDays, Bell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function PlayerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, activeWorkspaceId } = useAuthStore();

  const navItems = [
    { name: 'Home', href: '/player', icon: Home },
    { name: 'Tournaments', href: '/player/tournaments', icon: Trophy },
    { name: 'Matches', href: '/player/matches', icon: CalendarDays },
    { name: 'Notifications', href: '/player/notifications', icon: Bell },
    { name: 'Profile', href: '/player/profile', icon: User },
  ];

  return (
    <div className="flex h-screen bg-(--bg) text-(--text)">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-(--border) bg-(--surface) flex flex-col hidden md:flex">
        <div className="p-4 border-b border-(--border)">
          <Image src="/Athlon-sport.png" alt="Athlon Logo" width={120} height={32} className="mb-2 object-contain" />
          <p className="text-xs text-(--text-muted) truncate">Workspace: {activeWorkspaceId}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/player' && pathname.startsWith(item.href));
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
      <main className="flex-1 overflow-auto bg-(--bg) pb-[72px] md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-(--surface) border-t border-(--border) flex justify-around p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/player' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[4rem] ${
                isActive ? 'text-(--primary)' : 'text-(--text-muted)'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
