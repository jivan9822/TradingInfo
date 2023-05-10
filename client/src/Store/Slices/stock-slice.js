import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  oneStock: null,
  stockDetail: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStocks(state, action) {
      state.stocks = action.payload;
    },
    getOneStockDetails(state, action) {
      state.oneStock = state.stocks.find((stock) => stock.T === action.payload);
    },
    setTicker(state, action) {
      state.stockDetail = action.payload;
    },
  },
});

export const stockAction = stockSlice.actions;

export default stockSlice.reducer;
