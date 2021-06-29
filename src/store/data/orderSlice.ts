import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { forEach, keys } from "lodash";
import { getAllOrders, Order } from "../../models/order";
import { Price } from "../../models/price";
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

const subtotal = (productId: string, date: string, prices: Price[]) => {
  const price = prices.find(
    (i) => i.productId === productId && isBetween(date, i.from, i.to)
  );
  if (!price) {
    return 0;
  } else {
    return price.value;
  }
};

export const statisticSelector = createSelector(
  (state: RootState) => state.orders,
  (state: RootState) => state.customers,
  (_state: RootState, customerId: string, prices: Price[]) => ({
    customerId,
    prices,
  }),
  (orders, customers, { customerId, prices }) => {
    const customer = customers.find((item) => item.id === customerId);
    const filtedOrders = orders.filter(
      (item) =>
        item.customerId === customerId &&
        isBetween(item.date, customer?.statistic?.from, customer?.statistic?.to)
    );
    const filtedPrices = prices.filter((i) => i.customerId === customerId);
    let all_subtotal = 0;
    const tmp: any = {};
    forEach(filtedOrders, (order) => {
      forEach(order.lines, (line) => {
        const sub = subtotal(line.productId, order.date, filtedPrices);
        all_subtotal += sub;
        if (line.productId in tmp) {
          tmp[line.productId].quantity += line.quantity;
          tmp[line.productId].productName = line.productName;
          tmp[line.productId].subtotal += sub;
        } else {
          tmp[line.productId] = {
            quantity: line.quantity,
            productName: line.productName,
            subtotal: sub,
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
        subtotal: tmp[key].subtotal,
      })),
      subtotal: all_subtotal,
    };
  }
);
