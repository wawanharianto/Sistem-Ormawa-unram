import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../component/features/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer
  },
});