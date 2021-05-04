import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import diaryReducer from "./diarySlice";
import loadingSlice from "./loading/loadingSlice";
import productSlice from "./data/productSlice";
import workshopSlice from "./data/workshopSlice";
import stageSlice from "./data/stageSlice";
import orderSlice from "./data/orderSlice";
import customerSlice from "./data/customerSlice";
import supplierSlice from "./data/supplierSlice";
import employeeSlice from "./data/employeeSlice";
import processSlice from "./data/processSlice";
import toastSlice from "./toast/toastSlice";

const rootReducer = combineReducers({
  user: userReducer,
  diary: diaryReducer,
  products: productSlice.reducer,
  stages: stageSlice.reducer,
  workshops: workshopSlice.reducer,
  orders: orderSlice.reducer,
  customers: customerSlice.reducer,
  suppliers: supplierSlice.reducer,
  employees: employeeSlice.reducer,
  processes: processSlice.reducer,
  loading: loadingSlice.reducer,
  toasts: toastSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
