import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function CatalogView({
  searchTerm, setSearchTerm, selectedCategory, setSelectedCategory,
  categories, sortBy, setSortBy, filteredProducts, handleAddToCart, setSelectedProduct
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar consolas, juegos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 rounded-xl border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:border-cyan-500"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 focus:border-cyan-500"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name">Nombre</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>
    </div>
  );
}