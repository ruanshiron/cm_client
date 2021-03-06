import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCustomers, Customer, findCustomer } from "../../models/customer";
import { RootState } from "../rootReducer";

let initialState: Customer[] = [];

export const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllCustomers(uid);
  }
);

export const findCustomerById = createAsyncThunk(
  "customers/find",
  async (param: string, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await findCustomer(uid, param);
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    removeCustomer: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.unshift(action.payload);
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    updateFromDate(state, action) {
      return state.map((v) =>
        v.id !== action.payload.id
          ? v
          : { ...v, statistic: { ...v.statistic, from: action.payload.from } }
      );
    },
    updateToDate(state, action) {
      return state.map((v) =>
        v.id !== action.payload.id
          ? v
          : { ...v, statistic: { ...v.statistic, to: action.payload.to } }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.fulfilled, (_state, action: any) => {
        return action.payload;
      })
      .addCase(findCustomerById.fulfilled, (state, action) => {
        if (action.payload) state.unshift(action.payload);
      });
  },
});

export const {
  removeCustomer,
  addCustomer,
  updateCustomer,
  updateFromDate,
  updateToDate,
} = customerSlice.actions;

export default customerSlice;
