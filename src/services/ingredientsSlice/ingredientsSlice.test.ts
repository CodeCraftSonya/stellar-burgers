import { fetchIngredients, ingredientsSlice } from './ingredientsSlice';

describe('ingredientsSlice reducers tests', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  const mockIngredients = [
    {
      id: 'id1',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];
  it('should handle fetchIngredients.pending', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.items).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Network error' }
    };
    const nextState = ingredientsSlice.reducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Network error');
  });
});
