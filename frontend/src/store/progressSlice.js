import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  doneToday: 0,
  needToBeDone: 0,
  percentage: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    updateNeedToBeDone: (state, action) => {
      state.needToBeDone = action.payload;
      state.percentage = Math.trunc(
        (state.doneToday / state.needToBeDone) * 100,
      );
    },
    updateDoneToday: (state, action) => {
      state.doneToday = state.doneToday + action.payload;
      state.percentage = Math.trunc(
        (state.doneToday / state.needToBeDone) * 100,
      );
    },
    setDoneToday: (state, action) => {
      state.doneToday = action.payload;
      state.percentage = Math.trunc(
        (state.doneToday / state.needToBeDone) * 100,
      );
    },
  },
});

export const {updateNeedToBeDone, updateDoneToday, setDoneToday} =
  progressSlice.actions;

export default progressSlice.reducer;
