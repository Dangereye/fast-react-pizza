// Redux toolkit
import { configureStore } from '@reduxjs/toolkit';

// Slices
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
