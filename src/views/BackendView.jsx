import React from 'react';
import { Server, Database, Layers, Cpu, HardDrive } from 'lucide-react';

export default function BackendView() {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-3xl font-black text-white flex items-center gap-3">
          <Server className="text-cyan-400" /> Arquitectura del Backend Separado
        </h2>
        <p className="text-slate-400">
          El sistema está estructurado bajo el patrón de diseño **MVC (Modelo-Vista-Controlador)** con un servidor Node.js/Express independiente y base de datos MySQL `TiendaVideojuegos`.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Database className="text-cyan-400 w-8 h-8" />
            <h4 className="font-bold text-white">MySQL DB</h4>
            <p className="text-xs text-slate-500">Base de datos `TiendaVideojuegos` con tablas de productos, categorías y reseñas.</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Layers className="text-fuchsia-400 w-8 h-8" />
            <h4 className="font-bold text-white">Modelos</h4>
            <p className="text-xs text-slate-500">Consultas SQL encapsuladas en `productModel.js` y similares.</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <Cpu className="text-emerald-400 w-8 h-8" />
            <h4 className="font-bold text-white">Controladores</h4>
            <p className="text-xs text-slate-500">Lógica de negocio en `productController.js` para manejo de respuestas HTTP.</p>
          </div>
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <HardDrive className="text-amber-400 w-8 h-8" />
            <h4 className="font-bold text-white">Rutas API</h4>
            <p className="text-xs text-slate-500">Endpoints RESTful separados en `productRoutes.js` consumidos mediante CORS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}