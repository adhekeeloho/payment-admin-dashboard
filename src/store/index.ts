import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  role: 'admin' | 'super-admin' | null;
  email: string | null;
  expiresAt: number | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  role: null,
  email: null,
  expiresAt: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    clearSession: () => initialState,
  },
});

export const { setSession, clearSession } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
