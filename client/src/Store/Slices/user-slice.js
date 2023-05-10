import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginUser: null,
  ErrMsg: null,
  SuccessMsg: null,
  allUser: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginUser(state, action) {
      state.loginUser = action.payload;
    },
    setSuccessMsg(state, action) {
      state.SuccessMsg = action.payload;
    },
    setErrorMsg(state, action) {
      state.ErrMsg = action.payload;
    },
    setUserLogOut(state, action) {
      state.loginUser = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
