import React from 'react';
import { X } from 'lucide-react';

export default function ModalCrud({ crudModal, closeModal, handleSubmitCrud, form, handleInputChange, categories = [] }) {
  if (!crudModal.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold text-white uppercase">
          {crudModal.mode === 'create' ? 'Crear' : 'Editar'} {crudModal.entity}
        </h3>

        <form onSubmit={handleSubmitCrud} className="space-y-4">
          {crudModal.entity === 'products' && (
            <>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Título del Producto</label>
                <input name="title" value={form.title} onChange={handleInputChange} placeholder="Título del producto" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Categoría Asignada</label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Selecciona una Categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Plataforma</label>
                  <input name="platform" value={form.platform} onChange={handleInputChange} placeholder="Ej. PS5, PC, Xbox" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Precio ($)</label>
                  <input name="price" type="number" step="0.01" value={form.price} onChange={handleInputChange} placeholder="0.00" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Stock Disponible</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleInputChange} placeholder="Cantidad" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">URL Imagen</label>
                  <input name="image" value={form.image} onChange={handleInputChange} placeholder="https://..." required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
            </>
          )}

          {crudModal.entity === 'categories' && (
            <>
              <input name="name" value={form.name} onChange={handleInputChange} placeholder="Nombre categoría" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white" />
              <input name="slug" value={form.slug} onChange={handleInputChange} placeholder="Slug (ej. consolas)" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white" />
              <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Descripción" className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white" />
            </>
          )}

          {crudModal.entity === 'reviews' && (
            <>
              <input name="customer_name" value={form.customer_name} onChange={handleInputChange} placeholder="Nombre cliente" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white" />
              <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleInputChange} placeholder="Puntuación (1-5)" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white" />
              <textarea name="comment" value={form.comment} onChange={handleInputChange} placeholder="Comentario" required className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-white" />
            </>
          )}

          <button type="submit" className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition">
            Guardar Registro
          </button>
        </form>
      </div>
    </div>
  );
}