'use client';

import { useState } from 'react';
import { Home, Star, DollarSign, MessageCircle } from 'lucide-react';
import { NavBar } from './NavBar';
import { Hero } from './Hero';
import { Features, HowItWorks } from './Sections';
import { Pricing, CTAAndFooter } from './PricingFooter';

export function MarketingPageClient() {
  const [activeTab, setActiveTab] = useState('home');

  const mobileTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ];

  return (
    <>
      {/* Desktop Layout (Hidden on Mobile) */}
      <div className="hidden md:block">
        <NavBar />
        <Hero />

        <Features />
        <HowItWorks />
        <Pricing />
        <CTAAndFooter />
      </div>

      {/* Mobile Layout (Hidden on Desktop) */}
      <div className="md:hidden flex flex-col h-screen bg-(--bg) overflow-hidden">
        <NavBar />
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-20 pt-20">
          {activeTab === 'home' && (
            <div>
              <Hero />
            </div>
          )}
          {activeTab === 'features' && (
            <div>
              <Features />
              <HowItWorks />
            </div>
          )}
          {activeTab === 'pricing' && (
            <Pricing />
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-(--surface) border-t border-(--border) flex justify-around p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-50">
          {mobileTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors min-w-[4rem] ${
                  isActive ? 'text-(--primary)' : 'text-(--text-muted)'
                }`}
              >
                <tab.icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
