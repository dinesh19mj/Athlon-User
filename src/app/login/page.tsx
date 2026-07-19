'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Mail, Home, Trophy, Plus, Building, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    login(identifier);
    
    // Check if the user is an organizer or umpire based on our simple mock logic
    const lowerIdentifier = identifier.toLowerCase();
    
    if (lowerIdentifier.includes('organizer')) {
      router.push('/organizer');
    } else if (lowerIdentifier.includes('umpire')) {
      router.push('/umpire');
    } else if (lowerIdentifier.includes('academy')) {
      router.push('/academy');
    } else if (lowerIdentifier.includes('club')) {
      router.push('/club');
    } else {
      router.push('/player');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-(--bg) text-(--text) pb-20 lg:pb-0 relative">
      {/* Left side: Branding/Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A0E17] flex-col justify-between p-12 overflow-hidden border-r border-(--border)">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-(--primary)/20 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-10">
          <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white">ATHLON</Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-(--live) animate-pulse" />
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">Live Scoring Platform</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            The tournament experience, elevated.
          </h1>
          <p className="text-lg text-white/60">
            Join thousands of players and organizers running seamless events on Athlon.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-white/40">
          © 2026 Athlon Sports.
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md relative z-10">
          {/* Background Watermark for Form Area */}
          <div className="absolute inset-0 flex items-center justify-center z-[-1] pointer-events-none opacity-[0.03]">
            <img src="/Athlon-sport.png" alt="Watermark" className="w-full max-w-[300px] object-contain" />
          </div>
          
          <div className="text-center lg:text-left mb-8">
             <h2 className="text-4xl font-black text-white tracking-wide">Login</h2>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="identifier" className="block text-sm font-semibold mb-2">
                Email or Phone Number
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                <input 
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="organizer@athlon.com"
                  className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 px-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-(--primary) text-white font-bold py-4 px-4 rounded-xl hover:opacity-90 active:scale-95 transition-all mt-6 shadow-[0_0_20px_rgba(27,156,86,0.3)]"
            >
              Sign In
            </button>

            <div className="mt-8 text-center text-sm text-(--text-muted)">
              Don't have an account?{' '}
              <Link href="/register" className="text-(--primary) hover:underline font-semibold">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar (Same as Home) */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A0F1A]/95 backdrop-blur-xl border-t border-white/10 z-50 px-6 flex items-center justify-between max-w-lg mx-auto">
        <Link href="/" className="flex flex-col items-center gap-1 w-16 opacity-50 hover:opacity-100 transition-opacity">
          <Home className="w-6 h-6 text-white" />
          <span className="text-[9px] font-bold text-white">Home</span>
        </Link>
        
        <Link href="/tournaments" className="flex flex-col items-center gap-1 w-16 opacity-50 hover:opacity-100 transition-opacity">
          <Trophy className="w-6 h-6 text-white" />
          <span className="text-[9px] font-bold text-white">Tournaments</span>
        </Link>

        {/* Elevated Center + Button */}
        <div className="relative -top-6 flex items-center justify-center">
          <Link href="/create" className="w-16 h-16 rounded-full bg-[#1B9C56] text-black shadow-[0_8px_30px_rgba(27,156,86,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border-4 border-[#0A0F1A]">
            <Plus className="w-8 h-8 stroke-[3]" />
          </Link>
        </div>

        <Link href="/academies" className="flex flex-col items-center gap-1 w-16 opacity-50 hover:opacity-100 transition-opacity">
          <Building className="w-6 h-6 text-white" />
          <span className="text-[9px] font-bold text-white">Academy</span>
        </Link>
        
        <Link href="/profile" className="flex flex-col items-center gap-1 w-16 opacity-50 hover:opacity-100 transition-opacity">
          <User className="w-6 h-6 text-white" />
          <span className="text-[9px] font-bold text-white">Profile</span>
        </Link>
      </nav>
    </div>
  );
}

