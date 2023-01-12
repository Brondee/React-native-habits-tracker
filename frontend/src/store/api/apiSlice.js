import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setCredentials, logOut} from '../auth/authSlice';

let refreshTokenState;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://10.0.2.2:3333',
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token;
    refreshTokenState = getState().auth.refreshToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(args, api, extraOptions);
  console.log(result);
  if (result?.error?.status === 401) {
    console.log('sending refresh token');
    dispatch(
      setCredentials({
        accessToken: refreshTokenState,
        refreshToken: null,
        email: null,
      }),
    );
    const refreshRes = await baseQuery('/auth/refresh', api, extraOptions);
    console.log(refreshRes);
    if (refreshRes?.data) {
      const email = api.getState().auth.email;
      api.dispatch(setCredentials({...refreshRes.data, email}));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});
