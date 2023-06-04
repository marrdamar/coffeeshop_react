import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { login } from "../../utils/https/auth";

const initialState = {
  // isLogin: false,
  // id: null,
  // image: null,
  // role: null,
  token: null,
  data: null,
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  err: null,
};

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
      return {
        ...prevState,
        // isLogin: true,
        id: action.payload.dataUser.id,
        image: action.payload.dataUser.profile_picture,
        role: action.payload.dataUser.role_id,
        token: action.payload.token,
      };
    },
    updateImage: (prevState, action) => {
      return {
        ...prevState,
        data: {
          ...prevState.data,
          profile_picture: action.payload,
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
          phone: action.payload,
        },
      };
    },
    authLogout: () => {
      return initialState;
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
