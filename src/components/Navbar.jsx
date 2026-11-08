import React from 'react';
import { Gamepad2, ShoppingBag } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalItems }) {
  const tabs = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'tienda', label: 'Tienda' },
    { id: 'admin', label: 'Inventario' },
    { id: 'carrito', label: `Carrito (${totalItems})` },
    
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('inicio')}>
          <div className="bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-2.5 rounded-xl shadow-lg shadow-cyan-500/20">
            <Gamepad2 className="w-7 h-7 text-slate-950" />
          </div>
          <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Tienda<span className="text-white">VideoJuegos</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-full border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setActiveTab('carrito')}
          className="relative p-2.5 bg-slate-800/80 hover:bg-slate-700 rounded-xl transition border border-slate-700"
        >
          <ShoppingBag className="w-6 h-6 text-cyan-400" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}