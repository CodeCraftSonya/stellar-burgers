import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from './store';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

interface IIngredientsState {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IIngredientsState = {
  items: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  }
});

export default ingredientsSlice.reducer;

export const selectFilteredIngredients = createSelector(
  (state: RootState) => state.ingredients.items,
  (items) => ({
    buns: items.filter((item) => item.type === 'bun'),
    mains: items.filter((item) => item.type === 'main'),
    sauces: items.filter((item) => item.type === 'sauce')
  })
);
