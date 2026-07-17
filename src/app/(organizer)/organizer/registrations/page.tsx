import React from 'react';
import { Users, Search, Filter } from 'lucide-react';

export default function RegistrationsPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 mt-4 md:mt-0 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-1">Registrations</h1>
          <p className="text-(--text-muted)">View and manage tournament registrations.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-(--surface) border border-(--border) text-(--text) font-semibold py-2 px-4 rounded-(--radius-pill) flex items-center gap-2 hover:bg-(--surface-elevated) transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </header>

      <div className="bg-(--surface) border border-(--border) rounded-(--radius-card) overflow-hidden">
        <div className="p-4 border-b border-(--border) flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search players..." 
              className="w-full bg-(--bg) border border-(--border) rounded-(--radius-pill) py-2 pl-10 pr-4 focus:outline-none focus:border-(--primary)"
            />
          </div>
        </div>
        
        <div className="divide-y divide-(--border)">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-(--surface-elevated) transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-(--bg) flex items-center justify-center font-bold text-(--primary)">
                  {`P${i}`}
                </div>
                <div>
                  <h4 className="font-semibold text-base">Player {i}</h4>
                  <p className="text-sm text-(--text-muted)">Summer Slam • Men's Singles</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-semibold">$50.00</p>
                  <p className="text-xs text-(--text-muted)">Entry Fee</p>
                </div>
                <span className="px-3 py-1 bg-(--success)/10 text-(--success) text-xs uppercase font-bold rounded-full">
                  Paid
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
