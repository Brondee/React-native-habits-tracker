import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {email, accessToken, refreshToken} = action.payload;
      state.email = email;
      state.token = accessToken;
      state.refreshToken = refreshToken;
    },
    logOut: state => {
      state.email = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUserEmail = state => state.auth.email;
export const selectCurrentToken = state => state.auth.token;
