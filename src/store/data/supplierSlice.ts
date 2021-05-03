import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSuppliers, Supplier } from "../../models/supplier";
import { RootState } from "../rootReducer";

let initialState: Supplier[] = [];

export const fetchAllSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async (_param, thunkAPI) => {
    const {
      user: { uid },
    } = thunkAPI.getState() as RootState;
    return await getAllSuppliers(uid);
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSuppliers.fulfilled, (_state, action: any) => {
      return action.payload;
    });
  },
});

export default supplierSlice;
