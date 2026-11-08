import { createSlice } from '@reduxjs/toolkit';

const initialCategories = [
  { id: 1, name: 'Consolas', slug: 'consolas', description: 'Consolas de videojuegos de última generación' },
  { id: 2, name: 'Videojuegos', slug: 'videojuegos', description: 'Títulos físicos y digitales para diversas plataformas' },
  { id: 3, name: 'Accesorios', slug: 'accesorios', description: 'Mandos, headsets y periféricos gaming' }
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { items: initialCategories },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    addCategory: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    updateCategory: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteCategory: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;