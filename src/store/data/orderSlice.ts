import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { forEach, keys } from "lodash";
import { getAllOrders, Order } from "../../models/order";
import { isBetween } from "../../utils/date";
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

export const statisticSelector = createSelector(
  (state: RootState) => state.orders,
  (state: RootState) => state.customers,
  (_state: RootState, customerId: string) => customerId,
  (orders, customers, customerId) => {
    const customer = customers.find((item) => item.id === customerId);
    const filtedOrders = orders.filter(
      (item) =>
        item.customerId === customerId &&
        isBetween(item.date, customer?.statistic?.from, customer?.statistic?.to)
    );
    const tmp: any = {};
    forEach(filtedOrders, (order) => {
      forEach(order.lines, (line) => {
        if (line.productId in tmp) {
          tmp[line.productId].quantity += line.quantity;
          tmp[line.productId].productName = line.productName;
        } else {
          tmp[line.productId] = {
            quantity: line.quantity,
            productName: line.productName,
          };
        }
      });
    });
    return {
      orders: filtedOrders,
      statistic: keys(tmp).map((key) => ({
        productId: tmp[key].productId,
        productName: tmp[key].productName,
        quantity: tmp[key].quantity,
      })),
    };
  }
);
