import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stocks: [],
  filterStock: [],
  stocksByName: null,
  oneStock: null,
  stockDetail: null,
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStocks(state, action) {
      state.stocks = action.payload;
      state.filterStock = action.payload;
    },
    getOneStockDetails(state, action) {
      state.oneStock = state.stocks.find((stock) => stock.T === action.payload);
    },
    setTicker(state, action) {
      state.stockDetail = action.payload;
    },
    filterStock(state, action) {
      const search = action.payload;
      state.filterStock = state.stocks.filter((each) =>
        each.T.includes(search)
      );
    },
    setStocksByName(state, action) {
      state.stocksByName = action.payload;
    },
  },
});

export const stockAction = stockSlice.actions;

export default stockSlice.reducer;
