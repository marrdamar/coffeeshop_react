import { combineReducers } from "@reduxjs/toolkit";

import counterSlice from "./counter";
import userSlice from "./auth";

const reducers = combineReducers({
  counter: counterSlice,
  user: userSlice,
});

export default reducers;
