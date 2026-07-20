'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { Mail, User, Shield, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuthStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'PLAYER' // Default role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || formData.password !== formData.confirmPassword) return;

    // Simulate sending proper roles
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      roles: [formData.role]
    };

    await register(payload);
    
    // Redirect logic
    if (formData.role === 'ORGANIZER') {
      router.push('/organizer');
    } else if (formData.role === 'UMPIRE') {
      router.push('/umpire');
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
          <Link href="/" className="text-3xl font-extrabold tracking-tighter text-foreground">ATHLON</Link>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-(--live) animate-pulse" />
            <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">Join the Community</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            Start your journey today.
          </h1>
          <p className="text-lg text-foreground/60">
            Create an account to participate in tournaments, track your scores, or organize events.
          </p>
        </div>
        
        <div className="relative z-10 text-sm text-foreground/40">
          © 2026 Athlon Sports.
        </div>
      </div>

      {/* Right side: Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter text-(--text)">ATHLON</Link>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Create an account</h2>
            <p className="text-(--text-muted)">Join Athlon to start your tournament experience.</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                  <input 
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                  <input 
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                <input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-semibold mb-2">
                I want to join as a:
              </label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all appearance-none"
                  required
                >
                  <option value="PLAYER">Player</option>
                  <option value="ORGANIZER">Organizer</option>
                  <option value="UMPIRE">Umpire</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-(--text-muted)">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                <input 
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-(--surface) border border-(--border) rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--text-muted)" />
                <input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-(--surface) border rounded-xl py-4 pl-12 pr-4 text-(--text) focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) transition-all ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword 
                      ? 'border-red-500' 
                      : 'border-(--border)'
                  }`}
                  required
                />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
              )}
            </div>
            
            <button 
              type="submit"
              disabled={formData.password !== formData.confirmPassword}
              className="w-full bg-(--primary) text-[#173404] font-bold py-4 px-4 rounded-xl hover:opacity-90 active:scale-95 transition-all mt-6 shadow-[0_0_20px_rgba(204,255,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>

            <div className="mt-8 text-center text-sm text-(--text-muted)">
              Already have an account?{' '}
              <Link href="/login" className="text-(--primary) hover:underline font-semibold">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
