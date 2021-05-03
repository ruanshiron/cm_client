import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCustomers.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default customerSlice;
