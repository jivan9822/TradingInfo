import axios from 'axios';
import { stockAction } from '../../Store/Slices/stock-slice';
const API = import.meta.env.VITE_API;

export const GetAllStocks = () => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
  const year = yesterday.getFullYear();
  const month = ('0' + (yesterday.getMonth() + 1)).slice(-2);
  const day = ('0' + yesterday.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return (dispatch) => {
    axios
      .get(
        `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${formattedDate}?adjusted=true&apiKey=${API}`
      )
      // https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=0w1W91Hnq5nPepj4d5nz7CzDJDbIp7ZT
      .then((res) => {
        const data = res.data.results;
        dispatch(stockAction.setStocks(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
