import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllOrders, Order } from "../../models/order";
import { RootState } from "../rootReducer";

let initialState: Order[] = [];

export const fetchAllOrdersByCustomer = createAsyncThunk(
  "orders/fetchAll",
  async (param: string, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllOrders(uid, param);
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    removeOrder: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.unshift(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllOrdersByCustomer.fulfilled,
      (_state, action: any) => {
        return action.payload;
      }
    );
  },
});

export const { removeOrder, addOrder, updateOrder } = orderSlice.actions;

export default orderSlice;
