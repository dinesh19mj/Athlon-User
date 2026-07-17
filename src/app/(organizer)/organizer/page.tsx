'use client';

import Link from 'next/link';
import { Activity, Users, PlusCircle, CalendarDays, DollarSign } from 'lucide-react';

const stats = [
  { name: 'Active Tournaments', value: '2', icon: Activity, color: 'text-(--primary)' },
  { name: 'Total Registrations', value: '145', icon: Users, color: 'text-(--info)' },
  { name: 'Matches Today', value: '12', icon: CalendarDays, color: 'text-(--live)' },
  { name: 'Revenue', value: '$4,200', icon: DollarSign, color: 'text-(--success)' },
];

export default function OrganizerDashboardPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 mt-4 md:mt-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">Organizer Dashboard</h1>
          <p className="text-(--text-muted)">Manage your tournaments and matches.</p>
        </div>
        <button className="bg-(--primary) text-black font-bold py-2 px-6 rounded-(--radius-pill) flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
          <PlusCircle className="w-5 h-5" /> Create Tournament
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-(--surface) border border-(--border) p-4 rounded-(--radius-card)">
            <div className="flex items-center gap-3 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <h3 className="text-sm font-semibold text-(--text-muted)">{stat.name}</h3>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Live Action</h2>
            <Link href="/organizer/live-matches" className="text-(--info) text-sm font-semibold hover:underline">
              View Board
            </Link>
          </div>
          <div className="bg-(--surface) border border-(--border) p-6 rounded-(--radius-card) flex flex-col items-center justify-center text-center min-h-[200px]">
            <Activity className="w-12 h-12 text-(--live) mb-4" />
            <h3 className="font-bold text-lg mb-1">3 Matches Live</h3>
            <p className="text-(--text-muted) text-sm mb-4">Keep track of ongoing scores across all courts.</p>
            <Link href="/organizer/live-matches" className="bg-(--surface-elevated) hover:bg-(--border) transition-colors px-4 py-2 rounded-(--radius-pill) text-sm font-semibold">
              Go to Live Matches
            </Link>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Registrations</h2>
            <Link href="/organizer/registrations" className="text-(--info) text-sm font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-(--surface) border border-(--border) rounded-(--radius-card) overflow-hidden">
            <div className="divide-y divide-(--border)">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-(--surface-elevated) transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-(--bg) flex items-center justify-center font-bold text-(--primary)">
                      {`P${i}`}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Player {i}</h4>
                      <p className="text-xs text-(--text-muted)">Summer Slam • Men's Singles</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-(--success)/10 text-(--success) text-[10px] uppercase font-bold rounded-full">
                    Paid
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
