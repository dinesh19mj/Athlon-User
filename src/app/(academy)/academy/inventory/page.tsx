'use client';

import { Package, Plus, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function InventoryPage() {
  const items = [
    { id: 1, name: 'Yonex Mavis 350', type: 'Shuttles', stock: 12, unit: 'Tubes', status: 'low' },
    { id: 2, name: 'Li-Ning A+ 100', type: 'Shuttles', stock: 45, unit: 'Tubes', status: 'healthy' },
    { id: 3, name: 'Yonex BG65', type: 'Strings', stock: 5, unit: 'Coils', status: 'critical' },
    { id: 4, name: 'Karakal Grips', type: 'Accessories', stock: 120, unit: 'Pieces', status: 'healthy' },
  ];

  return (
    <div className="h-[calc(100vh-156px)] md:h-[calc(100vh-64px)] overflow-hidden bg-[#0A0F1A] text-white flex flex-col">
      <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Inventory</h1>
          <p className="text-white/50 text-xs font-bold mt-1">Manage shuttles & accessories</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#A855F7] text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3 hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="bg-[#121824]/80 backdrop-blur-md border border-white/5 rounded-2xl p-4 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                item.status === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                item.status === 'low' ? 'bg-orange-500/10 border-orange-500/30' :
                'bg-green-500/10 border-green-500/30'
              }`}>
                <Package className={`w-4 h-4 ${
                  item.status === 'critical' ? 'text-red-500' :
                  item.status === 'low' ? 'text-orange-500' :
                  'text-green-500'
                }`} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  {item.name}
                  {item.status === 'critical' && <AlertCircle className="w-3 h-3 text-red-500" />}
                </h3>
                <p className="text-[10px] text-white/50 uppercase tracking-wider">{item.type}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xl font-black ${
                item.status === 'critical' ? 'text-red-500' :
                item.status === 'low' ? 'text-orange-500' :
                'text-white'
              }`}>
                {item.stock}
              </span>
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
