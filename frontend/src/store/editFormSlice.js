import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isEditFormActive: false,
  habitId: 0,
};

const editFormSlice = createSlice({
  name: 'editForm',
  initialState,
  reducers: {
    updateHabitId: (state, action) => {
      state.habitId = action.payload;
      state.isEditFormActive = true;
    },
    hideForm: state => {
      state.isEditFormActive = false;
    },
  },
});

export const {updateHabitId, hideForm} = editFormSlice.actions;

export default editFormSlice.reducer;
