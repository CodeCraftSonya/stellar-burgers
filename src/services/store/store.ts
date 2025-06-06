import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '../ingredientsSlice/ingredientsSlice';
import orderSlice from '../orderSlice/orderSlice';
import feedSlice from '../feedSlice/feedSlice';
import userSlice from '../userSlice/userSlice';

export const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  order: orderSlice,
  feed: feedSlice,
  user: userSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
