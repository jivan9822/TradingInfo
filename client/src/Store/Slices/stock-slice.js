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
    // Filter done for only active stocks searched by name
    setStocksByName(state, action) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const formattedDate = `${year}-${month}`;

      const filteredStocks = action.payload?.filter((stock) => {
        const lastUpdatedUtc = stock.last_updated_utc;
        if (!lastUpdatedUtc) {
          return false;
        }
        return lastUpdatedUtc.substring(0, 7) === formattedDate;
      });
      state.stocksByName = filteredStocks;
    },
  },
});

export const stockAction = stockSlice.actions;

export default stockSlice.reducer;
