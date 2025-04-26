import { configureStore } from '@reduxjs/toolkit'
import authReducer from './state';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})