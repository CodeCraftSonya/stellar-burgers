import {
  getUser,
  getUserOrders,
  initialState,
  login,
  logout,
  register,
  updateUserData,
  userSlice
} from './userSlice';

describe('userSlice reducers tests', () => {
  const mockAuthResponse = {
    success: true,
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    user: {
      email: 'email',
      name: 'name'
    }
  };

  const mockLoginRequest = {
    success: true,
    email: 'email',
    password: 'password'
  };

  const mockRegisterRequest = {
    success: true,
    email: 'email',
    name: 'name',
    password: 'password'
  };

  const mockOrdersResponse = [
    {
      _id: 'id',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      number: 0,
      ingredients: ['ing1']
    }
  ];

  it('should handle login.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      login.pending('', mockLoginRequest)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.isError).toBe(false);
  });

  it('should handle login.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      login.fulfilled(mockAuthResponse, '', mockLoginRequest)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockAuthResponse.user);
    expect(nextState.refreshToken).toEqual(mockAuthResponse.refreshToken);
    expect(nextState.accessToken).toEqual(mockAuthResponse.accessToken);
  });

  it('should handle login.rejected', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'Network error' }
    };
    const nextState = userSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.isError).toBe(true);
  });

  it('should handle register.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      register.pending('', mockRegisterRequest)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.isError).toBe(false);
  });

  it('should handle register.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      register.fulfilled(mockAuthResponse, '', mockRegisterRequest)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockAuthResponse.user);
    expect(nextState.refreshToken).toEqual(mockAuthResponse.refreshToken);
    expect(nextState.accessToken).toEqual(mockAuthResponse.accessToken);
  });

  it('should handle register.rejected', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'Network error' }
    };
    const nextState = userSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.isError).toBe(true);
  });

  it('should handle updateUserData.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      updateUserData.fulfilled(mockAuthResponse, '', mockLoginRequest)
    );
    expect(nextState.user).toEqual(mockAuthResponse.user);
  });

  it('should handle getUserOrders.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      getUserOrders.pending('', undefined)
    );
    expect(nextState.orderRequest).toBe(true);
  });

  it('should handle getUserOrders.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      getUserOrders.fulfilled(mockOrdersResponse, '', undefined)
    );
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orders).toEqual(mockOrdersResponse);
  });

  it('should handle getUserOrders.rejected', () => {
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Network error' }
    };
    const nextState = userSlice.reducer(initialState, action);
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orders).toEqual([]);
  });

  it('should handle logout.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      logout.fulfilled(undefined, '')
    );
    expect(nextState.orders).toEqual([]);
    expect(nextState.user).toBe(null);
    expect(nextState.refreshToken).toBe('');
    expect(nextState.accessToken).toBe('');
  });

  it('should handle getUser.pending', () => {
    const nextState = userSlice.reducer(
      initialState,
      getUser.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.isError).toBe(false);
  });

  it('should handle getUser.fulfilled', () => {
    const nextState = userSlice.reducer(
      initialState,
      getUser.fulfilled(mockAuthResponse.user, '', undefined)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockAuthResponse.user);
  });

  it('should handle getUser.rejected', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Network error' }
    };
    const nextState = userSlice.reducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toBe(null);
  });
});
