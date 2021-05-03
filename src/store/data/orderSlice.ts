import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrders, Order } from "../../models/order";
import { RootState } from "../rootReducer";

let initialState: Order[] = [];

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllOrders(uid);
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
