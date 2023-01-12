import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice';
import habitSlice from './habit/habitSlice';
import progressSlice from './progressSlice';
import editFormSlice from './editFormSlice';
import addFormSlice from './addForm/addFormSlice';
import modalSlice from './modalSlice';
import datesSlice from './datesSlice';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    habit: habitSlice,
    progress: progressSlice,
    editForm: editFormSlice,
    addForm: addFormSlice,
    modal: modalSlice,
    dates: datesSlice,
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
