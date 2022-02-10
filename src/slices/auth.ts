import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ResponseLogin} from 'src/features/auth/types/login';

import {IUser} from 'src/models/IUser';
import {deleteToken, setToken} from "src/utils/token";

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

            // localStorage.setItem('accessToken', action.payload.access_token);
            // localStorage.setItem('refreshToken', action.payload.refresh_token);
            setToken(action.payload.access_token, 'accessToken');
            setToken(action.payload.refresh_token, 'refreshToken');
        },
        setLogout(state: AuthState) {
            state.user = null;

            deleteToken('accessToken');
            deleteToken('refreshToken');
        },
        setMe(state: AuthState, action: PayloadAction<IUser>) {
            state.user = action.payload;
        }
    },
});

const AuthReducer = AuthSlice.reducer;

export const {setLoggedIn, setLogout, setMe} = AuthSlice.actions;

export default AuthReducer;
