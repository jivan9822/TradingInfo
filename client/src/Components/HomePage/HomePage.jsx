import { useState } from 'react';
import classes from './HomePage.module.css';
import DisplayStocks from './DisplayStocks/DisplayStocks';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllStocks } from '../ApiCalls/GetAllStocks';
import { stockAction } from '../../Store/Slices/stock-slice';
import DisplayOneStockDetails from './DisplayStocks/DisplayOneStockDetails';
import { getOneStockDetails } from '../ApiCalls/GetTickerOne';
import { logOut } from '../ApiCalls/UserLogOut';
import DisplayErrorMsg from '../Utils/DisplayErrorMsg';
import { userAction } from '../../Store/Slices/user-slice';
import SearchTickerByName from './DisplayStocks/SearchTickerByName';
import { SearchByName } from '../ApiCalls/SearchByName';
import DisplayStockListByName from './DisplayStocks/DisplayStockListByName';

const HomePage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(''); // Input from search field
  const [showStocks, setShowStocks] = useState(true); // To display all stocks data
  const [showSearch, setShowSearch] = useState(false); // Display searched stock in details
  const [searchByName, setSearchByName] = useState(false); // To show search by name Input field
  const searchItem = useSelector((state) => state.stock.oneStock); // getting single data from store
  const ErrMsg = useSelector((state) => state.user.ErrMsg); // getting Error message if any from store
  const user = useSelector((state) => state.user.loginUser); // getting User data from store
  const stockByName = useSelector((state) => state.stock.stocksByName); // stock data searched by name
  let search = '';
  const handleSearch = (event) => {
    search += event.target.value.toUpperCase();
    setSearchTerm(search); // set in state search input filed
    dispatch(stockAction.filterStock(search)); // filtering stocks by search
  };
  // function to receive symbol of particular stock
  const getRequest = (data) => {
    setShowStocks(false); // stop showing stock list
    setShowSearch(true); // display one stock details
    dispatch(getOneStockDetails(data)); // Fetching one stock data
    dispatch(stockAction.getOneStockDetails(data)); // finding one stocks from all stocks
    setSearchByName(false); // hide search by name field
  };
  // onClick get allStocks
  const handleGetAllStockData = () => {
    dispatch(GetAllStocks());
    setShowStocks(true);
    setShowSearch(false);
  };
  // onEnter event
  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchStockData();
    }
  };
  // search by name input data
  const getSearchName = (name) => {
    dispatch(SearchByName(name));
  };
  // To close Error backdrop
  const onCloseHandler = (e, type) => {
    e.preventDefault();
    dispatch(userAction.setErrorMsg(null));
    handleGetAllStockData();
  };
  // get single stock from search field
  const handleSearchStockData = () => {
    setShowStocks(false);
    setShowSearch(true);
    dispatch(getOneStockDetails(searchTerm));
    dispatch(stockAction.getOneStockDetails(searchTerm));
    setSearchTerm('');
  };
  // logout handler
  const onLogOutHandler = (e) => {
    e.preventDefault();
    dispatch(logOut());
  };

  return (
    <div className={classes.container}>
      <div className={classes.contSecond}>
        <div className={classes.userWelcome}>
          <h1>Welcome {user.name}</h1>
          <img src={user.profilePic} alt='User Profile Pic' />
        </div>
        <button className={classes.logout} onClick={onLogOutHandler}>
          LogOut
        </button>
      </div>
      <div className={classes.divSearchByName}>
        <p
          className={classes.searchByName}
          onClick={() => {
            setSearchByName((old) => !old);
            dispatch(stockAction.setStocksByName(null));
            dispatch(stockAction.getOneStockDetails(null));
          }}
        >
          Click to Search by Name
        </p>
        {searchByName && (
          <div>
            <SearchTickerByName onGetName={getSearchName} />
            {stockByName && (
              <DisplayStockListByName data={stockByName} sendId={getRequest} />
            )}
          </div>
        )}
      </div>
      {!searchByName && (
        <div className={classes.searchDiv}>
          <button onClick={handleGetAllStockData}>Get All Stock Data</button>
          <input
            type='text'
            placeholder='Search for a stock symbol/Ticker'
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={onEnterPress}
          />
          <button onClick={handleSearchStockData}>Search</button>
        </div>
      )}
      {showStocks && !ErrMsg && !searchByName && (
        <DisplayStocks sendId={getRequest} />
      )}
      {ErrMsg && (
        <DisplayErrorMsg
          text={ErrMsg}
          onClose={(e) => onCloseHandler(e, 'Error')}
        />
      )}
      {showSearch && searchItem && (
        <DisplayOneStockDetails
          stock={searchItem}
          setShowStocks={setShowStocks}
          setShowSearch={setShowSearch}
          setSearchByName={setSearchByName}
        />
      )}
    </div>
  );
};

export default HomePage;
