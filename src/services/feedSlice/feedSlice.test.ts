import feedReducer, { fetchFeed, initialState } from './feedSlice';

describe('feedSlice reducers tests', () => {
  const mockFeedsResponse = {
    total: 5,
    totalToday: 10,
    orders: [],
    success: true
  };
  it('should handle fetchFeed.pending', () => {
    const nextState = feedReducer(
      initialState,
      fetchFeed.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.isError).toBe(false);
  });

  it('should handle fetchFeed.fulfilled', () => {
    const nextState = feedReducer(
      initialState,
      fetchFeed.fulfilled(mockFeedsResponse, '', undefined)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.feed).toEqual({
      total: 5,
      totalToday: 10
    });
  });

  it('should handle fetchFeed.rejected', () => {
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: 'Network error' }
    };
    const nextState = feedReducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.isError).toBe(true);
  });
});
