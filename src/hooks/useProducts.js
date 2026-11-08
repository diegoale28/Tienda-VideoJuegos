import { useState, useMemo } from 'react';

export function useProducts(products = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.platform.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || String(product.category_id) === String(selectedCategory);
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  return { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy, filteredProducts };
}