import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

export default function LandingView({ categories, setActiveTab, setSelectedCategory }) {
  return (
    <div className="space-y-16">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-cyan-500/30 p-8 sm:p-16 text-center sm:text-left shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
           Siguiente Nivel del Gaming
          </span>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight text-white">
            Tu Lugar Definitivo de <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Gaming</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Consolas de última generación, títulos galardonados y accesorios de alto rendimiento con garantía total.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 justify-center sm:justify-start">
            <button onClick={() => setActiveTab('tienda')} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2">
              Explorar Catálogo <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => setActiveTab('admin')} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition">
              Inventario
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
          <Tag className="w-6 h-6" /> Categorías Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition duration-300">
              <h3 className="text-xl font-bold text-white mb-2">{cat.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{cat.description}</p>
              <button onClick={() => { setSelectedCategory(cat.id); setActiveTab('tienda'); }} className="text-cyan-400 font-semibold text-sm hover:underline flex items-center gap-1">
                Ver productos →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}