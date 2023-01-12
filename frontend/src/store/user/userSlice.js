import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentStreak: 0,
  allHabitsDone: 0,
  longestStreak: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.currentStreak = action.payload.currentStreak;
      state.allHabitsDone = action.payload.allHabitsDone;
      state.longestStreak = action.payload.longestStreak;
    },
  },
});

export const {setStats} = userSlice.actions;

export default userSlice.reducer;
