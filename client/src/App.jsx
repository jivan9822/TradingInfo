import { useDispatch, useSelector } from 'react-redux';
import LoginReg from './Components/UserLoginRegistration/RegLog';
import { useEffect } from 'react';
import { GetUser } from './Components/ApiCalls/GetUser';
import HomePage from './Components/HomePage/HomePage';
import { GetAllStocks } from './Components/ApiCalls/GetAllStocks';

function App() {
  const user = useSelector((state) => state.user.loginUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUser()); // Set login user fetching user data
    dispatch(GetAllStocks()); // Getting all stocks data when server starts
  }, []);
  return <div>{!user ? <LoginReg /> : <HomePage />}</div>;
}

export default App;
