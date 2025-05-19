import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TOrder } from '@utils-types';

type IOrderState = {
  isLoading: boolean;
  isError: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: IOrderState = {
  isLoading: false,
  isError: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const sendOrder = createAsyncThunk('order/sendOrder', orderBurgerApi);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder | null>) {
      state.orderModalData = action.payload;
    },
    clearConstructor(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
      state.orderRequest = false;
      state.orderModalData = null;
    },
    moveIngredientUp(state, action: PayloadAction<string>) {
      const { ingredients } = state.constructorItems;
      const index = ingredients.findIndex((item) => item.id === action.payload);

      if (index > 0) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index - 1]] = [
          newIngredients[index - 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    },
    moveIngredientDown(state, action: PayloadAction<string>) {
      const { ingredients } = state.constructorItems;
      const index = ingredients.findIndex((item) => item.id === action.payload);

      if (index < ingredients.length - 1) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index + 1]] = [
          newIngredients[index + 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.isError = true;
        state.orderModalData = null;
      });
  },
  selectors: {
    getNewOrderData: (state) =>
      state.constructorItems.bun?._id
        ? [
            state.constructorItems.bun._id,
            ...state.constructorItems.ingredients.map((item) => item._id),
            state.constructorItems.bun._id
          ]
        : [],
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectConstructorItems: (state) => state.constructorItems,
    selectIsLoading: (state) => state.isLoading,
    selectIsError: (state) => state.isError
  }
});

export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setOrderModalData,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = orderSlice.actions;

export default orderSlice.reducer;
