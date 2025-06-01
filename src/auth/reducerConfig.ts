import { configureStore } from '@reduxjs/toolkit'
import authReducer from './state';

const reducerStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default reducerStore;