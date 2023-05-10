import axios from 'axios';
import { stockAction } from '../../Store/Slices/stock-slice';
const API = import.meta.env.VITE_API;

export const getOneStockDetails = (search) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  return (dispatch) => {
    axios
      .get(
        `https://api.polygon.io/v3/reference/tickers/${search}?date=${currentDate}&apiKey=${API}`
      )
      .then((res) => {
        console.log(res);
        const data = res.data.results;
        dispatch(stockAction.setTicker(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
