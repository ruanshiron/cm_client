import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { destroyPayment, getAllPayments, Payment } from "../../models/payment";
import { RootState } from "../rootReducer";

let initialState: { [key: string]: Payment[] } = {};

export const fetchAllPaymentsByWorkshop = createAsyncThunk(
  "payments/fetchAll",
  async (
    param: { workshopId: string; from?: string; to?: string },
    thunkAPI
  ) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return {
      workshopId: param.workshopId,
      payments: await getAllPayments(
        uid,
        param.workshopId,
        param.from,
        param.to
      ),
    };
  }
);
export const removePayment = createAsyncThunk(
  "payments/remove",
  async (param: { workshopId: string; paymentId: string }, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return {
      paymentId: param.paymentId,
      workshopId: param.workshopId,
      payments: await destroyPayment(uid, param.workshopId, param.paymentId),
    };
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPayment: (
      state,
      action: PayloadAction<{ workshopId: string; payment: Payment }>
    ) => {
      if (state[action.payload.workshopId]) {
        state[action.payload.workshopId].push(action.payload.payment);
      } else {
        state[action.payload.workshopId] = [action.payload.payment];
      }
    },
    updatePayment: (
      state,
      action: PayloadAction<{ workshopId: string; payment: Payment }>
    ) => {
      state[action.payload.workshopId] = state[action.payload.workshopId]
        ?.length
        ? state[action.payload.workshopId].map((item) =>
            item.id === action.payload.payment.id
              ? action.payload.payment
              : item
          )
        : [action.payload.payment];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPaymentsByWorkshop.fulfilled, (state, action) => {
        state[action.payload.workshopId] = action.payload.payments;
      })
      .addCase(removePayment.fulfilled, (state, action) => {
        state[action.payload.workshopId] = state[
          action.payload.workshopId
        ].filter((item) => item.id !== action.payload.paymentId);
      });
  },
});

export const { addPayment, updatePayment } = paymentSlice.actions;

export default paymentSlice;
