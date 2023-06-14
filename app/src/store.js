import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../src/store/Reviewstore';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
