import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseLogin } from 'src/features/auth/types/login';

import { IUser } from 'src/models/IUser';

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLoggedIn(state: AuthState, action: PayloadAction<ResponseLogin>) {
      state.user = action.payload.user;

      localStorage.setItem('accessToken', action.payload.access_token);
      localStorage.setItem('refreshToken', action.payload.refresh_token);
    },
    setLogout(state: AuthState) {
      state.user = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

const AuthReducer = AuthSlice.reducer;

export const { setLoggedIn, setLogout } = AuthSlice.actions;

export default AuthReducer;
