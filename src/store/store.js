import {configureStore} from "@reduxjs/toolkit";
import auth from './slices/auth';
import profile from './slices/profile';

export const store = configureStore({
  reducer: {
    auth,
    profile
  }
})