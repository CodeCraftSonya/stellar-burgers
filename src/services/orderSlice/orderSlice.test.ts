import { orderSlice } from './orderSlice';

describe('action tests', () => {
  const ingredient1 = {
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
  };
  const ingredient2 = {
    id: 'id2',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };
  it('should add ingredient', () => {
    const state = orderSlice.reducer(
      undefined,
      orderSlice.actions.addIngredient(ingredient1)
    );
    expect(state.constructorItems.ingredients).toEqual([ingredient1]);
  });
  it('should remove ingredient', () => {
    const withIngredient = orderSlice.reducer(
      undefined,
      orderSlice.actions.addIngredient(ingredient1)
    );
    const newState = orderSlice.reducer(
      withIngredient,
      orderSlice.actions.removeIngredient('id1')
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });
  it('should change the order of ingredients in the filling', () => {
    const withIngredient1 = orderSlice.reducer(
      undefined,
      orderSlice.actions.addIngredient(ingredient1)
    );
    const withIngredient2 = orderSlice.reducer(
      withIngredient1,
      orderSlice.actions.addIngredient(ingredient2)
    );
    const finalState = orderSlice.reducer(
      withIngredient2,
      orderSlice.actions.moveIngredientUp('id2')
    );
    expect(finalState.constructorItems.ingredients.map((i) => i.id)).toEqual([
      'id2',
      'id1'
    ]);
  });
});
