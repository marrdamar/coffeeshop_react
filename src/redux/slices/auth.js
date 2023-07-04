import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { login } from "../../utils/https/auth";

const initialState = {
  isLogin: false,
  // id: null,
  image: null,
  role: null,
  token: null,
  data: null,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};
// console.log(initialState)
const loginThunk = createAsyncThunk(
  "user/post",
  async ({ email, password }, controller) => {
    try {
      const response = await login(email, password, controller);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authLogin: (prevState, action) => {
      console.log(action.payload.data)
      return {
        ...prevState,
        isLogin: true,
        id: action.payload.dataUser.id,
        image: action.payload.dataUser.profile_image,
        role: action.payload.dataUser.roles_id,
        token: action.payload.token,
      };
    },
    updateImage: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          profile_image: action.payload,
        },
      };
    },
    updateAddress: (prevState, action) => {
      console.log(action.payload);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          address: action.payload,
        },
      };
    },
    updatePhone: (prevState, action) => {
      console.log(action.payload);
      return {
        ...prevState,
        data: {
          ...prevState.data,
          phone_number: action.payload,
        },
      };
    },
    authLogout: () => { 
      return initialState
    },
  },
  extraReducers: {
    [loginThunk.pending]: (prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    },
    [loginThunk.fulfilled]: (prevState, action) => {
      // const wrong = action.payload.response.status;
      // return {
      //   ...prevState,
      //   isLoading: false,
      //   isFulfilled: true,
      //   token: wrong ? null : action.payload.token,
      //   data: wrong ? null : action.payload.dataUser,
      //   isLogin: wrong ? false : true,
      // };
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        token: action.payload.token || null,
        data: action.payload.dataUser || null,
        role: action.payload.dataUser.roles_id,
        id: action.payload.dataUser.id,
        image: action.payload.dataUser.profile_image,
        // image: action.payload.profile_image || null,
        // isLogin: true,
      };
    },
    [loginThunk.rejected]: (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        isRejected: true,
        err: action.payload,
      };
    },
  },
});
export const userAction = { ...userSlice.actions, loginThunk };
export default userSlice.reducer;
