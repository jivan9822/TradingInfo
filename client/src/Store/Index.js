import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userSlice from './Slices/user-slice';
import stockSlice from './Slices/stock-slice';

const middleware = [thunk];

const store = configureStore({
  reducer: { user: userSlice, stock: stockSlice },
  middleware,
});

export default store;
