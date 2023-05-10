import axios from 'axios';
import { stockAction } from '../../Store/Slices/stock-slice';
const API = import.meta.env.VITE_API;

export const SearchByName = (name) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.polygon.io/v3/reference/tickers?search=${name}&active=true&limit=1000&apiKey=${API}`
      )
      .then((res) => {
        const data = res.data.results;
        console.log(data);
        dispatch(stockAction.setStocksByName(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
