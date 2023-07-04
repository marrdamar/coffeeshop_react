import { combineReducers } from "@reduxjs/toolkit";

import counterSlice from "./counter";
import userSlice from "./auth";
import activePromoSlice from "./activePromo";

const reducers = combineReducers({
  counter: counterSlice,
  user: userSlice,
  activePromo: activePromoSlice,
});

export default reducers;
