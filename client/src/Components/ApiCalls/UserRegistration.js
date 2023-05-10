import axios from 'axios';
import { userAction } from '../../Store/Slices/user-slice';
const PROXY = import.meta.env.VITE_PROXY;

export const userRegistration = (formData) => {
  return (dispatch) => {
    axios
      .post(`${PROXY}/user/registration`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        const successMsg = res.data.message;
        dispatch(userAction.setSuccessMsg(successMsg));
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err.response.data.message;
        dispatch(userAction.setErrorMsg(errMsg));
      });
  };
};
