import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('tests for store configuration', () => {
  it('create store with rootReducer', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('user');
  });
});
