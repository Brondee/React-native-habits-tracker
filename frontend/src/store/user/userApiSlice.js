import {apiSlice} from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserInfo: builder.query({
      query: () => '/user/stats',
    }),
  }),
});

export const {useGetUserInfoQuery} = userApiSlice;
