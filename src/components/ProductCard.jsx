import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onSelect }) {
  if (!product) return null;

  // Validación segura del precio
  const rawPrice = Number(product.price);
  const formattedPrice = !isNaN(rawPrice) ? rawPrice.toFixed(2) : '0.00';

  return (
    <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 shadow-xl flex flex-col justify-between">
      <div>
        <div className="relative h-48 bg-slate-950 overflow-hidden">
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'} 
            alt={product.title || 'Producto'} 
            className="w-full h-full object-cover" 
          />
          <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-xs px-2.5 py-1 rounded-full font-bold">
            {product.platform || 'Gaming'}
          </span>
        </div>
        <div className="p-5 space-y-2">
          <h3 className="font-bold text-lg text-white line-clamp-1">{product.title || 'Sin Título'}</h3>
          <p className="text-2xl font-black text-cyan-400">${formattedPrice}</p>
          <p className="text-xs text-slate-500">Stock disponible: {product.stock ?? 0} unids.</p>
        </div>
      </div>

      <div className="p-5 pt-0 flex gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Agregar
        </button>
        <button
          onClick={() => onSelect(product)}
          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition"
        >
          Ver
        </button>
      </div>
    </div>
  );
}