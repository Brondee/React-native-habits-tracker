import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAddFormActive: false,
};

const addFormSlice = createSlice({
  name: 'addForm',
  initialState,
  reducers: {
    openForm: state => {
      state.isAddFormActive = true;
    },
    hideAddForm: state => {
      state.isAddFormActive = false;
    },
  },
});

export const {openForm, hideAddForm} = addFormSlice.actions;

export default addFormSlice.reducer;
