import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllCustomers, Customer } from "../../models/customer";
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCustomers.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export const {
  removeCustomer,
  addCustomer,
  updateCustomer,
} = customerSlice.actions;

export default customerSlice;
