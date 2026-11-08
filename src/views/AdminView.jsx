import React from 'react';
import { Monitor, Plus, Edit2, Trash2, Star } from 'lucide-react';

export default function AdminView({ products, categories, reviews, openModal, handleDelete }) {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Monitor className="text-cyan-400" /> Panel de Control
          </h2>
          <p className="text-slate-400 text-sm">Gestiona Productos, Categorías y Reseñas de Clientes.</p>
        </div>
      </div>

      {/* TABLA 1: PRODUCTOS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-cyan-400">1. Productos</h3>
          <button onClick={() => openModal('products', 'create')} className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Agregar Producto
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-cyan-400 uppercase text-xs">
              <tr>
                <th className="p-3">Título</th>
                <th className="p-3">Plataforma</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-white">{p.title}</td>
                  <td className="p-3">{p.platform}</td>
                  <td className="p-3 text-cyan-400 font-bold">${p.price}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <button onClick={() => openModal('products', 'edit', p)} className="p-1.5 bg-slate-800 text-cyan-400 rounded"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('products', p.id)} className="p-1.5 bg-slate-800 text-red-400 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLA 2: CATEGORÍAS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-fuchsia-400">2. Categorías</h3>
          <button onClick={() => openModal('categories', 'create')} className="px-4 py-2 bg-fuchsia-500 text-slate-950 font-bold rounded-xl flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Agregar Categoría
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-fuchsia-400 uppercase text-xs">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Slug</th>
                <th className="p-3">Descripción</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-white">{c.name}</td>
                  <td className="p-3 text-slate-400">{c.slug}</td>
                  <td className="p-3">{c.description}</td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <button onClick={() => openModal('categories', 'edit', c)} className="p-1.5 bg-slate-800 text-fuchsia-400 rounded"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('categories', c.id)} className="p-1.5 bg-slate-800 text-red-400 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLA 3: RESEÑAS / CLIENTES */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-emerald-400">3. Reseñas / Clientes</h3>
          <button onClick={() => openModal('reviews', 'create')} className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Agregar Reseña
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-emerald-400 uppercase text-xs">
              <tr>
                <th className="p-3">Cliente</th>
                <th className="p-3">Calificación</th>
                <th className="p-3">Comentario</th>
                <th className="p-3">Estado</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-semibold text-white">{r.customer_name}</td>
                  <td className="p-3 flex text-amber-400"><Star className="w-4 h-4 fill-amber-400" /> {r.rating}/5</td>
                  <td className="p-3">{r.comment}</td>
                  <td className="p-3"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">{r.status}</span></td>
                  <td className="p-3 text-right flex justify-end gap-2">
                    <button onClick={() => openModal('reviews', 'edit', r)} className="p-1.5 bg-slate-800 text-emerald-400 rounded"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete('reviews', r.id)} className="p-1.5 bg-slate-800 text-red-400 rounded"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}