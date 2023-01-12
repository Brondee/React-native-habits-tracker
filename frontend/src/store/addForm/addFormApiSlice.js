import {apiSlice} from '../api/apiSlice';

export const addFormApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addHabit: builder.mutation({
      query: data => ({
        url: '/habit/add',
        method: 'POST',
        body: {...data},
      }),
    }),
  }),
});

export const {useAddHabitMutation} = addFormApiSlice;
