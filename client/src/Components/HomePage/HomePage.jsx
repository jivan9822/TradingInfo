import { useState } from 'react';
import classes from './HomePage.module.css';
import DisplayStocks from './DisplayStocks/DisplayStocks';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllStocks } from '../ApiCalls/GetAllStocks';
import { stockAction } from '../../Store/Slices/stock-slice';
import DisplayOneStockDetails from './DisplayStocks/DisplayOneStockDetails';
import { getOneStockDetails } from '../ApiCalls/GetTickerOne';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showStocks, setShowStocks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchItem = useSelector((state) => state.stock.oneStock);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGetAllStockData = () => {
    dispatch(GetAllStocks());
    setShowStocks(true);
  };

  const handleSearchStockData = () => {
    setShowStocks(false);
    setShowSearch(true);
    dispatch(stockAction.getOneStockDetails(searchTerm));
    dispatch(getOneStockDetails(searchTerm));
    console.log(searchTerm);
  };

  return (
    <div className={classes.container}>
      <h1>Welcome to the Trading Application</h1>
      <button onClick={handleGetAllStockData}>Get All Stock Data</button>
      <input
        type='text'
        placeholder='Search for a stock symbol'
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleSearchStockData}>Search</button>
      {showStocks && <DisplayStocks />}
      {showSearch && searchItem && (
        <DisplayOneStockDetails stock={searchItem} />
      )}
    </div>
  );
};

export default HomePage;
