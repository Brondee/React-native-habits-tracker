import {createSlice} from '@reduxjs/toolkit';
import datesArrayGenerator from '../utils/datesArrayGenerator';

const initialState = {
  curDate: new Date().getDate(),
  dates: datesArrayGenerator(new Date().getDay(), new Date().getDate()),
};

const datesSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    updateCurDate: (state, action) => {
      state.curDate = action.payload.dateNumber;
      state.dates = datesArrayGenerator(
        action.payload.dayNumber,
        action.payload.dateNumber,
      );
    },
  },
});

export const {updateCurDate} = datesSlice.actions;

export default datesSlice.reducer;
