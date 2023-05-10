import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const logOut = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/user/logOut`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        dispatch(userAction.setUserLogOut());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
