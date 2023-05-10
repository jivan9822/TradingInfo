import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const Login = (email, password) => {
  return (dispatch) => {
    axios
      .post(
        `${PROXY}/user/login`,
        {
          data: { email, password },
        },
        { withCredentials: true }
      )
      .then((res) => {
        const user = res.data.data.user;
        console.log(user);
        dispatch(userAction.setLoginUser(user));
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        console.log(errMsg);
        dispatch(userAction.setErrorMsg(errMsg));
      });
  };
};
