import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchInput: '',
};

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { updateSearchInput } = productSlide.actions;

export default productSlide.reducer;
