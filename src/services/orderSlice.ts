import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

interface IOrderState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IOrderState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const sendOrder = createAsyncThunk<TOrder, void, { state: RootState }>(
  'order/sendOrder',
  async (_, { getState, rejectWithValue }) => {
    const { constructorItems } = getState().order;
    if (!constructorItems.bun) {
      return rejectWithValue('Булка обязательна для заказа');
    }

    try {
      const ingredientIds = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id),
        constructorItems.bun._id
      ];

      const res = await orderBurgerApi(ingredientIds);

      return res.order;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка при отправке заказа');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.constructorItems.ingredients.push(action.payload);
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
        state.orderModalData = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderRequest = false;
        // state.error = action.payload as string;
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setOrderModalData,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = orderSlice.actions;

export default orderSlice.reducer;
