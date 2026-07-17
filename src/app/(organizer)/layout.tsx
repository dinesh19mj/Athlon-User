'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, LogOut, Users, Settings } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout, activeWorkspaceId } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { name: 'Live Matches', href: '/organizer/live-matches', icon: Activity },
    { name: 'Registrations', href: '/organizer/registrations', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-(--bg) text-(--text)">
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-(--border) bg-(--surface) flex flex-col hidden md:flex">
        <div className="p-4 border-b border-(--border)">
          <Image src="/Athlon-sport.png" alt="Athlon Logo" width={120} height={32} className="mb-4 object-contain" />
          
          <div className="flex flex-col">
            <label htmlFor="workspace-select" className="text-xs text-(--text-muted) mb-1">Active Workspace</label>
            <select 
              id="workspace-select"
              className="bg-(--surface-elevated) border border-(--border) text-sm rounded px-2 py-1 focus:outline-none focus:border-(--primary)"
              value={activeWorkspaceId || ''}
              onChange={(e) => useAuthStore.getState().setActiveWorkspaceAndRole(e.target.value, 'ORGANIZER')}
            >
              {useAuthStore.getState().workspaces.filter(ws => ws.roles.includes('ORGANIZER')).map(ws => (
                <option key={ws.id} value={ws.id}>{ws.organizationName}</option>
              ))}
            </select>
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
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-(--border) bg-(--surface) flex justify-between items-center">
          <Image src="/Athlon-sport.png" alt="Athlon Logo" width={100} height={28} className="object-contain" />
          <select 
            className="bg-(--surface-elevated) border border-(--border) text-xs rounded px-2 py-1 focus:outline-none focus:border-(--primary)"
            value={activeWorkspaceId || ''}
            onChange={(e) => useAuthStore.getState().setActiveWorkspaceAndRole(e.target.value, 'ORGANIZER')}
          >
            {useAuthStore.getState().workspaces.filter(ws => ws.roles.includes('ORGANIZER')).map(ws => (
              <option key={ws.id} value={ws.id}>{ws.organizationName}</option>
            ))}
          </select>
        </div>
        
        {children}
      </main>

      {/* Mobile Bottom Nav (simplified for now) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-(--surface) border-t border-(--border) flex justify-around p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive ? 'text-(--primary)' : 'text-(--text-muted)'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-[10px]">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}
