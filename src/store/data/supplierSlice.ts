import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSuppliers, Supplier } from "../../models/supplier";

let initialState: Supplier[] = [];

export const fetchAllSuppliers = createAsyncThunk(
  "suppliers/fetchAll",
  async () => {
    return await getAllSuppliers();
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
