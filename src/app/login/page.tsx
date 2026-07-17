'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
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
      router.push('/academy/dashboard');
    } else {
      router.push('/player');
    }
  };

  return (
    <div className="min-h-screen flex bg-(--bg) text-(--text)">
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter text-(--text)">ATHLON</Link>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
            <p className="text-(--text-muted)">Enter your email or phone number to sign in to your account.</p>
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
              className="w-full bg-(--primary) text-[#173404] font-bold py-4 px-4 rounded-xl hover:opacity-90 active:scale-95 transition-all mt-6 shadow-[0_0_20px_rgba(204,255,0,0.15)]"
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
    </div>
  );
}

