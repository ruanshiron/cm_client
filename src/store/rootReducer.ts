import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import diaryReducer from "./diarySlice";

const rootReducer = combineReducers({
  data: dataReducer,
  diary: diaryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
