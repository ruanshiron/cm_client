import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dataReducer from "./dataSlice";
import diaryReducer from "./diarySlice";

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  diary: diaryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
