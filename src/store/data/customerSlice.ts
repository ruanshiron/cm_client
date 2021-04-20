import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCustomers, Customer } from "../../models/customer";

let initialState: Customer[] = [];

export const fetchAllCustomers = createAsyncThunk(
  "customers/fetchAll",
  async () => {
    return await getAllCustomers();
  }
);

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCustomers.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default customerSlice;
