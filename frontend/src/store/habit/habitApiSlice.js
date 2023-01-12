import {apiSlice} from '../api/apiSlice';

export const habitApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getHabits: builder.query({
      query: () => '/habit/all',
    }),
    getHabitsByDate: builder.query({
      query: date => `/habit/date/${date}`,
    }),
    deleteHabit: builder.mutation({
      query: id => ({
        url: `/habit/del/${id}`,
        method: 'DELETE',
      }),
    }),
    editHabit: builder.mutation({
      query: data => ({
        url: `/habit/edit/${data.id}`,
        method: 'PATCH',
        body: {...data},
      }),
    }),
  }),
});

export const {
  useGetHabitsQuery,
  useGetHabitsByDateQuery,
  useDeleteHabitMutation,
  useEditHabitMutation,
} = habitApiSlice;
