import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const initialToken = localStorage.getItem('token');
const initialExpiration = localStorage.getItem('expiration');
let initialClaims = null;

if (initialToken) {
    try {
        initialClaims = jwtDecode(initialToken);
    } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }
}

const initialState = {
    token: initialToken,
    expiration: initialExpiration,
    claims: initialClaims,
    isAuthenticated: !!initialToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            const { token, expiration } = action.payload;
            state.token = token;
            state.expiration = expiration;
            state.claims = jwtDecode(token);
            state.isAuthenticated = true;

            localStorage.setItem('token', token);
            localStorage.setItem('expiration', expiration);
        },
        logout(state) {
            state.token = null;
            state.expiration = null;
            state.claims = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
