import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: 1,
    title: 'PlayStation 5 Slim',
    category_id: 1,
    platform: 'PS5',
    price: 499.99,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Xbox Series X',
    category_id: 1,
    platform: 'Xbox',
    price: 479.99,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Cyberpunk 2077 Ultimate Edition',
    category_id: 2,
    platform: 'PC / PS5',
    price: 59.99,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Mando DualSense Wireless Cosmic Red',
    category_id: 3,
    platform: 'PS5',
    price: 69.99,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80'
  }
];

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: initialProducts },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.unshift({ ...action.payload, id: Date.now() });
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;