import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders, Order } from "../../models/order";

let initialState: Order[] = [];

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async () => {
    return await getAllOrders();
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default orderSlice;
