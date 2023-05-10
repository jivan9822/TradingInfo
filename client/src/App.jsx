import { useDispatch, useSelector } from 'react-redux';
import LoginReg from './Components/UserLoginRegistration/RegLog';
import { useEffect } from 'react';
import { GetUser } from './Components/ApiCalls/GetUser';
import HomePage from './Components/HomePage/HomePage';

function App() {
  const user = useSelector((state) => state.user.loginUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUser());
  }, []);
  return <div>{!user ? <LoginReg /> : <HomePage />}</div>;
}

export default App;
