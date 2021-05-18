import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import loadingSlice from "./loading/loadingSlice";
import productSlice from "./data/productSlice";
import workshopSlice from "./data/workshopSlice";
import stageSlice from "./data/stageSlice";
import orderSlice from "./data/orderSlice";
import customerSlice from "./data/customerSlice";
import employeeSlice from "./data/employeeSlice";
import processSlice from "./data/processSlice";
import toastSlice from "./toast/toastSlice";
import diaryPageSlice from "./page/diaryPageSlice";

const rootReducer = combineReducers({
  // User
  user: userReducer,

  // Data
  products: productSlice.reducer,
  stages: stageSlice.reducer,
  workshops: workshopSlice.reducer,
  orders: orderSlice.reducer,
  customers: customerSlice.reducer,
  employees: employeeSlice.reducer,
  processes: processSlice.reducer,

  // Page
  diaryPage: diaryPageSlice.reducer,

  // Loading and Toast
  loading: loadingSlice.reducer,
  toasts: toastSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
