import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  isLoading: boolean;
  isError: boolean;
  feed: {
    total: number;
    totalToday: number;
  };
  orders: TOrder[];
};

export const initialState: TFeedState = {
  isLoading: false,
  isError: false,
  feed: {
    total: 0,
    totalToday: 0
  },
  orders: []
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', getFeedsApi);

export const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectFeedTotals: (state) => state.feed,
    selectIsLoading: (state) => state.isLoading,
    selectIsError: (state) => state.isError
  }
});

export default FeedSlice.reducer;
