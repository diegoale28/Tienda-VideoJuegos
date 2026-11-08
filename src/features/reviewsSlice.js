import { createSlice } from '@reduxjs/toolkit';

const initialReviews = [
  { id: 1, customer_name: 'Carlos Pérez', product_id: 1, rating: 5, comment: 'Excelente consola, envío rápido.', status: 'Publicado' },
  { id: 2, customer_name: 'Mariana Gómez', product_id: 3, rating: 4, comment: 'Gran juego después de los últimos parches.', status: 'Publicado' }
];

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: { items: initialReviews },
  reducers: {
    setReviews: (state, action) => {
      state.items = action.payload;
    },
    addReview: (state, action) => {
      state.items.unshift({ ...action.payload, id: Date.now() });
    },
    updateReview: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteReview: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { setReviews, addReview, updateReview, deleteReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;