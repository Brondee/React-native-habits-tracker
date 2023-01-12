import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isModalActive: false,
  modalTitle: '',
  modalType: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    hideModal: state => {
      state.isModalActive = false;
    },
    setModal: (state, action) => {
      state.modalTitle = action.payload.title;
      state.modalType = action.payload.type;
      state.isModalActive = true;
    },
  },
});

export const {setModal, hideModal} = modalSlice.actions;

export default modalSlice.reducer;
